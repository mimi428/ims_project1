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
        labels: [
          ['Real', 'Juice'],
          ['Electrolyte', 'Beverages'],
          ['Soft','Drinks'],
          ['Aprilsdfjvahbukhvb'],
          ['Mayudwbausdb']
        ],
        datasets: [{
          label: 'Drink Record',
          data: [190, 808, 509, 365, 702],
          backgroundColor: '#336799',
          borderRadius: 20
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'RECORDS'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 1000
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
        labels: ['Today', 'Tomorrow', 'Others'],
        datasets: [{
          label: 'This Vs That',
          data: [40, 35, 25],
          backgroundColor: ['#4CAF50', '#FF9800', '#9C27B0'],
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'THIS VS THAT'
          }
        }
      }
    });
  }
}
