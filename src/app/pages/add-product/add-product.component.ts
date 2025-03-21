import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DetailedInfoComponent } from "../detailed-info/detailed-info.component";
import { AlternateUnitComponent } from "../alternate-unit/alternate-unit.component";
import { InventoryControlComponent } from "../inventory-control/inventory-control.component";
import { ImageUploadComponent } from "../image-upload/image-upload.component";
import { YieldComponent } from "../yield/yield.component";
import { BatchwisePriceComponent } from "../batchwise-price/batchwise-price.component";

@Component({
  selector: 'app-add-product',
  imports: [CommonModule, DetailedInfoComponent, AlternateUnitComponent, InventoryControlComponent, ImageUploadComponent, YieldComponent, BatchwisePriceComponent],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent { 
  activeTab!: string;

  constructor() { }

}


