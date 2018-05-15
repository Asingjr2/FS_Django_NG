import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHeaderResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { environment } from "../environments/environment";

@Injectable()
export class RatingService {

  httpHeaders = new HttpHeaders({ "Content-Type": "application/json; charset=utf-8"});
  baseUrl: string = environment.apiUrl;

  constructor( private http: HttpClient) { }

    // Passing rating object attributes seperately to be created in database...matches django api function requirements(3 arguements) find in view.  Not taking data from form like methods in movieservice
    addRating(user_id : number,  movie_id: number, rating:number): Observable<any> {
      let new_rating = {
        user: user_id,
        movie : movie_id,
        stars: rating,
      }
      return this.http.post(this.baseUrl + "ratings/rate_movie/", new_rating, this.getAuthHeaders());
    }

    private getAuthHeaders() {
      const token = localStorage.getItem("token");
      const httpHeaders = new HttpHeaders(
        { "Content-Type": "application/json; charset=utf-8",
        "Authorization": "Token" + token});
        return { headers : httpHeaders };
    }

}
