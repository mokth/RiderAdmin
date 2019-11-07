import { Component, ViewChild, Inject } from '@angular/core';
import { AuthService } from './services/auth/auth-service';
import { Router } from '@angular/router';
import { DxDrawerComponent } from 'devextreme-angular';
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ridermap';
  menuItems: any;
  @ViewChild("drawer", { static: false }) drawer: DxDrawerComponent;
  navigation;
  showSubmenuModes: string[] = ['slide', 'expand'];
  positionModes: string[] = ['left', 'right'];
  showModes: string[] = ['push', 'shrink', 'overlap'];
  text: string;
  selectedOpenMode: string = 'shrink';
  selectedPosition: string = 'left';
  selectedRevealMode: string = 'slide';
  elementAttr: any;
  toolbarHeight:number=50;
  constructor(private auth:AuthService,
              private router:Router,
              @Inject('BASE_URL') public baseUrl: string
              ) {
             
    this.auth.getAppMenu()
      .subscribe((data:any)=>{
         
         this.menuItems = JSON.parse(data.menu);
         console.log(this.menuItems);
      });
  }

  ngOnInit() {
    // this.menuItems = JSON.parse(this.jtext);
    // console.log(this.menuItems);

  }

  isAuthenticated(){
    return this.auth.isAuthenticated()
  }

  menuItemClick(e){
    console.log(e.itemData);
    if (e.itemData.url!=null){
      if (e.itemData.url=="Logout"){
        this.logOut();
      }else this.router.navigate(['/'+e.itemData.url]);
    }
  }

  logOut(){
    this.auth.logOut();
    this.router.navigate(['/login']);
  }

  onLogin($event){
    this.router.navigate(['/login']);
  }

  onDrawer(){
    this.drawer.instance.toggle();
  }

  selectedItem(e){
    if (e.itemData.url!=null){
      if (e.itemData.url=="Logout"){
        this.logOut();
      }else this.router.navigate(['/'+e.itemData.url]);
    }
  }

  drawerHeight(){
    console.log(window.innerHeight);
    return window.innerHeight-this.toolbarHeight;
  }

  getLogo(){
    return this.baseUrl+"assets/galaeats.png";
  }
}
