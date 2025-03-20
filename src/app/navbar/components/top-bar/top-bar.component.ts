import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
  imports:[CommonModule]
})
export class TopBarComponent {
  categoryLinks: { path: string; label: string }[] = [];
  activeCategory: string = '';
  lowerNavbarWords: string[] = [];

  constructor(private router: Router) {}

  setLowerNavbar(section: string) {
    if (section === 'master') {
      this.lowerNavbarWords = ['Masters',
        'Inventory Info',
        'Scheme Management',
        'Fixed Assets Module',
        'Others'
        ];
    } else if (section === 'transactions') {
      this.lowerNavbarWords = ['Sales', 'Purchase', 'Inventory movement'];
    } else if (section === 'reports') {
      this.lowerNavbarWords = ['Monthly Report', 'Annual Report', 'Performance'];
    } else {
      this.lowerNavbarWords = [];
    }
  }

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