import { Injectable } from '@angular/core';
import { User } from '../_models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User;


  constructor() { }


  loggedIn() {
    const token = localStorage.getItem('token');
    if (token === null) {
      return false;
    }

    return token === 'true';
  }

}
