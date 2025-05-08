import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, HostListener } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TreeComponent } from "../tree/tree.component";
import { Item } from '../../model/Items';
import { ItemsService } from '../../service/items.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-product-master',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TreeComponent, RouterModule],
  templateUrl: './product-master.component.html',
  styleUrl: './product-master.component.css'
})
export class ProductMasterComponent implements OnInit {
  items: Item[] = [];
  filteredItems: Item[] = [];
  searchTerm: string = '';

  activeTab = new FormControl('ProductList'); 

  constructor(private router: Router, private itemsService: ItemsService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    this.itemsService.getItems().subscribe((data) => {
      this.items = data;
      this.filteredItems = data;
    });
  }

  onSearch(event: Event) {
    event.preventDefault();
    const term = this.searchTerm.toLowerCase();
    this.filteredItems = this.items.filter(item =>
      item.itemName.toLowerCase().includes(term) ||
      item.barcode.toLowerCase().includes(term) ||
      item.unitName.toLowerCase().includes(term)
    );
  }

  redirectToAddProduct() {
    this.router.navigate(['/add-product']);
  }

  redirectTodash() {
    this.router.navigate(['/dashboard']);
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'F2') {
      event.preventDefault();
      this.triggerImportFileInput();
    }
  }

  triggerImportFileInput() {
    const fileInput = document.getElementById('importFileInput') as HTMLInputElement;
    fileInput?.click();
  }

  handleFileImport(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const importedItems = XLSX.utils.sheet_to_json<Item>(sheet);

      this.itemsService.getItems().subscribe({
        next: (existingItems) => {
          const newItems: Item[] = [];

          importedItems.forEach((importedItem) => {
            const exists = existingItems.some(
              (existingItem) => existingItem.barcode === importedItem.barcode
            );

            if (!exists) {
              this.itemsService
                .addItem({
                  itemName: importedItem.itemName,
                  barcode: importedItem.barcode,
                  unitName: importedItem.unitName,
                })
                .subscribe({
                  next: (savedItem) => {
                    newItems.push(savedItem);
                    this.items.push(savedItem);
                    this.filteredItems = [...this.items];
                  },
                  error: (err) => console.error('Error saving item', err),
                });
            } else {
              console.log(`Duplicate item skipped: ${importedItem.itemName}`);
            }
          });

          alert('Import completed and saved to database.');
        },
        error: (err) => console.error('Error fetching items', err),
      });
    };

    reader.readAsArrayBuffer(file);
  }

  ExportProduct(): void {
    const fileName = 'product-list.xlsx';
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.items);
    const workbook: XLSX.WorkBook = {
      Sheets: { 'Products': worksheet },
      SheetNames: ['Products']
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });
    const data: Blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    FileSaver.saveAs(data, fileName);
  }

  onDelete(id: string) {
    const confirmed = window.confirm('Are you sure you want to delete this item?');
    if (confirmed) {
      this.itemsService.deleteItems(id).subscribe(() => {
        alert('Item deleted successfully!');
        this.loadItems();
      });
    }
  }
}
