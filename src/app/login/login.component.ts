// login.component.ts
import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  userName = signal('');
  password = signal('');
  loginError = signal('');
  isLoading = signal(false);

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.loginForm.get('userName')?.valueChanges.subscribe(value => this.userName.set(value));
    this.loginForm.get('password')?.valueChanges.subscribe(value => this.password.set(value));
  }
  
  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading.set(true);
    this.loginError.set('');

    const userName = this.userName();
    const password = this.password();

    this.authService.login(userName, password)
      .pipe(
        finalize(() => this.isLoading.set(false))
      )
      .subscribe({
        next: (success) => {
          if (success) {
            this.router.navigate(['/product-master']);
          } else {
            this.loginError.set('Invalid username or password');
            alert("Please enter valid credentials");
          }
        },
        error: (err) => {
          this.loginError.set('Login failed. Please try again.');
          console.error(err);
        }
      });
  }
}