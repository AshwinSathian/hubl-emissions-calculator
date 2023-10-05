# Python code to calculate fuel consumption and emission rates based on payload percentage
# Also includes a simple bar chart visualization for comparison

import matplotlib.pyplot as plt

def calculate_emission_fuel_and_cost():
   # User input for payload percentage, fuel cost, distance and number of vehicles
   payload_percentage = float(input("Enter the payload percentage (0 to 100): "))
   fuel_cost_per_liter = float(input("Enter the cost of fuel per liter (in £): "))
   distance_miles = float(input("Enter the distance for the journey (in miles): "))
   num_vehicles = int(input("Enter the number of vehicles: "))

   # Convert distance to kilometers
   distance_km = distance_miles * 1.60934

   # Standard Refrigerated Vehicle Data
   emission_rate_tare_std = 0.9118
   emission_rate_payload_std = 0.0004 + (0.3950 - 0.0004) * (payload_percentage / 100)
   fuel_rate_tare_std = 0.36293
   fuel_rate_payload_std = 0.00016 + (0.15722 - 0.00016) * (payload_percentage / 100)

   # The CoolRun Pod Data
   emission_rate_tare_hubl = 0.7663
   emission_rate_payload_hubl = 0.0003 + (0.3311 - 0.0003) * (payload_percentage / 100)
   fuel_rate_tare_hubl = 0.30501
   fuel_rate_payload_hubl = 0.00013 + (0.13179 - 0.00013) * (payload_percentage / 100)

   # Calculations
   total_emission_rate_std = emission_rate_tare_std + emission_rate_payload_std
   total_emission_rate_hubl = emission_rate_tare_hubl + emission_rate_payload_hubl
   total_fuel_rate_std = fuel_rate_tare_std + fuel_rate_payload_std
   total_fuel_rate_hubl = fuel_rate_tare_hubl + fuel_rate_payload_hubl
   total_fuel_cost_for_journey_std = total_fuel_rate_std * fuel_cost_per_liter * distance_km
   total_fuel_cost_for_journey_hubl = total_fuel_rate_hubl * fuel_cost_per_liter * distance_km

   # Display the results
   print("\nResults:")
   print(f"Standard Refrigerated Vehicle (For {num_vehicles} vehicles):")
   print(f"  - Total Emission Rate (kgCO2e/km): {round(total_emission_rate_std, 4)}")
   print(f"  - Total Fuel Rate (L/km): {round(total_fuel_rate_std, 4)}")
   print(f"  - Total Fuel Cost for Journey (£): {round(total_fuel_cost_for_journey_std, 4)}")
   print(f"\nThe CoolRun Pod (For {num_vehicles} vehicles):")
   print(f"  - Total Emission Rate (kgCO2e/km): {round(total_emission_rate_hubl, 4)}")
   print(f"  - Total Fuel Rate (L/km): {round(total_fuel_rate_hubl, 4)}")
   print(f"  - Total Fuel Cost for Journey (£): {round(total_fuel_cost_for_journey_hubl, 4)}")

   # Determine which vehicle is best to use
   best_vehicle = 'Standard Refrigerated Vehicle' if total_fuel_cost_for_journey_std < total_fuel_cost_for_journey_hubl else 'The CoolRun Pod'

   # Carbon credits calculation
   carbon_credits = abs(total_fuel_cost_for_journey_std - total_fuel_cost_for_journey_hubl)

   # Create visualization
   x = [0, 1]
   y_values_cost = [total_fuel_cost_for_journey_std, total_fuel_cost_for_journey_hubl]
   y_values_emission = [total_emission_rate_std, total_emission_rate_hubl]
   plt.figure(figsize=(12, 6))
   plt.subplot(1, 2, 1)
   plt.bar(x, y_values_emission, color=['b', 'r'])
   plt.xticks(x, ['Standard', 'HUBL'])
   plt.ylabel('Total Emission Rate (kgCO2e/km)')
   plt.subplot(1, 2, 2)
   plt.bar(x, y_values_cost, color=['g', 'y'])
   plt.xticks(x, ['Standard', 'HUBL'])
   plt.ylabel('Total Fuel Cost for Journey (£)')
   plt.show()
   print(f"\nBest Vehicle to Use: {best_vehicle}")
   print(f"\n🌱 Carbon Credits: {round(carbon_credits, 4)} 🌱")
   print("Congratulations! You've made a positive impact on the environment by reducing emissions!")

# Run the function and capture the results
calculate_emission_fuel_and_cost()