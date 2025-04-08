import { Routes } from '@angular/router';
import { ProductMasterComponent } from './pages/product-master/product-master.component';
import { TaxInvoiceComponent } from './pages/tax-invoice/tax-invoice.component';
import { MasterComponent } from './navbar/components/master/master.component';
import { TopBarComponent } from './navbar/components/top-bar/top-bar.component';
import { TransactionComponent } from './navbar/components/transaction/transaction.component';
import { Component } from '@angular/core';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { AddEmployeeComponent } from './pages/add-employee/add-employee.component';

export const routes: Routes = [
  {
    path:'',
    redirectTo:'login',
    pathMatch: "full"
},
{
    path:'login',
    component:LoginComponent
},
  {
    path: '',
    component: TopBarComponent,
    children: [
      {path: 'dashboard', component:DashboardComponent},
      { path: 'product-master', component: ProductMasterComponent},
      { path: 'tax-invoice', component: TaxInvoiceComponent },
      { path: 'add-product', component: AddProductComponent},
      { path: 'employee', component:EmployeeComponent},
      { path: 'add-employee', component:AddEmployeeComponent}
      ]
    }
  ]