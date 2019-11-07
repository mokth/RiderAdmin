import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Inject, Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class ApiService {
  constructor(public http: HttpClient,
              @Inject('API_URL') public apiUrl: string) {
  }

  getLocations() {    
    //http://gala365.com.my/riderapi/api/rider/locations?$filter=year(trxdate ) eq 2019 and month(trxdate )  eq 9  and day(trxdate ) eq 27 and hour(trxdate ) eq 15 and minute(trxdate ) gt 20   
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.apiUrl+"rider/locations?$filter=year(trxdate ) eq 2019 and month(trxdate ) eq 9  and day(trxdate ) eq 28 and hour(trxdate ) gt 15",
         { headers: headers }); 
  }

  getSlots() {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.apiUrl + "booking/slots",
      { headers: headers });
  }

  getRiderNames() {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.apiUrl + "booking/riders?\$filter=Active%20eq%20true%20&\$select=Rider_Name,Full_Name",
      { headers: headers });
  }
}