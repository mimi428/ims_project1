import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AppComponent } from "../../../app.component";


@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent {
  lowerNavbarWords: string[] = []; 
  searchQuery: string = '';
  dropdownVisible: { [key: string]: boolean } = {}; // Track visibility of dropdowns
  
  constructor(private router: Router) {}

  setLowerNavbar(section: string) {
    if (section === 'master') {
      this.lowerNavbarWords = ['Masters','Inventory Info', 'Scheme Management', 'Fixed Assets Module', 'Others'];
    } else if (section === 'transactions') {
      this.lowerNavbarWords = ['Sales', 'Purchase', 'Payments'];
    } else if (section === 'reports') {
      this.lowerNavbarWords = ['Monthly Report', 'Annual Report', 'Performance'];
    } else {
      this.lowerNavbarWords = [];
    }

    this.dropdownVisible = {};
  }

  toggleDropdown(word: string) {

    Object.keys(this.dropdownVisible).forEach(key => this.dropdownVisible[key] = false);
    this.dropdownVisible[word] = !this.dropdownVisible[word]; // Toggle selected dropdown
  }

  getDropdownOptions(word: string): string[] {
    if (word === 'Masters') {
      return ['Product master', 'Party master', 'Category master','Warehouse master'];
    } else if (word === 'Inventory Info') {
      return ['Stock Details', 'Warehouse Info', 'Item Listings'];
    } else if (word === 'Scheme Management') {
      return ['Create Scheme', 'View Schemes', 'Edit Scheme'];
    } else if (word === 'Fixed Assets Module') {
      return ['Asset Register', 'Depreciation Info', 'Maintenance Schedule'];
    } else if (word === 'Others') {
      return ['Settings', 'User Roles', 'Configurations'];
    } else if (word === 'Sales') {
      return ['Abbreviated Tax Invoice', 'Sales Tax Invoice', 'Export Sales Invoice', 'Cash Handout'];
    } else if (word === 'Purchase') {
      return ['Purchase invoice', 'Import purchase invoice'];
    } else if (word === 'Payments') {
      return ['Asset Register', 'Depreciation Info', 'Maintenance Schedule'];
    } else if (word === 'Others') {
      return ['Settings', 'User Roles', 'Configurations'];
    } else {
      return [];
    }
    
  }


  onDropdownItemClick(option: string) {
    console.log("Clicked on:", option);
    // Navigate based on the selected option
    switch (option) {
      case 'Product master':
        this.router.navigate(['/product-master']);
        break;

    }
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: MouseEvent) {
    const clickedOutside = !(event.target as HTMLElement).closest('.lower-navbar');
    if (clickedOutside) {
      this.dropdownVisible = {};
    }
  }
}