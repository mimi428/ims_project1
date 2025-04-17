import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TreeComponent } from "../tree/tree.component";
import { Item } from '../../model/Items';
import { ItemsService } from '../../service/items.service';

@Component({
  selector: 'app-product-master',
  imports: [CommonModule, ReactiveFormsModule, TreeComponent, RouterModule],
  templateUrl: './product-master.component.html',
  styleUrl: './product-master.component.css'
})
export class ProductMasterComponent implements OnInit {
  items: Item[] = [];

  activeTab = new FormControl('ProductList'); 

  constructor(private router: Router, private itemsService: ItemsService) {}
  ngOnInit(): void {
    this.loadItems()

  }
  loadItems(){
    this.itemsService.getItems().subscribe((data) => {
      this.items = data;
    });
  }
  redirectToAddProduct() {
    this.router.navigate(['/add-product']);
  }
  redirectTodash(){
    this.router.navigate(['/dashboard']);
  }
  onDelete(id: string) {
    const confirmed = window.confirm('Are you sure you want to delete this item?');
    if (confirmed) {
      this.itemsService.deleteItems(id).subscribe(() => {
        alert('Item deleted successfully!');
        this.loadItems();
      });
    }
  }
}

