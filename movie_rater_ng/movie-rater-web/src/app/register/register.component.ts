import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { UserService } from "../user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [ UserService]
})
export class RegisterComponent implements OnInit {

  userRegister : FormGroup;
  loading:  boolean;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.userRegister = this.fb.group({
      username: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(3)]],
      email: ["", [Validators.required,Validators.email ]]
    })
  }

  ngOnInit() {
    this.loading = false;
    return console.log("hey")
  }

    onRegister() {
      this.loading = true;
      this.userService.registerUser( this.userRegister.value).subscribe(
        response => {
          this.loading = false;
          console.log("response", response);
          this.router.navigate(["login"]);

        },
        error => {
          this.loading = false;
          console.log("error", error);
        }
      )
    }
}
