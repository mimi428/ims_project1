import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-master',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-master.component.html',
  styleUrl: './product-master.component.css'
})
export class ProductMasterComponent {
  activeTab = new FormControl('ProductList'); 

  constructor(private router: Router) {}
  redirectToAddProduct() {
    this.router.navigate(['/add-product']);
  }
}
