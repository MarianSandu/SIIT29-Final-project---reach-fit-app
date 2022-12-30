import { useState, useEffect } from "react";
import { HeaderComponent } from "../reusables/HeaderComponent";
import { NutritionCardComponent } from "./NutritionCardComponent";
import "./NutritionListComponent.css";
import { Link } from "react-router-dom";

export function NutritionListComponent() {
  const nutritionUrl = "http://localhost:3001/nutrition";
  // let workouts = [];
  const [nutrition, setNutrition] = useState([]);

  useEffect(() => {
    fetch(nutritionUrl)
      .then((response) => response.json())
      .then((nutritionFromServer) => setNutrition(nutritionFromServer));
  }, []);

  return (
    <section>
      <HeaderComponent />

      <header className="list-titles-container">
        <Link to="/workouts-list" className="workouts-list">
          <h1>Exercises</h1>
        </Link>
        <h1>Nutrition</h1>
      </header>

      <ul className="nutrition-list">
        {nutrition.map((food) => {
          return (
            <NutritionCardComponent
              name={food.name}
              muscles={food.muscles}
              equipment={food.equipment}
              poster={food.poster}
              id={food.id}
              key={food.id}
            ></NutritionCardComponent>
          );
        })}
      </ul>
    </section>
  );
}
