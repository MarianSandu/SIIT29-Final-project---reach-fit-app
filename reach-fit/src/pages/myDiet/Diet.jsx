import { HeaderComponent } from "../reusables/HeaderComponent";
import { FooterComponent } from "../reusables/FooterComponent";
import "./Diet.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export function MyDiet() {
  const dietUrl = "http://localhost:3001/diet";
  const nutritionUrl = "http://localhost:3001/nutrition";

  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetch(dietUrl)
      .then((response) => response.json())
      .then((dietList) => {
        const [diet] = dietList;

        fetch(nutritionUrl)
          .then((response) => response.json())
          .then((nutrition) => {
            const dietMeals = nutrition.filter((food) => {
              const hasMeal = diet.meals.find(
                (dietMeal) => dietMeal.mealId === food.id
              );
              return hasMeal;
            });
            setMeals(dietMeals);
          });
      });
  }, []);

  return (
    <section>
      <HeaderComponent />

      <h1 className="diet-title">My Diet</h1>

      <ul>
        {meals.map((meal) => (
          <li key={meal.mealId} className="diet-list-container">
            <img
              src={meal.strMealThumb}
              alt="Movie poster"
              height="100"
              width="100"
            />
            <div>
              <h3>{meal.strMeal}</h3>
              <p className="diet-list-category">Category: {meal.strCategory}</p>
              <p className="diet-list-description">
                Description:{" "}
                <span className="description-shortening">
                  {meal.strInstructions}
                </span>
              </p>
            </div>
          </li>
        ))}
      </ul>

      <FooterComponent />
    </section>
  );
}
