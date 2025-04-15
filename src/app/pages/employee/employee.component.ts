import { Component, inject, OnInit, signal } from '@angular/core';
import { Employee, IApiResponse } from '../../model/Employee';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../service/employee.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-employee',
  imports: [FormsModule, CommonModule,RouterModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit{

  EmployeeObj: Employee = new Employee();
  EmployeeList: Employee[]=[];

  employeeService = inject(EmployeeService);
  employeeForm: any;

  ngOnInit(): void {
    this.showEmployeeList();
  }
 
  showEmployeeList(){
    this.employeeService.getAllEmployees().subscribe((res: Employee[]) => {
      this.EmployeeList=res;
      console.log(this.EmployeeList);
    })
  }
  }

  //♡⸜(˶˃ ᵕ ˂˶)⸝♡  (˶ᵔ ᵕ ᵔ˶) 