import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Bill } from '../../model/View';
import { ViewService } from '../../service/view.service';

@Component({
  selector: 'app-view',
  imports: [CommonModule],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent implements OnInit{
  billData:Bill[]=[]; // Array to hold the fetched data

  constructor(private viewService: ViewService) {}

  ngOnInit(): void {
    this.viewService.getbillingData().subscribe(
      (data) => {
        this.billData = data; // Assign fetched data to item
        console.log('Bill loaded:', this.billData);
      }
    );
  }

}
