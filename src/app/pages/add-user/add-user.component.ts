import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-add-user',
  imports: [ReactiveFormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  
  userForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required, Validators.minLength(10)]],
      role: ['', Validators.required],
      password: ['', Validators.required]
      

    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.authService.addUser(this.userForm.value).subscribe({
        next: () => {
          alert('User added successfully!');
          this.userForm.reset();
        },
        error: (err) => {
          alert('Failed to add user: ' + err.message);
        }
      });
    }
  }
}

