import { Injectable } from '@angular/core';

@Injectable()
export class EmissionsCalculatorService {
  constructor() {}

  calculateEmissionFuelAndCost(
    payloadPercentage: number,
    fuelCostPerLiter: number,
    distanceMiles: number
  ) {
    // Convert distance to kilometers
    const distanceKm = distanceMiles * 1.60934;

    // Standard Refrigerated Vehicle Data
    const emissionRateTareStd = 0.9118;
    const emissionRatePayloadStd =
      0.0004 + (0.395 - 0.0004) * (payloadPercentage / 100);
    const fuelRateTareStd = 0.36293;
    const fuelRatePayloadStd =
      0.00016 + (0.15722 - 0.00016) * (payloadPercentage / 100);

    // The CoolRun Pod Data
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
          backgroundColor: ['rgba(17, 98, 144, 0.2)', 'rgba(63, 166, 72, 0.2)'],
          borderColor: ['rgb(17, 98, 144)', 'rgb(63, 166, 72)'],
          borderWidth: 1,
          data: [
            totalEmissionRateStd.toFixed(4),
            totalEmissionRateHubl.toFixed(4),
          ],
        },
        {
          label: 'Total Fuel Rate (lit/km)',
          backgroundColor: ['rgba(17, 98, 144, 0.2)', 'rgba(63, 166, 72, 0.2)'],
          borderColor: ['rgb(17, 98, 144)', 'rgb(63, 166, 72)'],
          borderWidth: 1,
          data: [totalFuelRateStd.toFixed(4), totalFuelRateHubl.toFixed(4)],
        },
        {
          label: 'Total Fuel Cost for Journey (£)',
          backgroundColor: ['rgba(17, 98, 144, 0.2)', 'rgba(63, 166, 72, 0.2)'],
          borderColor: ['rgb(17, 98, 144)', 'rgb(63, 166, 72)'],
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
          : 'The CoolRun Pod',
      carbonCredits: Math.abs(
        totalFuelCostForJourneyStd - totalFuelCostForJourneyHubl
      ).toFixed(4),
    };

    return result;
  }
}
