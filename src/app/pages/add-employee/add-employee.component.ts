import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { EmployeeService } from '../../service/employee.service';

@Component({
  selector: 'app-add-employee',
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {
 AddemployeeForm: FormGroup = new FormGroup({});
 employeeService = inject(EmployeeService);

  constructor(private fb: FormBuilder, private router: Router) {
    this.AddemployeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

}

