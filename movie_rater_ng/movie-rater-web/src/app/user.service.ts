import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import { environment } from "../environments/environment";

@Injectable()
export class UserService {

  httpHeaders = new HttpHeaders({ "Content-Type": "application/json; charset=utf-8"});
  baseUrl: string = environment.apiUrl;

  constructor( private http: HttpClient) { }

    // creating basic service to pass api form entered data
    // adding to baseUrl which stands as extra url locations
    loginUser( userData: any ): Observable<any> {
      return this.http.post(this.baseUrl + "authenticate/", userData, {headers: this.httpHeaders})
    }

    registerUser( userData: any ): Observable<any> {
      return this.http.post(this.baseUrl + "users/", userData)
    }


}
