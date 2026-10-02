import { DailyNutrition, MealItem } from '../types';
import { mockDailyNutrition } from '../data/mockData';

export const nutritionService = {
  async getDailyNutrition(): Promise<DailyNutrition> {
    return Promise.resolve({ ...mockDailyNutrition });
  },

  async addMeal(meal: Omit<MealItem, 'id'>): Promise<DailyNutrition> {
    const newMeal: MealItem = {
      ...meal,
      id: `m_${Date.now()}`,
    };
    mockDailyNutrition.meals.push(newMeal);
    mockDailyNutrition.calories += newMeal.calories;
    mockDailyNutrition.proteinGrams += newMeal.proteinGrams;
    mockDailyNutrition.carbsGrams += newMeal.carbsGrams;
    mockDailyNutrition.fatGrams += newMeal.fatGrams;
    return Promise.resolve({ ...mockDailyNutrition });
  },

  async logWater(amountLiters: number): Promise<DailyNutrition> {
    mockDailyNutrition.waterLiters = Math.min(
      mockDailyNutrition.targetWaterLiters + 2,
      Math.round((mockDailyNutrition.waterLiters + amountLiters) * 10) / 10
    );
    return Promise.resolve({ ...mockDailyNutrition });
  },
};
