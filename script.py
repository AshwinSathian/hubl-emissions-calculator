def calculate_emission_fuel_and_cost(payload_percentage, distance_miles_per_day):
    FUEL_COST_PER_LITER = 1.5
    AVERAGE_SPEED = 25
    AVERAGE_TRU_CONSUMPTION = 3

    # Convert distance to kilometers
    distance_km_per_day = distance_miles_per_day * 1.60934

    # Standard Refrigerated Vehicle Data
    emission_rate_tare_std = 0.9118
    emission_rate_payload_std = 0.0004 + (0.395 - 0.0004) * (payload_percentage / 100)
    fuel_rate_tare_std = 0.36293
    fuel_rate_payload_std = 0.00016 + (0.15722 - 0.00016) * (payload_percentage / 100)

    # The CoolRun Pod Data
    emission_rate_tare_cool_run = 0.7663
    emission_rate_payload_cool_run = 0.0003 + (0.3311 - 0.0003) * (payload_percentage / 100)
    fuel_rate_tare_cool_run = 0.30501
    fuel_rate_payload_cool_run = 0.00013 + (0.13179 - 0.00013) * (payload_percentage / 100)

    # Calculations
    total_emission_rate_std = emission_rate_tare_std + emission_rate_payload_std
    total_emission_rate_cool_run = emission_rate_tare_cool_run + emission_rate_payload_cool_run
    total_fuel_rate_std = fuel_rate_tare_std + fuel_rate_payload_std
    total_fuel_rate_cool_run = fuel_rate_tare_cool_run + fuel_rate_payload_cool_run
    total_fuel_cost_for_journey_std = total_fuel_rate_std * FUEL_COST_PER_LITER * distance_km_per_day
    total_fuel_cost_for_journey_cool_run = total_fuel_rate_cool_run * FUEL_COST_PER_LITER * distance_km_per_day

    total_emission_rate_std_per_year = total_emission_rate_std * 250
    total_emission_rate_cool_run_per_year = total_emission_rate_cool_run * 250
    total_fuel_rate_std_per_year = total_fuel_rate_std * 250
    total_fuel_rate_cool_run_per_year = total_emission_rate_cool_run * 250
    total_fuel_cost_for_journey_std_per_year = total_fuel_cost_for_journey_std * 250
    total_fuel_cost_for_journey_cool_run_per_year = total_fuel_cost_for_journey_cool_run * 250

    tru_fuel_savings_per_day = (distance_km_per_day * AVERAGE_TRU_CONSUMPTION) / AVERAGE_SPEED
    tru_fuel_savings_per_year = tru_fuel_savings_per_day * 250

    result = {
        'chartData': [
            {
                'label': 'Total Emission Rate (kgCO2e/km)',
                'data': [
                    round(total_emission_rate_std, 4),
                    round(total_emission_rate_cool_run, 4),
                ],
            },
            {
                'label': 'Total Fuel Rate (L/km)',
                'data': [
                    round(total_fuel_rate_std, 4),
                    round(total_fuel_rate_cool_run, 4),
                ],
            },
            {
                'label': 'Total Fuel Cost for Journey (£)',
                'data': [
                    round(total_fuel_cost_for_journey_std, 4),
                    round(total_fuel_cost_for_journey_cool_run, 4),
                ],
            },
        ],
        'bestVehicle': 'Standard Refrigerated Vehicle' if total_fuel_cost_for_journey_std < total_fuel_cost_for_journey_cool_run else 'The CoolRun Pod',
        'carbonCredits': abs(total_fuel_cost_for_journey_std - total_fuel_cost_for_journey_cool_run),
        'standard': {
            'totalEmissionRateStd': round(total_emission_rate_std, 2),
            'totalFuelRateStd': round(total_fuel_rate_std, 2),
            'totalFuelCostForJourneyStd': round(total_fuel_cost_for_journey_std, 2),
        },
        'coolRun': {
            'totalEmissionRateCoolRun': round(total_emission_rate_cool_run, 2),
            'totalFuelRateCoolRun': round(total_fuel_rate_cool_run, 2),
            'totalFuelCostForJourneyCoolRun': round(total_fuel_cost_for_journey_cool_run, 2),
        },
        'truFuelSavingsPerDay': tru_fuel_savings_per_day,
        'truFuelSavingsPerYear': tru_fuel_savings_per_year,
    }

    return result
