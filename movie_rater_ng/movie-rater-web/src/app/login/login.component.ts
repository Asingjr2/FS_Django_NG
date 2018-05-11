import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { UserService } from "../user.service";
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  userLogin : FormGroup;
  loading : boolean;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private globalService: GlobalService,
  ) {
    this.loading = false,
    this.userLogin = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });

  }

  ngOnInit() {
  }

  onLogin() {
    this.loading = true;
    this.userService.loginUser( this.userLogin.value).subscribe(
      response => {
        this.loading = false;
        // Information saves in browser in storage (mozilla)
        localStorage.setItem("token", response["token"]);
        this.globalService.me = response["user"];
        console.log("response", response);

      },
      error => {
        this.loading = false;
        console.log("error", error);
      }
    )
  }

  // goToHome(){
  //   this.router.navigate(["home"]);
  // }
}
