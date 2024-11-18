import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, RouterModule],
  template: `
    <div class="auth-container">
      <h2>Register</h2>
      <form (ngSubmit)="onSubmit()">
        <div class="form-group">
          <input type="email" [(ngModel)]="email" name="email" placeholder="Email" required>
        </div>
        <div class="form-group">
          <input type="password" [(ngModel)]="password" name="password" placeholder="Password" required>
        </div>
        <button type="submit">Register</button>
        <p>Already have an account? <a routerLink="/login">Login</a></p>
      </form>
    </div>
  `,
  styles: [
    `
    .auth-container {
      max-width: 400px;
      margin: 2rem auto;
      padding: 2rem;
      border: 1px solid #ccc;
      border-radius: 8px;
    }
    .form-group {
      margin-bottom: 1rem;
    }
    input {
      width: 100%;
      padding: 0.5rem;
      margin-bottom: 1rem;
    }
    button {
      width: 100%;
      padding: 0.5rem;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  `,
  ],
})
export class RegisterComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  async onSubmit() {
    try {
      await this.authService.register(this.email, this.password);
      await this.router.navigate(['/todos']);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  }
}
