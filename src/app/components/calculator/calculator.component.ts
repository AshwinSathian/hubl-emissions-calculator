import { Component, OnInit } from '@angular/core';
import { fadeInOut } from 'src/app/animations/fade-in-out.animation';
import { EmissionsCalculatorService } from 'src/app/services/emissions-calculator.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
  providers: [EmissionsCalculatorService],
  animations: [fadeInOut],
})
export class CalculatorComponent implements OnInit {
  payloadPercentage = 0;
  fuelCostPerLiter = 0;
  distanceMiles = 0;
  acceptingInput = true;
  savingsCalculated = false;
  isLoading = false;
  calculationResults: {
    label: string;
    backgroundColor: string;
    borderColor: string;
    data: number[];
  }[] = [];
  bestVehicle = '';
  carbonCredits = 0;
  chartOptions?: any;
  chartData?: any;
  emissionRateData?: any;
  fuelRateData?: any;
  fuelCostData?: any;
  labels = ['Standard Refrigerated Vehicle', 'HUBL Non-Refrigerated Vehicle'];

  constructor(private service: EmissionsCalculatorService) {}

  ngOnInit(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.chartOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }

  calculate() {
    this.acceptingInput = false;
    this.isLoading = true;
    setTimeout(() => {
      this._executeCalculation();
    }, 2000);
  }

  private _executeCalculation() {
    const result = this.service.calculateEmissionFuelAndCost(
      this.payloadPercentage,
      this.fuelCostPerLiter,
      this.distanceMiles
    ) as any;

    this.calculationResults = result.chartData as any;
    this.emissionRateData = {
      labels: this.labels,
      datasets: [this.calculationResults?.[0]],
    };
    this.fuelRateData = {
      labels: this.labels,
      datasets: [this.calculationResults?.[1]],
    };
    this.fuelCostData = {
      labels: this.labels,
      datasets: [this.calculationResults?.[2]],
    };

    this.bestVehicle = result.bestVehicle;
    this.carbonCredits = result.carbonCredits;

    this.isLoading = false;
    this.savingsCalculated = true;
  }

  reset() {
    this.payloadPercentage = 0;
    this.fuelCostPerLiter = 0;
    this.distanceMiles = 0;
    this.acceptingInput = true;
    this.savingsCalculated = false;
    this.isLoading = false;
    this.calculationResults = [];
    this.bestVehicle = '';
    this.carbonCredits = 0;
    this.chartData = null;
    this.emissionRateData = null;
    this.fuelRateData = null;
    this.fuelCostData = null;
  }
}
