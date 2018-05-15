import { Component, OnInit } from '@angular/core';
import { User } from "../models/user";
import { Subscription } from "rxjs/Subscription";
import { GlobalService } from "../global.service";
import { MovieService } from "../movie.service";
import { Router } from "@angular/router";
import { Movie } from '../models/movie';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from '@angular/material';
import { RatingService } from '../rating.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MovieService, RatingService]
})
export class HomeComponent implements OnInit {

  account : User = new User();
  userSub : Subscription;
  // Do not need to specify type at this point
  currentMovies;
  selectedMovie: Movie;
  movieInput: FormGroup;
  isAddEditMode: boolean;
  isEdit: boolean;
  my_rating : number;

  constructor(
    private globalService: GlobalService,
    private router: Router,
    private movieService: MovieService,
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private ratingService: RatingService
  ) { }

  ngOnInit() {
    this.userSub = this.globalService.user.subscribe(
      me=> this.account = me
      );
      if (localStorage.getItem("token") && localStorage.getItem("account")) {
        this.globalService.me = JSON.parse(localStorage.getItem("account"));
        this.getMovies();
      }
      else {
        this.router.navigate(["/login"])
      }
      this.isAddEditMode = false;
      this.isEdit = false;
      this.movieInput = this.fb.group({
        title: ["", Validators.required],
        description: ["", Validators.required]
      })
      this.my_rating = 3;
    };

    movieDetail(movie){
      console.log("selected movie", movie);
      this.selectedMovie = movie;
    this.isAddEditMode = false;
  }

  // Replaced console.logs with material desing snackbar which can control error message duration
  getMovies() {
    this.movieService.getMovies().subscribe(
      movies => { this.currentMovies = movies},
      error => {
        //  Need to check styles and index to ensure references are all correct and present
        this.snackBar.open("Where are your movies?", "", { duration: 3000})
      }
    )
  }

  addMovieClicked() {
    this.isEdit = false;
    this.isAddEditMode = true;
    this.selectedMovie = null;
    this.movieInput.reset();
  }

  editMovieClicked(){
    this.isEdit = true;
    this.isAddEditMode = true;
    // from group allows you to set initial values of form....can be blank or can prepopulate
    this.movieInput = this.fb.group({
      title: [this.selectedMovie.title, Validators.required],
      description: [ this.selectedMovie.description, Validators.required]
    });
  }

  // Using splice to remove record matching index of item seleced
  deleteMovieClicked(){
    this.movieService.deleteMovie(this.selectedMovie.id).subscribe(
      response =>  {
      const movIndx = this.currentMovies.map(function(e) {return e.id;}).indexOf(this.selectedMovie.id);
      console.log("thing", response)
      if (movIndx >= 0) {
        this.currentMovies[movIndx] = response;
        this.selectedMovie = response;
      }
      this.isAddEditMode = false;},
      error => {
        console.log("error, movies", error)
      });
    }

    // Movie added that corresponds to submitted form data.  API control logic in service.
  // For movie update we are passing object id and form data which is converted to an object and updated in database
  // For update we also check to make sure that item is already in database
  submitMovie(){
    if (this.isEdit) {
      this.movieService.editMovie(this.movieInput.value, this.selectedMovie.id).subscribe(
        response =>  {
          const movIndx = this.currentMovies.map(function(e) {return e.id;}).indexOf(this.selectedMovie.id);
        console.log("thing", response)
        if (movIndx >= 0) {
          this.currentMovies[movIndx] = response;
          this.selectedMovie = response;
        }
        this.movieInput.reset();
        this.isAddEditMode = false;},
        error => {
          console.log("error, movies", error)
        });
    } else {

      this.movieService.addMovie(this.movieInput.value).subscribe(
        response =>  {
        this.currentMovies.push(response)
        this.movieInput.reset();
        this.isAddEditMode = false;},
        error => {
          console.log("error, movies", error)
        }
      )
    }
  }


  newRate(my_rating){
    this.ratingService.addRating(this.account.id, this.selectedMovie.id, my_rating).subscribe(
      data => {
        let movieIndx = this.currentMovies.map(function(e) {return e.id;}).indexOf(this.selectedMovie.id)
        if (movieIndx >= 0) {
          this.currentMovies[movieIndx]  = data["result"];
        }
        this.selectedMovie = data["result"];
      },
      error => console.log("dang")
    );
  }

    private logout(){
      this.globalService.me = new User();
      localStorage.removeItem("token");
      localStorage.removeItem("account");
      this.router.navigate(["login"]);
    }

}
