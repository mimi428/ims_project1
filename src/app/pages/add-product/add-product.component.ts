import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent { 
  selectedTab: string = 'detail'; // Default 

  // Function to switch tabs
  selectTab(tab: string): void {
    this.selectedTab = tab;
  }

  //for yield tab functionalityyyyyyyyyyyyy
  entries: { subItem: string, yield: string }[] = [];
  subItemControl = new FormControl('');
  yieldControl = new FormControl('');

  addEntry() {
    const subItemValue = this.subItemControl.value;
    const yieldValue = this.yieldControl.value;

    if (subItemValue && yieldValue) {
      // Add the new entry to the entries array
      this.entries.push({
        subItem: subItemValue,
        yield: yieldValue
      });

      this.subItemControl.setValue('');
      this.yieldControl.setValue('');
    }
  }
  editEntry(index: number) {
    const item = this.entries[index];
    this.subItemControl.setValue(item.subItem);
    this.yieldControl.setValue(item.yield);
    this.entries.splice(index, 1);
  }

  removeEntry(index: number) {
    // Remove the entry at the specified index
    this.entries.splice(index, 1);
  }


}
