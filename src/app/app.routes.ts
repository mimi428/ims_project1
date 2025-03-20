import { Routes } from '@angular/router';
import { ProductMasterComponent } from './product-master/product-master.component';
import { TaxInvoiceComponent } from './tax-invoice/tax-invoice.component';
import { MasterComponent } from './navbar/components/master/master.component';
import { TopBarComponent } from './navbar/components/top-bar/top-bar.component';
import { TransactionComponent } from './navbar/components/transaction/transaction.component';

export const routes: Routes = [
  { path: '', redirectTo: 'master', pathMatch: 'full' },
  {
    path: '',
    component: TopBarComponent,
    children: [
      { path: 'product-master', component: ProductMasterComponent },
      { path: 'tax-invoice', component: TaxInvoiceComponent },
    ],
  }
]