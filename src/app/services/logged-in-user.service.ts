import { Injectable, signal } from '@angular/core';
import {AWSUser, GoogleUser} from '../models/users';
import { MethodsComponent } from '../shared/methods/methods.component';


@Injectable({
  providedIn: 'root'
})
export class LoggedInUserService extends MethodsComponent {

  loggedIn = signal<boolean>(false);
  private currentUser = signal<GoogleUser | AWSUser>({
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

  setUser(user: GoogleUser | AWSUser ) {
    // Google user
    if (user?.firstName && user?.name) {
      user.firstName = this.capitalizeWords(user.firstName);
      user.name = this.capitalizeWords(user.name);
    }

    // AWS Amplify User
    if ("userId" in user) {
      user.firstName = 'AWS-John';
      user.lastName = 'AWS-Doe';
      user.name = 'AWS-John-Doe';
      user.email = user?.signInDetails?.loginId
      user.photoUrl = ''
      user.provider = 'AWS Amplify'
    }

    this.currentUser.set(user);
  }

  getCurrentUser() {
    return this.currentUser;
  }
}
