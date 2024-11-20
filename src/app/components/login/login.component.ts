import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {Router, RouterLink, RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {map} from "rxjs";

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
    private router: Router) {

    this.authService.currentUser$
      .pipe(
        map((user: any) => {
          console.log('user', user);
          !!user
            ? this.router.navigate(['/account-dashboard'])
            : this.router.navigate(['/login']);
        })
      )
      .subscribe();
  }

  async onSubmit() {
    try {
      await this.authService.login(this.email, this.password);
      await this.router.navigate(['/account-dashboard']);
    } catch (error) {
      console.error('Login failed:', error);
    }
  }
}
