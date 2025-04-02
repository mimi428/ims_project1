import { CommonModule } from '@angular/common';
import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent { //signal haru declare garne paila
  userName = signal('');
  password = signal('');
  loginError = signal('');

  constructor(private router: Router) {}
  onLogin() {
      const userName = this.userName(); //get value of username from signal
      const password = this.password();

      if ((userName === 'mihika' && password === 'mihika')||
         (userName === 'admin' && password === 'admin')) {
        this.loginError.set('');
        this.router.navigate(['/product-master']);
      } else {
        this.loginError.set('Invalid username or password');// display error msg
        alert('Login failed: Invalid credentials');
      }
    }
  }
