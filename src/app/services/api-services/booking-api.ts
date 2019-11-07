import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Inject, Injectable } from '@angular/core';
import { Booking } from '../../model/booking';
import { AuthService } from '../auth/auth-service';
import { ApiService } from './api-services';
import { DatePipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class BookingApiService extends ApiService {
  constructor(
              public http: HttpClient,
              @Inject('API_URL') public apiUrl: string,
              private auth: AuthService
         ) {
          super(http,apiUrl);
  }

  getBookingBySlot(date: Date,slot:String) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let filter = `\$filter=year(WorkDate ) eq ${year} and month(WorkDate ) eq ${month} and day(WorkDate) eq ${day} and Slot eq '${slot}'`;
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
   // console.log(this.apiUrl + "booking?" + filter);
    return this.http.get(this.apiUrl + "booking?" + filter,
      { headers: headers });
  }

   getBookingByName(date: Date,name:String) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let filter = `\$filter=year(WorkDate ) eq ${year} and month(WorkDate ) eq ${month} and day(WorkDate) eq ${day} and Rider_Name eq '${name}'`;
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
   // console.log(this.apiUrl + "booking?" + filter);
    return this.http.get(this.apiUrl + "booking?" + filter,
      { headers: headers });
  }

   getBookingByNameSlot(date: Date,name:String,slot:String) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let filter = `\$filter=year(WorkDate ) eq ${year} and month(WorkDate ) eq ${month} and day(WorkDate) eq ${day} and Rider_Name eq '${name}' and Slot eq '${slot}'`;
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
   // console.log(this.apiUrl + "booking?" + filter);
    return this.http.get(this.apiUrl + "booking?" + filter,
      { headers: headers });
  }


  getBooking(date: Date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let filter = `\$filter=year(WorkDate ) eq ${year} and month(WorkDate ) eq ${month} and day(WorkDate) eq ${day}`;
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
   // console.log(this.apiUrl + "booking?" + filter);
    return this.http.get(this.apiUrl + "booking?" + filter,
      { headers: headers });
  }

  // getSlots() {
  //   let headers = new HttpHeaders().set('Content-Type', 'application/json');
  //   return this.http.get(this.apiUrl + "booking/slots",
  //     { headers: headers });
  // }

  // getRiderNames() {
  //   let headers = new HttpHeaders().set('Content-Type', 'application/json');
  //   return this.http.get(this.apiUrl + "booking/riders?\$filter=Active%20eq%20true%20&\$select=Rider_Name,Full_Name",
  //     { headers: headers });
  // }

  getMonthSumm(date: Date,slot:String) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let filter = `\$filter=year(WorkDate ) eq ${year} and month(WorkDate ) eq ${month} and Slot eq '${slot}'`;
    //console.log(filter);
    return this.http.get(this.apiUrl + "booking/mthsummary?" + filter,
      { headers: headers });
  }

  getDailySumm(date: Date) {
    let pipe = new DatePipe('en-US');
    let datestr = pipe.transform(date, 'yyyy-MM-dd');
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
 
    return this.http.get(this.apiUrl + "booking/dailysummary/" + datestr,
      { headers: headers });
  }

  postBooking(book: Booking) {
    book.updatedBy = this.auth.getUserInfo().name;
    let body = JSON.stringify(book);
    console.log(body);
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.auth.getAuthToken());
    return this.http.post(this.apiUrl + 'Booking/new',
      body, { headers: headers });
  }

  putBooking(book: Booking) {
    book.updatedBy = this.auth.getUserInfo().name;
    let body = JSON.stringify(book);
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.auth.getAuthToken());
    return this.http.put(this.apiUrl + 'booking/update',
      body, { headers: headers });
  }

  deleteBooking(book: Booking) {
    let body = JSON.stringify(book);
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.auth.getAuthToken());
    return this.http.post(this.apiUrl + 'booking/remove',
      body, { headers: headers });
  }
}