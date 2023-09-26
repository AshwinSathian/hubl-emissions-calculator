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
  payloadPercentage = 87;
  distanceMilesPerDay = 1212;
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
  chartData?: any;
  emissionRateData?: any;
  fuelRateData?: any;
  fuelCostData?: any;
  labels = ['Standard Refrigerated Vehicle', 'The CoolRun Pod'];

  totalEmissionRateSavings = 0;
  totalFuelRateSavings = 0;
  totalFuelCostForJourneySavings = 0;

  truFuelSavingsPerDay = 0;
  truFuelSavingsPerYear = 0;

  constructor(private service: EmissionsCalculatorService) {}

  ngOnInit(): void {}

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
      this.distanceMilesPerDay
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

    this.truFuelSavingsPerDay = this.fullResult?.truFuelSavingsPerDay;
    this.truFuelSavingsPerYear = this.fullResult?.truFuelSavingsPerYear;

    this.isLoading = false;
    this.savingsCalculated = true;
  }

  reset() {
    this.savingsCalculated = false;
    this.isLoading = true;
    setTimeout(() => {
      this.payloadPercentage = 0;
      this.distanceMilesPerDay = 0;
      this.calculationResults = [];
      this.bestVehicle = '';
      this.carbonCredits = 0;
      this.totalEmissionRateSavings = 0;
      this.totalFuelRateSavings = 0;
      this.totalFuelCostForJourneySavings = 0;
      this.truFuelSavingsPerDay = 0;
      this.truFuelSavingsPerYear = 0;
      this.chartData = null;
      this.emissionRateData = null;
      this.fuelRateData = null;
      this.fuelCostData = null;
      this.isLoading = false;
      this.acceptingInput = true;
    }, 500);
  }
}
