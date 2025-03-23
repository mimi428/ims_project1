import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  imports: [CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent { 
  selectedTab: string = 'detail'; // Default selected tab

  // Function to switch tabs
  selectTab(tab: string): void {
    this.selectedTab = tab;
  }

}
