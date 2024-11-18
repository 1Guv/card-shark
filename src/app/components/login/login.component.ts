import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {Router, RouterLink, RouterModule} from '@angular/router';
import { LoggedInUserService } from 'src/app/services/logged-in-user.service';
import {AWSUser, GoogleUser} from "../../models/users";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatButtonModule,
    JsonPipe,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router) {}

  async onSubmit() {
    try {
      await this.authService.login(this.email, this.password);
      await this.router.navigate(['/account-dashboard']);
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  // user: SocialUser | undefined | AWSUser;
  loggedIn = false;

  // constructor(
  //   private router: Router,
  //   // private loggedInUserService: LoggedInUserService
  // ) { }

  ngOnInit() {
    // this.authService.authState.subscribe((user) => {
    //   this.user = user;
    //   this.loggedInUserService.setUser(this.user);
    //
    //   this.loggedIn = (user != null);
    //
    //   this.loggedInUserService.setData(this.loggedIn);
    //
    //   if (this.loggedIn) {
    //     this.router.navigateByUrl('account-dashboard');
    //   }
    // });
  }

  // signInWithFB(): void {
  //   this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  // }

  signOut(): void {
  }

  // refreshGoogleToken(): void {
  //   this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  // }

  onAccountDashboard(user: GoogleUser | AWSUser) {
    // console.log('user', user);
    //
    // // this.user = user;
    // // this.loggedInUserService.setUser(this.user);
    // this.loggedIn = (user != null);
    // this.loggedInUserService.setData(this.loggedIn);
    //
    // if (this.loggedIn) {
    //   this.router.navigateByUrl('account-dashboard');
    // }
  }
}
