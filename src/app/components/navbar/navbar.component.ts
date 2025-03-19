import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports:[CommonModule]
})
export class NavbarComponent {
  categoryLinks: { path: string; label: string }[] = [];
  activeCategory: string = '';

  constructor(private router: Router) {}

  setCategory(category: string) {
    this.activeCategory = category;

    if (category === 'master') {
      this.categoryLinks = [
        { path: '/master/products', label: 'Products' },
        { path: '/master/categories', label: 'Categories' }
      ];
      this.router.navigate(['/master/products']); // Default page when Master is clicked
    } else if (category === 'transactions') {
      this.categoryLinks = [
        { path: '/transactions/sales', label: 'Sales' },
        { path: '/transactions/purchase', label: 'Purchase' }
      ];
      this.router.navigate(['/transactions/sales']); // Default page when Transaction is clicked
    } else {
      this.categoryLinks = [];
    }
  }
}
