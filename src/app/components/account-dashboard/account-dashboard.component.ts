import { JsonPipe } from '@angular/common';
import { Component, Signal } from '@angular/core';
import { GoogleUser } from 'src/app/models/users';
import { LoggedInUserService } from 'src/app/services/logged-in-user.service';

@Component({
  selector: 'app-account-dashboard',
  standalone: true,
  imports: [
    JsonPipe
  ],
  templateUrl: './account-dashboard.component.html',
  styleUrl: './account-dashboard.component.scss'
})
export class AccountDashboardComponent {

  currentUser: Signal<GoogleUser>;

  constructor(private loggedInUserService: LoggedInUserService) {
    this.currentUser = this.loggedInUserService.getCurrentUser();
  }



}
