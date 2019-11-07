import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MapsAPILoader, AgmMap,AgmMarker } from '@agm/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import * as signalR from '@aspnet/signalr';

import { MarkerLocation } from '../../../model/location';
import { ApiService } from '../../../services/api-services/api-services';
import { ConnectedRider } from '../../model/connected-rider';

declare var google;

@Component({
  selector: 'app-ridermap',
  templateUrl: './ridermap.component.html',
  styleUrls: ['./ridermap.component.css']
})
export class RidermapComponent implements OnInit {

  latitude = 1.5357821;
  longitude = 103.7182205;
  mapType = 'roadmap';
  gmap: any;
  markers: MarkerLocation[] = [];
  private hubConnection: signalR.HubConnection;
  mapicon: any;
  connected:string;
  isConnected:boolean;
  connectionInterval:any;
  riders:ConnectedRider[]=[];
  refreshButtonOptions:any;

  @ViewChild('AgmMap', { static: true }) agmMap: AgmMap;

  constructor(
    private api: ApiService,
    @Inject('HUB_URL') public hubUrl: string,
    @Inject('API_URL') public apiUrl: string,
    @Inject('BASE_URL') public baseUrl: string,
    private http: HttpClient,
    public mapsApiLoader: MapsAPILoader) { 
      this.refreshButtonOptions = {
        icon: 'refresh',
        onClick: () => {
           this.onConnect();
        }
    };
    }

  ngOnInit() {
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
      this.connectionInterval = setInterval(() => { this.onConnect(); }, 3000);
    });
  }

  onReceiveLocationMsg(){    
    this.hubConnection.on("ReceiveLocationMsg", (msg) => {
      console.log(msg);
    });
  }
  
  onConnectedUser(){
    this.hubConnection.on("ConnectedUser", (connId,riderName,isConnected) => {
      console.log(connId+"  "+riderName+" "+isConnected);
      if (riderName!=null || riderName!=""){
         let rider = new ConnectedRider();
         rider.Id = connId;
         rider.rider = riderName;
         rider.date = new Date();
         if (isConnected){
           this.riders.push(rider);
         }else {
           let index =this.riders.findIndex(x=>x.Id==connId);
           if (index>-1){
              this.riders.splice(index,1);
           }
          }
      }
    });
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
    this.hubConnection
      .start()
      .then(() => {
        console.log('Connection started');
        this.connected ="Server Connected.";
        this. isConnected =true;
        clearInterval(this.connectionInterval);
        this.connectionInterval = null;
      })
      .catch((err)=>{
        this.connected ="Server Error.";
        this. isConnected =false;
        if ( this.connectionInterval==null){
            this.connectionInterval = setInterval(() => { this.onConnect(); }, 3000);
            console.log('Error while starting connection: ' + err);
        }
      });
  }

  getLocations() {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.apiUrl + "/rider/locations",
      { headers: headers });
  }

  onMarkerClick(e){
     console.log(e);
  }

  getMarkerIcon(){
    return this.baseUrl+"assets/red.png";
  

  }
}
