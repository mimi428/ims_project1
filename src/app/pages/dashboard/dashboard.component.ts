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
        labels: ['Jan', 'Feb', 'March', 'April', 'May'],
        datasets: [{
          label: 'Visits',
          data: [100, 190, 309, 565, 702],
          backgroundColor: '#336799'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Monthly Visits'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 1000 // ✅ Limits Y-axis to 100
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
        labels: ['Debtors', 'Creditors', 'Others'],
        datasets: [{
          label: 'Debtors vs Creditors',
          data: [40, 35, 25],
          backgroundColor: ['#4CAF50', '#FF9800', '#9C27B0']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Debtors Vs Creditors'
          }
        }
      }
    });
  }
}
