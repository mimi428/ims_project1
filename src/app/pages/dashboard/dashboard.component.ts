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
          ['Real juice'],
          ['Electrolyte Beverages'],
          ['Soft','Drinks'],
          ['Aprilsdfjvahbukhvb'],
          ['Mayudwbausdb']
        ],
        datasets: [{
          label: 'Drink Record',
          data: [190, 908, 509, 365, 702],
          backgroundColor: '#336799',
          hoverBackgroundColor:'rgba(96, 171, 231, 0.467)',
          borderRadius: 20
        }]
      },
      options: {
        responsive: true,
        indexAxis: 'x',
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
          backgroundColor: ['#854764', '#336799', 'pink'],
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
