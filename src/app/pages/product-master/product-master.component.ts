import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TreeComponent } from "../tree/tree.component";
import { Item } from '../../model/Items';
import { ItemsService } from '../../service/items.service';

@Component({
  selector: 'app-product-master',
  imports: [CommonModule, ReactiveFormsModule, TreeComponent],
  templateUrl: './product-master.component.html',
  styleUrl: './product-master.component.css'
})
export class ProductMasterComponent implements OnInit {
  items: Item[] = [];

  activeTab = new FormControl('ProductList'); 

  constructor(private router: Router, private itemsService: ItemsService) {}
  ngOnInit(): void {
      this.itemsService.getItems().subscribe((data) => {
        this.items = data;
      });

  }
  redirectToAddProduct() {
    this.router.navigate(['/add-product']);
  }
}
