import { Routes } from '@angular/router';
import { ProductMasterComponent } from './pages/product-master/product-master.component';
import { TaxInvoiceComponent } from './pages/tax-invoice/tax-invoice.component';
import { MasterComponent } from './navbar/components/master/master.component';
import { TopBarComponent } from './navbar/components/top-bar/top-bar.component';
import { TransactionComponent } from './navbar/components/transaction/transaction.component';
import { Component } from '@angular/core';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { DetailedInfoComponent } from './pages/detailed-info/detailed-info.component';
import { ImageUploadComponent } from './pages/image-upload/image-upload.component';

export const routes: Routes = [
  { path: '', redirectTo: 'master', pathMatch: 'full' },
 
  {
    path: '',
    component: TopBarComponent,
    children: [
      { path: 'product-master', component: ProductMasterComponent},
      { path: 'tax-invoice', component: TaxInvoiceComponent },
      {path: 'add-product', component: AddProductComponent},
        {path:'detailed-info', component:DetailedInfoComponent},
        {path:'image-upload', component:ImageUploadComponent},
      ]
    }
  ]