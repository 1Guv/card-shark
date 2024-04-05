import { Injectable, signal } from '@angular/core';
import { GoogleUser } from '../models/users';



@Injectable({
  providedIn: 'root'
})
export class LoggedInUserService {

  private loggedIn = signal<boolean>(false);
  private currentUser = signal<GoogleUser>({
    idToken: '',
    id: '',
    name: '',
    email: '',
    photoUrl: '',
    firstName: '',
    lastName: '',
    provider: '',
  });

  constructor() {}

  setData(val: boolean) {
    this.loggedIn.set(val);
  }

  getData() {
    return this.loggedIn;
  }

  setUser(user: GoogleUser) {
    this.currentUser.set(user);
  }

  getCurrentUser() {
    return this.currentUser;
  }
}
