import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { UserService } from "../user.service";

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
    private userService: UserService
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
        console.log("response", response);
      },
      error => {
        this.loading = false;
        console.log("error", error);
      }
    )
    console.log(this.userLogin.value);
  }

  // goToHome(){
  //   this.router.navigate(["home"]);
  // }
}
