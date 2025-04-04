import { CommonModule } from '@angular/common';
import { Component, signal, computed } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
//UI ma validation message ra error dekhauna signal haru use gareko esle realtime ma user input change bhako kura dekhauna help garxaa.
export class LoginComponent {
  loginForm: FormGroup;
  userName = signal('');//signal to store current uname
  password = signal('');
  loginError = signal('');

  constructor(private fb: FormBuilder, private router: Router) { //injecting whats needed
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
    // Sync form values with signals
    this.loginForm.get('userName')?.valueChanges.subscribe(value => this.userName.set(value)); //Update uname signal whenever the username input changes.
    this.loginForm.get('password')?.valueChanges.subscribe(value => this.password.set(value));
  }
  
  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    const userName = this.userName(); //get uname from signal
    const password = this.password();

    if ((userName === 'mihika' && password === 'mihika') ||
        (userName === 'admin' && password === 'admin')) {
      this.loginError.set('');
      this.router.navigate(['/product-master']);
    } else {
      this.loginError.set('Invalid username or password');
      alert("Please type valid credenetials")
    }
  }
}
