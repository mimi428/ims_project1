import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements AfterViewInit {
   @ViewChild('barChart') barchartRef!: ElementRef;
   @ViewChild('pieChart') piechartRef!: ElementRef;

  barchart!: Chart;
  piechart!: Chart;

  ngAfterViewInit(): void {
    this.createBarChart();
    this.createPieChart();
  }
  createBarChart() {
    const ctx = this.barchartRef.nativeElement;
    this.barchart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
          {
            label: 'Sales',
            data: [80000, 95000, 100000, 85000, 110000],
            backgroundColor: '#4CAF50',
            hoverBackgroundColor: '#81C784',
            borderRadius: 10
          },
          {
            label: 'Purchase',
            data: [60000, 70000, 65000, 55000, 75000],
            backgroundColor: '#2196F3',
            hoverBackgroundColor: '#64B5F6',
            borderRadius: 10
          }
        ]
      },
      options: {
        responsive: true,
        indexAxis: 'x',
        plugins: {
          title: {
            display: true,

          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 120000
          }
        }
      }
    });
  }
  createPieChart() {
    const ctx = this.piechartRef.nativeElement;
    this.piechart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Electronics', 'Groceries', 'Clothing', 'Stationery', 'Others'],
        datasets: [{
          label: 'Sales by Category',
          data: [35, 25, 20, 10, 10],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
          hoverOffset: 10
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }
}  