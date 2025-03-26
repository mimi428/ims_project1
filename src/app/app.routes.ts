import { Routes } from '@angular/router';
import { ProductMasterComponent } from './pages/product-master/product-master.component';
import { TaxInvoiceComponent } from './pages/tax-invoice/tax-invoice.component';
import { MasterComponent } from './navbar/components/master/master.component';
import { TopBarComponent } from './navbar/components/top-bar/top-bar.component';
import { TransactionComponent } from './navbar/components/transaction/transaction.component';
import { Component } from '@angular/core';
import { AddProductComponent } from './pages/add-product/add-product.component';

export const routes: Routes = [
  {
    path: '',
    component: TopBarComponent,
    children: [
      { path: 'product-master', component: ProductMasterComponent},
      { path: 'tax-invoice', component: TaxInvoiceComponent },
      { path: 'add-product', component: AddProductComponent},
      ]
    }
  ]