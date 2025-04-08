import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ItemsService } from '../../service/items.service';

@Component({
  selector: 'app-add-product',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent { 
  itemForm: FormGroup;
  constructor(private fb: FormBuilder, private itemsService: ItemsService) {
    this.itemForm = this.fb.group({
      itemName: ['', Validators.required],
      barcode: ['', Validators.required]
    });
  }
  selectedTab: string = 'detail'; // Default tab open 
  // Function to switch tabs
  selectTab(tab: string): void {
    this.selectedTab = tab;
  }
  //for img displaying and popupss
  imageSrc: string | ArrayBuffer | null = null; 
  showPopup: boolean = false; 
  isUploaded: boolean = false; 
  selectedFile: File | null = null; 

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageSrc = reader.result; 
      };
      reader.readAsDataURL(file);
    }
  }

  uploadImage(): void {
    if (this.selectedFile) {
      this.isUploaded = true;
      this.showPopup = true;
    }
  }
  closePopup(): void {
    this.showPopup = false;
  }
  //for yield tab functionalityyyyyyyyyyyyy
  entries: { subItem: string, yield: string }[] = [];
  subItemControl = new FormControl('', [Validators.required]);
  yieldControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/), 
    Validators.min(0),
    Validators.max(100)
  ]);

  get yieldErrors() {
    return this.yieldControl.errors;
  }

  addEntry() {
    this.subItemControl.markAsTouched();
    this.yieldControl.markAsTouched();
    if (this.subItemControl.valid && this.yieldControl.valid) {
      this.entries.push({
        subItem: this.subItemControl.value!,
        yield: this.yieldControl.value!
      });
      this.subItemControl.reset('');
      this.yieldControl.reset('');
    }
  }
  editEntry(index: number) {
    const item = this.entries[index];
    this.subItemControl.setValue(item.subItem);
    this.yieldControl.setValue(item.yield);
    this.entries.splice(index, 1);
  }
  removeEntry(index: number) {
    this.entries.splice(index, 1);
  } 
  onSubmit() {
    if (this.itemForm.valid) {
      this.itemsService.addItem(this.itemForm.value).subscribe({
        next: () => {
          alert('Item added successfully!');
          this.itemForm.reset();
        },
        error: () => {
          alert('Failed to add item');
        }
      });
    }
  }
}