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
    const emissionRateTareCoolRun = 0.7663;
    const emissionRatePayloadCoolRun =
      0.0003 + (0.3311 - 0.0003) * (payloadPercentage / 100);
    const fuelRateTareCoolRun = 0.30501;
    const fuelRatePayloadCoolRun =
      0.00013 + (0.13179 - 0.00013) * (payloadPercentage / 100);

    // Calculations
    const totalEmissionRateStd = emissionRateTareStd + emissionRatePayloadStd;
    const totalEmissionRateCoolRun =
      emissionRateTareCoolRun + emissionRatePayloadCoolRun;
    const totalFuelRateStd = fuelRateTareStd + fuelRatePayloadStd;
    const totalFuelRateCoolRun = fuelRateTareCoolRun + fuelRatePayloadCoolRun;
    const totalFuelCostForJourneyStd =
      totalFuelRateStd * fuelCostPerLiter * distanceKm;
    const totalFuelCostForJourneyCoolRun =
      totalFuelRateCoolRun * fuelCostPerLiter * distanceKm;

    const result = {
      chartData: [
        {
          label: 'Total Emission Rate (kgCO2e/km)',
          backgroundColor: ['rgba(17, 98, 144, 0.2)', 'rgba(63, 166, 72, 0.2)'],
          borderColor: ['rgb(17, 98, 144)', 'rgb(63, 166, 72)'],
          borderWidth: 1,
          data: [
            totalEmissionRateStd.toFixed(4),
            totalEmissionRateCoolRun.toFixed(4),
          ],
        },
        {
          label: 'Total Fuel Rate (lit/km)',
          backgroundColor: ['rgba(17, 98, 144, 0.2)', 'rgba(63, 166, 72, 0.2)'],
          borderColor: ['rgb(17, 98, 144)', 'rgb(63, 166, 72)'],
          borderWidth: 1,
          data: [totalFuelRateStd.toFixed(4), totalFuelRateCoolRun.toFixed(4)],
        },
        {
          label: 'Total Fuel Cost for Journey (£)',
          backgroundColor: ['rgba(17, 98, 144, 0.2)', 'rgba(63, 166, 72, 0.2)'],
          borderColor: ['rgb(17, 98, 144)', 'rgb(63, 166, 72)'],
          borderWidth: 1,
          data: [
            totalFuelCostForJourneyStd.toFixed(4),
            totalFuelCostForJourneyCoolRun.toFixed(4),
          ],
        },
      ],
      bestVehicle:
        totalFuelCostForJourneyStd < totalFuelCostForJourneyCoolRun
          ? 'Standard Refrigerated Vehicle'
          : 'The CoolRun Pod',
      carbonCredits: Math.abs(
        totalFuelCostForJourneyStd - totalFuelCostForJourneyCoolRun
      ).toFixed(2),
      standard: {
        totalEmissionRateStd: totalEmissionRateStd.toFixed(2),
        totalFuelRateStd: totalFuelRateStd.toFixed(2),
        totalFuelCostForJourneyStd: totalFuelCostForJourneyStd.toFixed(2),
      },
      coolRun: {
        totalEmissionRateCoolRun: totalEmissionRateCoolRun.toFixed(2),
        totalFuelRateCoolRun: totalFuelRateCoolRun.toFixed(2),
        totalFuelCostForJourneyCoolRun:
          totalFuelCostForJourneyCoolRun.toFixed(2),
      },
    };

    return result;
  }
}
