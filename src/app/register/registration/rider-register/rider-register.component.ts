import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Register } from 'src/app/model';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { RegisterData } from 'src/app/model/register-data';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/services/format-datepicker';
import { RegisterApiService } from 'src/app/services/api-services/reg-api-services';

@Component({
  selector: 'app-rider-register',
  templateUrl: './rider-register.component.html',
  styleUrls: ['./rider-register.component.css'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class RiderRegisterComponent implements OnInit {
  register :Register;
  isSubmiting:boolean;
  profileForm = new FormGroup({
    name: new FormControl('', Validators.required),
    nickname: new FormControl('', Validators.required),
    icno: new FormControl('', Validators.required),
    nationality: new FormControl('Malaysia', Validators.required),
    dob: new FormControl(null, Validators.required),
    gender: new FormControl('Male', Validators.required),
    mobil1: new FormControl('', Validators.required),
    mobil2: new FormControl(''),
    emergency: new FormControl('', Validators.required),
    contact: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    vehicle: new FormControl('', Validators.required),
    driving: new FormControl('', Validators.required),
    working1: new FormControl(''),
    working2: new FormControl(''),
    bankAccount:new FormControl(''),
    bankName:new FormControl(''),
    stardate: new FormControl(null, Validators.required),
    remark: new FormControl('')
  });
  
  itemImgUrl:any;
  itemImgUrl2:any;
  itemImgUrl3:any;
  itemImgUrl4:any;
  isLocal:boolean;
  file1:any;
  file2:any;
  file3:any;
  file4:any;
  banks:any;
  constructor(private api:RegisterApiService,
              private router:Router,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.isLocal = true;
    this.isSubmiting=false;
    this.api.getBanks()
      .subscribe((data)=>this.banks=data);
  }

  onFaq() {

  }

  onNationalityChange(){
   console.log(this.profileForm.value.nationality);
   this.isLocal= this.profileForm.value.nationality=="Malaysia"
  }

  saveReg(){
    if (this.file1==null){
      this.toastr.error("Image Font Page IC not found...");
      return;
    }
    if (this.file2==null){
      this.toastr.error("Image Back Page IC not found...");
      return;
    }
    if (this.file3==null){
      this.toastr.error("Image Front Page Motor License not found...");
      return;
    }
    if (this.file4==null){
      this.toastr.error("Image Back Page Motor License not found...");
      return;
    }
    this.isSubmiting=true;
    this.populateDate();

    let data = new FormData();
    const blob = new Blob([JSON.stringify(this.register)], {type : 'application/json'});
    
    data.append("file", blob);
    data.append("file",this.file1);
    data.append("file",this.file2);
    data.append("file",this.file3);
    data.append("file",this.file4);
    
   
   // localStorage.setItem('user', JSON.stringify(this.register));
            //this.toastr.success('Successfully Registered.', 'Message');
           // this.router.navigate(['/success']);
     this.api.postRegistrationEx(data)
         .subscribe((resp:any)=>{
           if (resp.ok=="yes"){
            this.router.navigate(['/success'], {state: {data: this.register}});
           }else {
            this.isSubmiting=false; 
            this.toastr.error('Fail to Register, '+resp.errmsg, 'Error', {
              timeOut: 4000
            });
           }
         });
    //       if (resp.ok=="yes"){
    //         localStorage.setItem('user', JSON.stringify(this.register));
    //         //this.toastr.success('Successfully Registered.', 'Message');
    //         this.router.navigate(['/success']);
    //       }else {
    //         this.toastr.error('Fail to Register, '+resp.errmsg, 'Error', {
    //           timeOut: 3000
    //         });
      
    //       }
    //     });
  }

  populateDate(){
    this.register = new Register();
    this.register.fullname = this.profileForm.value.name;
    this.register.nickname = this.profileForm.value.nickname;
    this.register.noic = this.profileForm.value.icno;
    this.register.nationality = this.profileForm.value.nationality;
    this.register.gender = this.profileForm.value.gender;
    this.register.dob = this.profileForm.value.dob;
    this.register.mobile1 = this.profileForm.value.mobil1;
    this.register.mobile2 = this.profileForm.value.mobil2;
    this.register.contact = this.profileForm.value.contact;
    this.register.address = this.profileForm.value.address;
    this.register.emergency = this.profileForm.value.emergency;
    this.register.vehicleno = this.profileForm.value.vehicle;
    this.register.drivingno = this.profileForm.value.driving;
    this.register.workexp1 = this.profileForm.value.working1;
    this.register.workexp2 = this.profileForm.value.working2;
    this.register.startwork = this.profileForm.value.stardate;
    this.register.remark = this.profileForm.value.remark;
    this.register.bankAccount = this.profileForm.value.bankAccount;
    this.register.bankName= this.profileForm.value.bankName;
    this.register.mobile1 = this.register.mobile1.replace('+','');
    this.register.mobile2 = this.register.mobile2.replace('+','');
    this.register.emergency = this.register.emergency.replace('+','');
    console.log(this.register);
  }

  OnItemFileChange(e) {
    console.log(e);
    if (e.value) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.itemImgUrl = event.target.result;
      }
      reader.readAsDataURL(e.value[0]);
      this.file1=e.value[0];    
    }
  }

   OnItemFileChange2(e) {
      console.log(e);
      if (e.value) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.itemImgUrl2 = event.target.result;
        }
        reader.readAsDataURL(e.value[0]);
        this.file2=e.value[0];      
      }
  }

  OnItemFileChange3(e) {
    console.log(e);
    if (e.value) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.itemImgUrl3 = event.target.result;
      }
      reader.readAsDataURL(e.value[0]);
      this.file3=e.value[0];      
    }
  }

  OnItemFileChange4(e) {
    console.log(e);
    if (e.value) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.itemImgUrl4 = event.target.result;
      }
      reader.readAsDataURL(e.value[0]);
      this.file4=e.value[0];      
    }
  }
}
