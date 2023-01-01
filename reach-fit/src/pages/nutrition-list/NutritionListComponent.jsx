import { useState, useEffect } from "react";
import { HeaderComponent } from "../reusables/HeaderComponent";
import { NutritionCardComponent } from "./NutritionCardComponent";
import "./NutritionListComponent.css";
import { Link } from "react-router-dom";
import { FooterComponent } from "../reusables/FooterComponent";

export function NutritionListComponent() {
  const nutritionUrl = "http://localhost:3001/nutrition";
  // let workouts = [];
  const [nutrition, setNutrition] = useState([]);
  const [initialNutrition, setInitialNutrition] = useState([]);

  useEffect(() => {
    fetch(nutritionUrl, {
      headers: {
        // Authorization: `Bearer ${auth.avvessToken}`,
      },
    })
      .then((response) => response.json())
      .then((nutritionFromServer) => {
        setNutrition(nutritionFromServer);
        setInitialNutrition(nutritionFromServer);
      });
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

      <div className="main-list-container">
        <aside className="filters-container">
          <h3>Filter by:</h3>
          <h4 className="muscles-title">Diet (if any)</h4>
          <div>
            <label htmlFor="vegetarian">Vegetarian</label>
            <input
              type="radio"
              name="diet"
              id="vegetarian"
              // onChange={filterChangedLegs}
            />
          </div>

          <div>
            <label htmlFor="vegan">Vegan</label>
            <input
              type="radio"
              name="diet"
              id="vegan"
              // onChange={filterChangedBack}
            />
          </div>

          <div>
            <label htmlFor="gluten-free">Gluten-free</label>
            <input
              type="radio"
              name="diet"
              id="gluten-free"
              // onChange={filterChangedAbs}
            />
          </div>

          <div>
            <label htmlFor="pescatarian">Pescatarian</label>
            <input
              type="radio"
              name="diet"
              id="pescatarian"
              // onChange={filterChangedChest}
            />
          </div>

          <div>
            <label htmlFor="keto">Keto</label>
            <input
              type="radio"
              name="diet"
              id="keto"
              // onChange={filterChangedArms}
            />
          </div>
        </aside>

        <ul className="nutrition-list">
          {nutrition.map((meal) => {
            return (
              <NutritionCardComponent
                strMeal={meal.strMeal}
                strCategory={meal.strCategory}
                strInstructions={meal.strInstructions}
                strMealThumb={meal.strMealThumb}
                id={meal.idMeal}
                key={meal.idMeal}
              ></NutritionCardComponent>
            );
          })}
        </ul>
      </div>

      <FooterComponent />
    </section>
  );
}
