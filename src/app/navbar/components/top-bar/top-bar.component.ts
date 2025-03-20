import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports:[CommonModule],
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent {
  lowerNavbarWords: string[] = []; 
  searchQuery: string = '';
  dropdownVisible: { [key: string]: boolean } = {}; // Track visibility of dropdowns

  // Set the lower navbar dynamically based on the upper navbar selection
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

    // Reset dropdowns when changing sections
    this.dropdownVisible = {};
  }

  // Toggle dropdown for a specific button
  toggleDropdown(word: string) {
    // Close all dropdowns first
    Object.keys(this.dropdownVisible).forEach(key => this.dropdownVisible[key] = false);
    this.dropdownVisible[word] = !this.dropdownVisible[word]; // Toggle selected dropdown
  }

  // Get the dropdown options dynamically
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
    } else {
      return [];
    }
  }

  // Handle clicking on a dropdown item
  onDropdownItemClick(option: string) {
    console.log("Clicked on:", option);
    alert(`You selected: ${option}`); // Replace with navigation logic
  }

  // Close dropdowns when clicking outside
  @HostListener('document:click', ['$event'])
  closeDropdown(event: MouseEvent) {
    const clickedOutside = !(event.target as HTMLElement).closest('.lower-navbar');
    if (clickedOutside) {
      this.dropdownVisible = {};
    }
  }
}
