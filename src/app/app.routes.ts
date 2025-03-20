// import { Routes } from '@angular/router';
// import { NavbarComponent } from './components/navbar/navbar.component';
// import { ProductComponent } from './components/master/product/product.component';
// import { TransactionComponent } from './components/transaction/transaction.component';

// export const routes: Routes = [
//     {
//         path: '',
//         component: NavbarComponent,
//         children: [
//           { path: 'transactions', component: TransactionComponent },
//           { path: 'products', component: ProductComponent },
//           { path: '', redirectTo: 'transactions', pathMatch: 'full' },
//         ]
//     }
// ];
import { Routes } from '@angular/router';
import { MasterComponent } from './navbar/components/master/master.component';
import { TopBarComponent } from './navbar/components/top-bar/top-bar.component';
import { TransactionComponent } from './navbar/components/transaction/transaction.component';


export const routes: Routes = [
  {
    path: '',
    component: TopBarComponent,
    children: [
      {
        path: 'master',
        component: MasterComponent,
        // children: [
        //   { path: 'products', component: ProductComponent },
        // ]
      },
      {
        path: 'transactions',
        component: TransactionComponent,
        // children: [
        //   { path: 'sales', component: SalesComponent },
        // ]
      },
      { path: '', redirectTo: 'master', pathMatch: 'full' },
    ],
  },
];
