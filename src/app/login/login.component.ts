import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin(){
      if (this.loginForm.valid) {
        const { userName, password } = this.loginForm.value;

        if (userName === 'mihika' && password === 'mihika') {
          this.loginError = '';
          this.router.navigate(['/product-master']);
        } else {
          this.loginError = 'Invalid username or password';
          alert('Login failed: Invalid credentials')
        }
         }

  }
}
