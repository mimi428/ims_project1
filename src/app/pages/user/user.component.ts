import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { User } from '../../model/User';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-user',
  imports: [CommonModule,RouterModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{
  users: User[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.authService.getUsers().subscribe({
      next: (data) => this.users = data,
      error: (err) => {
        alert('Error fetching users: ' + err.message);
      }
    });
  
  }
}
