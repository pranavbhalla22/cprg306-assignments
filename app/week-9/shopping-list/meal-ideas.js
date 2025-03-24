"use client";
import { useState, useEffect } from 'react';

export default function MealIdeas({ ingredient }) {
  const [meals, setMeals] = useState([]);
  const [mealDetails, setMealDetails] = useState([]);
  const [expandedMealId, setExpandedMealId] = useState(null); // Track expanded meal

  // Fetch meal ideas from TheMealDB API
  const fetchMealIdeas = async (ingredient) => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
      );
      const data = await response.json();
      setMeals(data.meals || []);
    } catch (error) {
      console.error("Error fetching meal ideas:", error);
    }
  };

  // Fetch meal details for a specific meal
  const fetchMealDetails = async (mealId) => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
      );
      const data = await response.json();
      return data.meals[0]; // Return the first meal object
    } catch (error) {
      console.error("Error fetching meal details:", error);
    }
  };

  // Load meal details when meals change
  useEffect(() => {
    const loadMealDetails = async () => {
      const details = await Promise.all(
        meals.map((meal) => fetchMealDetails(meal.idMeal))
      );
      setMealDetails(details);
    };

    if (meals.length > 0) {
      loadMealDetails();
    }
  }, [meals]);

  // Load meal ideas when the ingredient changes
  useEffect(() => {
    if (ingredient) {
      fetchMealIdeas(ingredient);
    }
  }, [ingredient]);

  // Extract ingredients and measurements from meal details
  const getIngredients = (meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredients.push(
          `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
        );
      } else {
        break; // Stop if no more ingredients
      }
    }
    return ingredients;
  };

  // Toggle ingredient visibility for a meal
  const toggleIngredients = (mealId) => {
    setExpandedMealId(expandedMealId === mealId ? null : mealId);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Meal Ideas</h2>
      {meals.length > 0 ? (
        <ul>
          {mealDetails.map((meal) => (
            <li key={meal.idMeal} className="mb-4">
              <div
                className="cursor-pointer"
                onClick={() => toggleIngredients(meal.idMeal)}
              >
                <h3 className="font-bold text-gray-800 hover:text-blue-500">
                  {meal.strMeal}
                </h3>
              </div>
              {expandedMealId === meal.idMeal && (
                <ul className="ml-4 list-disc mt-2">
                  {getIngredients(meal).map((ingredient, index) => (
                    <li key={index} className="text-gray-700">
                      {ingredient}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No meal ideas found for {ingredient}.</p>
      )}
    </div>
  );
}