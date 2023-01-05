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
  const [searchTerm, setSearchTerm] = useState("");
  const [initialNutrition, setInitialNutrition] = useState([]);

  const [filters, setFilters] = useState({
    vegetarian: false,
    vegan: false,
    pescatarian: false,
    keto: false,
  });

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

  useEffect(() => {
    let timeout = setTimeout(() => {
      const filteredNutrition = initialNutrition
        .filter((meal) => meal.strMeal.toLowerCase().includes(searchTerm))
        .filter((meal) => {
          if (filters.vegetarian) {
            return meal.diet === "Vegetarian";
          } else if (filters.vegan) {
            return meal.diet === "Vegan";
          } else if (filters.pescatarian) {
            return meal.diet === "Pescatarian";
          } else if (filters.keto) {
            return meal.diet === "Keto";
          } else {
            return true;
          }
        });

      setNutrition(filteredNutrition);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchTerm, initialNutrition, filters]);

  function searchInputHandler(event) {
    setSearchTerm(event.target.value.toLowerCase());
  }

  function filterChangedVegetarian(event) {
    setFilters({
      ...filters,
      vegetarian: event.target.checked,
      vegan: false,
      pescatarian: false,
      keto: false,
    });
  }

  function filterChangedVegan(event) {
    setFilters({
      ...filters,
      vegan: event.target.checked,
      vegetarian: false,
      pescatarian: false,
      keto: false,
    });
  }

  function filterChangedPescatarian(event) {
    setFilters({
      ...filters,
      pescatarian: event.target.checked,
      vegetarian: false,
      vegan: false,
      keto: false,
    });
  }

  function filterChangedKeto(event) {
    setFilters({
      ...filters,
      keto: event.target.checked,
      vegetarian: false,
      vegan: false,
      pescatarian: false,
    });
  }

  return (
    <section>
      <HeaderComponent />

      <header className="list-titles-container">
        <Link to="/workouts-list" className="workouts-list">
          <h1>Exercises</h1>
        </Link>
        <h1>Nutrition</h1>
      </header>

      <div className="search-container">
        <input
          type="text"
          id="search"
          onChange={searchInputHandler}
          placeholder="Search by recipe"
        />
      </div>

      <div className="main-list-container">
        <aside className="filters-container">
          <h3>Filter by:</h3>
          <h4 className="muscles-title">Diet (if any)</h4>
          <div>
            <label htmlFor="vegetarian">Vegetarian</label>
            <input
              type="radio"
              name="diet"
              value="vegetarian"
              id="vegetarian"
              onChange={filterChangedVegetarian}
            />
          </div>

          <div>
            <label htmlFor="vegan">Vegan</label>
            <input
              type="radio"
              name="diet"
              value="vegan"
              id="vegan"
              onChange={filterChangedVegan}
            />
          </div>

          <div>
            <label htmlFor="pescatarian">Pescatarian</label>
            <input
              type="radio"
              name="diet"
              value="pescatarian"
              id="pescatarian"
              onChange={filterChangedPescatarian}
            />
          </div>

          <div>
            <label htmlFor="keto">Keto</label>
            <input
              type="radio"
              name="diet"
              value="keto"
              id="keto"
              onChange={filterChangedKeto}
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
                id={meal.id}
                key={meal.id}
              ></NutritionCardComponent>
            );
          })}
        </ul>
      </div>

      <FooterComponent />
    </section>
  );
}
