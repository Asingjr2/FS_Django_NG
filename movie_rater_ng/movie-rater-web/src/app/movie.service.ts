import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHeaderResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { environment } from "../environments/environment";
import { Movie } from './models/movie';

@Injectable()
export class MovieService{


  httpHeaders = new HttpHeaders({ "Content-Type": "application/json; charset=utf-8"});
  baseUrl: string = environment.apiUrl;

  constructor( private http: HttpClient) { }

    getMovies(  ): Observable<any> {
      return this.http.get(this.baseUrl + "movies/", this.getAuthHeaders());
    }

    // Post requires additional parameter of object being added to database
    addMovie(movie: Movie ): Observable<any> {
      return this.http.post(this.baseUrl + "movies/", movie, this.getAuthHeaders());
    }
    // Put method goes to same viewset api view and requires object as well as id in parameter in url
    editMovie(movie: Movie, id: number ): Observable<any> {
      return this.http.put(this.baseUrl + "movies/" + id + "/", movie, this.getAuthHeaders());
    }

    // Delete method going to the viewsets on api with delete method
    deleteMovie( id: number ): Observable<any> {
      return this.http.delete(this.baseUrl + "movies/"  + id + "/", this.getAuthHeaders());
    }

    private getAuthHeaders() {
      const token = localStorage.getItem("token");
      const httpHeaders = new HttpHeaders(
        { "Content-Type": "application/json; charset=utf-8",
        "Authorization": "Token" + token});
        return { headers : httpHeaders };
    }

}
