import { Component, OnInit, ViewChild, Inject,OnDestroy } from '@angular/core';
import { MapsAPILoader, AgmMap,AgmMarker } from '@agm/core';
import * as signalR from '@aspnet/signalr';

import { ConnectedRider } from '../../model/connected-rider';
import { AssignOrder } from '../../model/assign-order';
import { RiderOrderService } from '../../services/rider-order-services';
import { MarkerLocation } from '../../model/marker-location';
import { ObjectType } from '../../enum/object-type';
import { RiderOnlineStatus } from '../../enum/rider-online-status';

declare var google;

@Component({
  selector: 'app-ridermap',
  templateUrl: './ridermap.component.html',
  styleUrls: ['./ridermap.component.css']
})
export class RidermapComponent implements OnInit,OnDestroy {

  latitude = 1.5357821;
  longitude = 103.7182205;
  mapType = 'roadmap';
  gmap: any;
  markers: MarkerLocation[] = [];
  private hubConnection: signalR.HubConnection;
  mapicon: any;
  connected:string;
  isConnected:boolean;
  isDestroy:boolean;
  connectionInterval:any;
  riders:ConnectedRider[]=[];
  refreshButtonOptions:any;
  orders:AssignOrder[]=[];
  tabitems:String[]=["Riders","Orders"];

  @ViewChild('AgmMap', { static: true }) agmMap: AgmMap;

  constructor(
    private api: RiderOrderService,
    @Inject('HUB_URL') public hubUrl: string,
    @Inject('BASE_URL') public baseUrl: string,
    public mapsApiLoader: MapsAPILoader) { 
      this.getConnectedUsers();
      this.getOrders();
      this.refreshButtonOptions = {
        icon: 'refresh',
        onClick: () => {
           this.onConnect();
        }
    };
  }

  ngOnInit() {
    this.isDestroy =false;
    this.connected ="Server disconected.";
    this. isConnected =false;
    this.markers = [];    
    this.mapicon = {
      url: './assets/mapicon.png',
      scaledSize: {
        width: 40,
        height: 60
      }
    }
    this.onInitServerHub();
    this.onConnect();
    this.onConnectionClose();
    this.onReceiveLocation();
    this.onReceiveLocationMsg();
    this.onConnectedUser();
  }
  
  ngOnDestroy(): void {
    this.isDestroy = true;
    this.hubConnection.stop();
    this.clearConnectionTimer();
  }

  getConnectedUsers(){
    this.api.getConnectedUsers()
     .subscribe((resp:any)=>{
        this.riders = [...resp];
        this.markers = [];  
        this.riders.forEach((rider)=>{
          this.AddRiderMaker(rider);
        });
     })
  }

  getOrders(){
    this.api.getOrders()
     .subscribe((resp:any)=>{
         this.orders = [...resp];
     });
  }

  onInitServerHub(){
    this.hubConnection = new signalR.HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.Information)
    .withUrl(this.hubUrl)
    .build();
  }

  onConnectionClose(){
    this.hubConnection.onclose(() => {
      console.log("I am disconnetd");
      this.connected ="Server disconected.";
      this. isConnected =false;
      if (!this.isDestroy){
        this.setConnectionTimer();
      }     
    });
  }

  onReceiveLocationMsg(){    
    this.hubConnection.on("ReceiveLocationMsg", (msg) => {
      console.log(msg);
    });
  }
  
  onConnectedUser(){
    this.hubConnection.on("ConnectedUser", (connId,info:ConnectedRider,isConnected) => {
      console.log(info);
      if (info !=null){
         this.AddRiderToList(connId, isConnected, info);
         if (isConnected){
            this.AddRiderMaker(info);
         } else {
            this.RemoveRiderMaker(info);
         }         
         
      }
    });
  }

  private AddRiderToList(connId: any, isConnected: any, info: ConnectedRider) {
    if (info.objectType !=ObjectType.Rider){
      return;
    }
    let index = this.riders.findIndex(x => x.connectionid == connId);
    if (isConnected) {
      if (index < 0) {
        this.riders =[...this.riders,info];
      }
    }
    else {
      if (index > -1) {
        this.riders.splice(index, 1);
      }
    }
  }

  private AddRiderMaker(info: ConnectedRider) {
    let index = this.markers
         .findIndex(x => x.riderid==info.riderName &&
                         x.type == info.objectType);
    let maker = this.populateMarker(info);
    if (index < 0) {      
      this.markers =[...this.markers,maker];
    } else {
      this.markers.splice(index,1);  
      this.markers =[...this.markers,maker];
    }
    this.upadeteMarkerStatus(info);
  }

  private upadeteMarkerStatus(info: ConnectedRider){
    let found = this.markers
                 .filter(x => x.riderid==info.riderName &&
                              x.type != ObjectType.Rider &&
                              x.orderno ==info.orderno);
    found.forEach(item=>item.status=info.status);
  }

  private populateMarker(info: ConnectedRider) {
    let maker = new MarkerLocation();
    maker.riderid = info.riderName;
    maker.date = info.connectedOn;
    maker.isDeliver = info.isCompleted;
    maker.isPickup = info.isPickUp;
    maker.label = info.riderName;
    maker.lat = parseFloat(info.lat);
    maker.lng = parseFloat(info.lng);
    maker.orderno = info.orderno;
    maker.status = info.status;
    maker.type = info.objectType;
    return maker;
  }

  private RemoveRiderMaker(info: ConnectedRider) {
    console.log("remove maker");
    console.log(info);
    let index = this.markers
            .findIndex(x => x.riderid==info.riderName &&
                           x.type == ObjectType.Rider);
    console.log("found index "+index);
    if (index > -1) {      
      this.markers.splice(index,1);
    } 
  }

  onReceiveLocation(){
    this.hubConnection.on("ReceiveLocation", (user, lat, lng) => {
      console.log(user + " " + lat + "," + lng);
        // Marker needs to be created
      
      let mark = new MarkerLocation();
      mark.lat = parseFloat(lat);
      mark.lng = parseFloat(lng);
      mark.label = user;
      let found= this.markers.findIndex(x=>x.label==mark.label);
      if (found<0){
        this.markers.push(mark);
      }else {
       this.markers.splice(found,1);
       this.markers=[...this.markers,mark];
      }
    });
  }

  onConnect() {
    console.log("try to connect");
    console.log(this.hubConnection.state);
    if(this.hubConnection.state==signalR.HubConnectionState.Connected){
      this. isConnected =true;
      this.clearConnectionTimer();
    }
    this.hubConnection
      .start()
      .then(() => {
        console.log('Connection started');
        this.connected ="Server Connected.";
        this. isConnected =true;
        this.clearConnectionTimer();
      })
      .catch((err)=>{
        this.connected ="Server Error.";
        this. isConnected =false;
        this.setConnectionTimer();
      });
  }
  
  clearConnectionTimer(){
    clearInterval(this.connectionInterval);
    this.connectionInterval = null;
  }

  setConnectionTimer(){
    if ( this.connectionInterval==null){
      this.connectionInterval = setInterval(() => { this.onConnect(); }, 3000);
      console.log('Set timer ');
   }
  }

  onMarkerClick(e){
     console.log(e);
  }

  getMarkerIcon(maker:MarkerLocation){
    if (maker.type == ObjectType.Rider){
      switch (maker.status){
        case RiderOnlineStatus.Free: 
          return this.baseUrl+"assets/tofree.png";          
        case RiderOnlineStatus.Assigned: 
          return this.baseUrl+"assets/topick.png";   
        case RiderOnlineStatus.Pickup: 
          return this.baseUrl+"assets/todeliver.png";
        case RiderOnlineStatus.Completed: 
          return this.baseUrl+"assets/completed.png";
          default:
            return this.baseUrl+"assets/tofree.png";
      }
    }

    if (maker.type == ObjectType.Merchant){
      switch (maker.status){
        case RiderOnlineStatus.Assigned: 
          return this.baseUrl+"assets/readypick.png";
        case RiderOnlineStatus.Pickup:      
           return this.baseUrl+"assets/pick.png";     
        case RiderOnlineStatus.Completed: 
          return this.baseUrl+"assets/picked.png";
          default:
            return this.baseUrl+"assets/pick.png";
      }
    }

    if (maker.type == ObjectType.Customer){
      switch (maker.status){
        case RiderOnlineStatus.Assigned:          
        case RiderOnlineStatus.Pickup:     
            return this.baseUrl+"assets/receive.png";      
        case RiderOnlineStatus.Completed: 
          return this.baseUrl+"assets/received.png";
          default:
            return this.baseUrl+"assets/receive.png";
      }
    }

    return this.baseUrl+"assets/tofree.png";
  }

  onRiderClick(item:ConnectedRider){
    console.log(item);
    let order= this.creatTestOrder(item);
    console.log(order);
    this.api.postAssignOrder(order)
     .subscribe((resp)=>{
        console.log(resp);
     });
  }

  creatTestOrder(item:ConnectedRider):AssignOrder{
    let order:AssignOrder = new AssignOrder();
    order.orderNo= Date.now().toString();
    order.orderDesc= "test order assign3";
    order.orderDate= new Date();
    order.assignOn=  new Date();
    order.merchant= "Marry Brown Skudai";
    order.merchantLat="1.5438857";
    order.merchantLng="103.7163453";
    order.customer= "TH MOK";
    order.customerLat= "1.545978";
    order.customerLng= "103.717428";
    order.riderName= item.riderName;
    order.status= "New";
    order.acceptedOn= null;
    order.connectionID= item.connectionid;
    return order;
  }
}
