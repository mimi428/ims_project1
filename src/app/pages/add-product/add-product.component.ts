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
  selectedTab: string = 'detail'; // Default tab open 
  // Function to switch tabs
  selectTab(tab: string): void {
    this.selectedTab = tab;
  }
  //for img displaying and popupss
  imageSrc: string | ArrayBuffer | null = null; // image data URL hold garera rakhxa
  showPopup: boolean = false; // popup visibile xa ki nai
  isUploaded: boolean = false; // upload btn click vayo ki nai
  selectedFile: File | null = null; // selected file k ho 

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageSrc = reader.result; // Set the image data URL
      };
      reader.readAsDataURL(file);
    }
  }

  uploadImage(): void {
    if (this.selectedFile) {
      console.log('Uploading file:', this.selectedFile.name);
      this.isUploaded = true;
      this.showPopup = true;
    }
  }
  closePopup(): void {
    this.showPopup = false;
  }
  //for yield tab functionalityyyyyyyyyyyyy
  entries: { subItem: string, yield: string }[] = [];
  subItemControl = new FormControl('');
  yieldControl = new FormControl('');

  addEntry() {
    const subItemValue = this.subItemControl.value;
    const yieldValue = this.yieldControl.value;

    if (subItemValue && yieldValue) {
      // Add the new entry push
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
    // Remove the entry
    this.entries.splice(index, 1);//splice means 
  }


}
