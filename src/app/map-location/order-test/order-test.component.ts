import { Component, OnInit, Inject } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { AuthService } from 'src/app/services/auth/auth-service';

@Component({
  selector: 'app-order-test',
  templateUrl: './order-test.component.html',
  styleUrls: ['./order-test.component.css']
})
export class OrderTestComponent implements OnInit {
  connected:string;
  isConnected:boolean;
  connectionInterval:any;
  foodOrder:any;
  orderno:string;
  customer:string;
  merchant:string;
  private hubConnection: signalR.HubConnection;

  constructor( @Inject('HUB_URL') public hubUrl: string,
               @Inject('API_URL') public apiUrl: string,
               private auth:AuthService) { }

  ngOnInit() {
    this.onInitServerHub();
    //this.onConnect();
    this.onConnectionClose();
    this.onReceiveOrder();
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
     // this.connectionInterval = setInterval(() => { this.onConnect(); }, 3000);
    });
  }
  
  onDisConnect(){
    this.hubConnection.stop();
  }

  onConnect() {
   
    console.log(this.hubConnection.state);
    if (this.hubConnection.state == signalR.HubConnectionState.Connected){
      this.connected ="Server Connected.";
        this. isConnected =true;
       
        // clearInterval(this.connectionInterval);
        // this.connectionInterval = null;
        this.register();
        return;
    }
    this.hubConnection
      .start()
      .then(() => {
        console.log('Connection started');
        this.connected ="Server Connected.";
        this. isConnected =true;
        
        // clearInterval(this.connectionInterval);
        // this.connectionInterval = null;
        this.register();
      })
      .catch((err)=>{
        this.connected ="Server Error.";
        this. isConnected =false;
        // if ( this.connectionInterval==null){
        //     this.connectionInterval = setInterval(() => { this.onConnect(); }, 3000);
        //     console.log('Error while starting connection: ' + err);
        // }
      });
  }

  onReceiveOrder(){    
    this.hubConnection.on("ReceiveOrder", (order) => {
      console.log(order);
      this.foodOrder =order;
      this.orderno = this.foodOrder.orderNo;
      this.customer =  this.foodOrder.customer;
      this.merchant =  this.foodOrder.merchant;
    });
  }
  
  register(){    
    let latitude = 1.5357821;
    let longitude = 103.7182205;
    this.hubConnection
      .invoke("Register","john0812@gala365.my",latitude,longitude)
      .then((resp)=>{
        console.log(resp);  
      }).catch(err=>{
        console.log(err);
      })
  }

  onAcceptOrder(){    
    this.hubConnection
      .invoke("AcceptOrder",this.foodOrder.riderName, this.foodOrder.orderNo)
      .then((resp)=>{
        console.log(resp);  
      }).catch(err=>{
        console.log(err);
      })
  }

  onPickUpOrder(){    
    this.hubConnection
      .invoke("PickupOrder",this.foodOrder.riderName, this.foodOrder.orderNo)
      .then((resp)=>{
        console.log(resp);  
      }).catch(err=>{
        console.log(err);
      })
  }

  onDeliverOrder(){    
    this.hubConnection
      .invoke("DeliverOrder",this.foodOrder.riderName, this.foodOrder.orderNo)
      .then((resp)=>{
        console.log(resp);  
      }).catch(err=>{
        console.log(err);
      })
  }

  onRejectOrder(){
    this.hubConnection
    .invoke("RejectOrder",this.foodOrder.riderName, this.foodOrder.orderNo)
    .then((resp)=>{
      console.log(resp);  
    }).catch(err=>{
      console.log(err);
    })
  }
}
