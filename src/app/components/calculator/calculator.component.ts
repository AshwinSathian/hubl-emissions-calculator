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
  fuelCostPerLiter = 1.5;
  distanceMiles = 0;
  acceptingInput = true;
  savingsCalculated = false;
  isLoading = false;
  fullResult?: any;
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
  labels = ['Standard Refrigerated Vehicle', 'The CoolRun Pod'];

  totalEmissionRateSavings = 0;
  totalFuelRateSavings = 0;
  totalFuelCostForJourneySavings = 0;

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
    }, 1000);
  }

  private _executeCalculation() {
    const result = this.service.calculateEmissionFuelAndCost(
      this.payloadPercentage,
      this.fuelCostPerLiter,
      this.distanceMiles
    ) as any;

    this.fullResult = result;
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

    this.totalEmissionRateSavings = Math.round(
      ((this.fullResult?.standard?.totalEmissionRateStd -
        this.fullResult?.coolRun?.totalEmissionRateCoolRun) *
        100) /
        this.fullResult?.standard?.totalEmissionRateStd
    );
    this.totalFuelRateSavings = Math.round(
      ((this.fullResult?.standard?.totalFuelRateStd -
        this.fullResult?.coolRun?.totalFuelRateCoolRun) *
        100) /
        this.fullResult?.standard?.totalFuelRateStd
    );
    this.totalFuelCostForJourneySavings = Math.round(
      ((this.fullResult?.standard?.totalFuelCostForJourneyStd -
        this.fullResult?.coolRun?.totalFuelCostForJourneyCoolRun) *
        100) /
        this.fullResult?.standard?.totalFuelCostForJourneyStd
    );

    this.isLoading = false;
    this.savingsCalculated = true;
  }

  reset() {
    this.savingsCalculated = false;
    this.isLoading = true;
    setTimeout(() => {
      this.payloadPercentage = 0;
      this.distanceMiles = 0;
      this.calculationResults = [];
      this.bestVehicle = '';
      this.carbonCredits = 0;
      this.totalEmissionRateSavings = 0;
      this.totalFuelRateSavings = 0;
      this.totalFuelCostForJourneySavings = 0;
      this.chartData = null;
      this.emissionRateData = null;
      this.fuelRateData = null;
      this.fuelCostData = null;
      this.isLoading = false;
      this.acceptingInput = true;
    }, 500);
  }
}
