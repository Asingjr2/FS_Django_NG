import { Injectable } from '@angular/core';
import { User } from './models/user';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class GlobalService {

  private userSource = new BehaviorSubject<User>(new User());
  user = this.userSource.asObservable();

  set me(user: User){
    localStorage.setItem("account", JSON.stringify(user));
    this.userSource.next(user);

  }


}


// set method allows setting of userSource which is being treated as an obsevable and also being stringified using a JSON method
