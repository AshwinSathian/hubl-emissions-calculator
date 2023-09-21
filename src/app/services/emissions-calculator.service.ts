import { Injectable } from '@angular/core';

@Injectable()
export class EmissionsCalculatorService {
  constructor() {}

  calculateEmissionFuelAndCost(
    payloadPercentage: number,
    fuelCostPerLiter: number,
    distanceMiles: number
  ) {
    const documentStyle = getComputedStyle(document.documentElement);

    // Convert distance to kilometers
    const distanceKm = distanceMiles * 1.60934;

    // Standard Refrigerated Vehicle Data
    const emissionRateTareStd = 0.9118;
    const emissionRatePayloadStd =
      0.0004 + (0.395 - 0.0004) * (payloadPercentage / 100);
    const fuelRateTareStd = 0.36293;
    const fuelRatePayloadStd =
      0.00016 + (0.15722 - 0.00016) * (payloadPercentage / 100);

    // HUBL Non-Refrigerated Vehicle Data
    const emissionRateTareHubl = 0.7663;
    const emissionRatePayloadHubl =
      0.0003 + (0.3311 - 0.0003) * (payloadPercentage / 100);
    const fuelRateTareHubl = 0.30501;
    const fuelRatePayloadHubl =
      0.00013 + (0.13179 - 0.00013) * (payloadPercentage / 100);

    // Calculations
    const totalEmissionRateStd = emissionRateTareStd + emissionRatePayloadStd;
    const totalEmissionRateHubl =
      emissionRateTareHubl + emissionRatePayloadHubl;
    const totalFuelRateStd = fuelRateTareStd + fuelRatePayloadStd;
    const totalFuelRateHubl = fuelRateTareHubl + fuelRatePayloadHubl;
    const totalFuelCostForJourneyStd =
      totalFuelRateStd * fuelCostPerLiter * distanceKm;
    const totalFuelCostForJourneyHubl =
      totalFuelRateHubl * fuelCostPerLiter * distanceKm;

    const result = {
      chartData: [
        {
          label: 'Total Emission Rate (kgCO2e/km)',
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgb(255, 159, 64)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
          ],
          borderWidth: 1,
          data: [
            totalEmissionRateStd.toFixed(4),
            totalEmissionRateHubl.toFixed(4),
          ],
        },
        {
          label: 'Total Fuel Rate (lit/km)',
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgb(255, 159, 64)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
          ],
          borderWidth: 1,
          data: [totalFuelRateStd.toFixed(4), totalFuelRateHubl.toFixed(4)],
        },
        {
          label: 'Total Fuel Cost for Journey (£)',
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgb(255, 159, 64)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
          ],
          borderWidth: 1,
          data: [
            totalFuelCostForJourneyStd.toFixed(4),
            totalFuelCostForJourneyHubl.toFixed(4),
          ],
        },
      ],
      bestVehicle:
        totalFuelCostForJourneyStd < totalFuelCostForJourneyHubl
          ? 'Standard Refrigerated Vehicle'
          : 'HUBL Non-Refrigerated Vehicle',
      carbonCredits: Math.abs(
        totalFuelCostForJourneyStd - totalFuelCostForJourneyHubl
      ).toFixed(4),
    };

    return result;
  }
}
