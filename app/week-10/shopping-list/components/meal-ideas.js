"use client";
 
 import { useState, useEffect } from "react";
 
 const fetchMealIdeas = async (ingredient) => {
   const response = await fetch(
     `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
   );
   const data = await response.json();
   return data.meals || [];
 };
 
 const fetchMealDetails = async (mealId) => {
   const response = await fetch(
     `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
   );
   const data = await response.json();
   return data.meals[0];
 };
 
 export default function MealIdeas({ ingredient }) {
   const [meals, setMeals] = useState([]);
   const [selectedMeal, setSelectedMeal] = useState(null);
 
   const handleSelectMeal = async (mealId) => {
     if (selectedMeal?.idMeal === mealId) {
       setSelectedMeal(null);
     } else {
       const meal = await fetchMealDetails(mealId);
       setSelectedMeal(meal);
     }
   };
 
   const loadMealIdeas = async () => {
     const ideas = await fetchMealIdeas(ingredient);
     setMeals(ideas);
   };
 
   useEffect(() => {
     loadMealIdeas();
   }, [ingredient]);
 
   return (
     <div>
       <h2 className="text-xl font-bold"></h2>
       {ingredient === "" ? (
         <p></p>
       ) : meals && meals.length > 0 ? (
         <div>
           <p>Here are some meal ideas using {ingredient}:</p>
           <ul>
             {meals.map((meal) => (
               <li
                 key={meal.idMeal}
                 onClick={() => handleSelectMeal(meal.idMeal)}
                 style={{ cursor: "pointer" }}
                 className="bg-rose-900 text-white max-w-sm p-2 m-1 hover:bg-slate-700"
               >
                 <h2>{meal.strMeal}</h2>
                 {selectedMeal?.idMeal === meal.idMeal && (
                   <div className="text-xs text-gray-400 ml-2">
                     Ingredients needed:
                     <ul>
                       <li className="ml-6">
                         {Array.from({ length: 20 }).map((_, index) => {
                           const ingredientName =
                             selectedMeal[`strIngredient${index + 1}`];
                           const ingredientMeasure =
                             selectedMeal[`strMeasure${index + 1}`];
                           if (ingredientName && ingredientName.trim() !== "") {
                             return (
                               <li key={ingredientName}>
                                 {`${ingredientName} (${ingredientMeasure})`}
                               </li>
                             );
                           }
                           return null;
                         })}
                       </li>
                     </ul>
                   </div>
                 )}
               </li>
             ))}
           </ul>
         </div>
       ) : (
         <p>No meal ideas found for {ingredient}</p>
       )}
     </div>
   );
 }