import {JsonPipe, NgClass} from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {Router, RouterLink, RouterModule} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {map} from "rxjs";
import {Login} from "../../models/login.model";
import {MatCardModule} from "@angular/material/card";
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatDialogClose} from "@angular/material/dialog";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatButtonModule,
    JsonPipe,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInput,
    MatLabel,
    MatDialogClose,
    NgClass,
    MatIcon
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup = new FormGroup({})
  fieldTextType = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  )
  {
    this.createLoginForm();

    this.authService.currentUser$
      .pipe(
        map((user: any) => {
          !!user
            ? this.router.navigate(['/account-dashboard'])
            : this.router.navigate(['/login']);
        })
      )
      .subscribe();
  }

  async onLogin() {
    if (this.loginForm.valid) {
      try {
        await this.authService.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value)
        await this.router.navigate(['/account-dashboard']);
      } catch (error) {
        console.error('Login failed:', error);
      }
    }
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  onToggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  // async onSubmit() {
  //   if (this.loginForm.valid) {
  //     try {
  //       await this.authService.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value)
  //       await this.router.navigate(['/account-dashboard']);
  //     } catch (error) {
  //       console.error('Login failed:', error);
  //     }
  //   }
  // }
}
