import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth-service';
import { AssignOrder } from '../model/assign-order';
import { ConnectedRider } from '../model/connected-rider';


@Injectable({
    providedIn: 'root'
})
export class RiderOrderService {
    constructor(private http: HttpClient,
        private router: Router,
        private auth: AuthService,
        @Inject('API_URL') public apiUrl: string,
    ) {
    }


    postAssignOrder(order: AssignOrder) {
        let body = JSON.stringify(order);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                          .set('Authorization', this.auth.getAuthToken());
     
        return this.http.post(this.apiUrl + 'AssignOrder/order',
            body, { headers: headers });
    }


    getLocations() {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(this.apiUrl + "/rider/locations",
            { headers: headers });
    }

    getConnectedUsers() {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                          .set('Authorization', this.auth.getAuthToken());
        return this.http.get(this.apiUrl + "/MapLocation/users",
            { headers: headers });
    }

}