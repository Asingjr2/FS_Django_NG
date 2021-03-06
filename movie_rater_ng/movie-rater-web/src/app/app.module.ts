import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { HttpClientModule } from "@angular/common/http";

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule} from "@angular/material";
import {  MatFormFieldModule } from "@angular/material/form-field";
import {  MatInputModule } from "@angular/material/input";
import {  MatIconModule } from "@angular/material/icon";
import {MatSnackBarModule} from '@angular/material/snack-bar'

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { GlobalService } from "./global.service";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    HttpModule,
    NgbModule.forRoot(),
  ],
  providers: [GlobalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
