import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ItemsService } from '../../service/items.service';
import { UnitService } from '../../service/unit.service';

import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-product',
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent { 
  itemForm: FormGroup;
  units: any[] = [];
  selectedTab: string = 'alternate';
  isEditMode = false;
  itemId: string | null = null;
  constructor(private fb: FormBuilder, private itemsService: ItemsService, private unitService: UnitService,  private route: ActivatedRoute, private router: Router) {
    this.itemForm = this.fb.group({
      itemName: ['', Validators.required],
      barcode: ['', Validators.required],
      unitName: ['', [Validators.required, Validators.minLength(2)]],
      conFactor:[''],
      alternateUnit:['']

    });
    
  }
  ngOnInit() {
    this.loadUnits();
    
      this.itemId = this.route.snapshot.paramMap.get('id');
      if (this.itemId) {
        this.isEditMode = true;
        this.itemsService.getItemById(this.itemId).subscribe(item => {
          this.itemForm.patchValue(item);
        });
      }

  }
  loadUnits() {
    this.unitService.getUnits().subscribe((data) => {
      this.units = data;
    });}

  //json file ma store garna lai
  onSubmit() {
    if (this.itemForm.valid) {
      if (this.isEditMode && this.itemId) {
        this.itemsService.updateItem(this.itemId, this.itemForm.value).subscribe({
          next: () => {
            alert('Item updated successfully!');
            this.router.navigate(['/product-master']); 
          },
          error: () => {
            alert('Failed to update item.');
          }
        });
      } else {
        this.itemsService.addItem(this.itemForm.value).subscribe({
          next: () => {
            alert('Item added successfully!');
            this.itemForm.reset();
          },
          error: () => {
            alert('Failure are the pillars to success?');
          }
        });
      }
    }
  }
  
 
  saveUnit() {
    if (this.itemForm.get('unitName')?.valid) { 
      const newUnit = { unitName: this.itemForm.get('unitName')?.value };
      this.unitService.addUnit(newUnit).subscribe(
        (response) => {
          console.log('Unit saved successfully:', response);
          this.units.push(response); 
          this.itemForm.get('unitName')?.reset(); 
          alert('Unit is saved!');
        },
        (error) => {
          console.error('Error saving unit:', error);
          alert('Failed to save unit. Please try again.');
        }
      );
    } else {
      alert('Please enter a valid unit name.');
    }
  }
  
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
}