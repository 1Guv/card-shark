import { Injectable, signal } from '@angular/core';
import { GoogleUser } from '../models/users';
import { MethodsComponent } from '../shared/methods/methods.component';


@Injectable({
  providedIn: 'root'
})
export class LoggedInUserService extends MethodsComponent {

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

  constructor() {
    super()
  }

  setData(val: boolean) {
    this.loggedIn.set(val);
  }

  getData() {
    return this.loggedIn;
  }

  setUser(user: GoogleUser) {
    user.firstName = this.capitalizeFirstLetter(user.firstName);
    this.currentUser.set(user);
  }

  getCurrentUser() {
    return this.currentUser;
  }
}
