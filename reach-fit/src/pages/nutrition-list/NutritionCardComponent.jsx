import React from "react";
import "./NutritionCardComponent.css";
import { Link } from "react-router-dom";
import { useState } from "react";

// Cart (myPlan page) is a list
// Each item in the cart should be an object {}

export function NutritionCardComponent(props) {
  const dietUrl = "http://localhost:3001/diet";
  const { strMeal, strCategory, strInstructions, strMealThumb, id } = props;
  const [addedError, setAddedError] = useState("");

  function addToDiet(event) {
    event.preventDefault();

    fetch(dietUrl)
      .then((response) => response.json())
      .then((dietList) => {
        const [diet] = dietList;

        if (diet) {
          const meailInDiet = diet.meals.find((meal) => meal.mealId === id);

          if (meailInDiet) {
            // meailInDiet.quantity = meailInDiet.quantity + 1;
            setAddedError("This meal was already added to the Diet");
          } else {
            diet.meals.push({ mealId: id, quantity: 1 });
          }

          updateDiet(diet.id, diet.meals);
        } else {
          createDiet();
        }
        console.log(dietList);
      });

    // fetch(dietUrl)
    //   .then((response) => response.json())
    //   .then((dietList) => {
    //     const [diet] = dietList;

    //     if (diet) {
    //       const mealInDiet = diet.nutrition.find(
    //         (nutrition) => nutrition.id === idMeal
    //       );

    //       if (mealInDiet) {
    //         mealInDiet.quantity = mealInDiet.quantity + 1;
    //       } else {
    //         diet.nutrition.push({ id: idMeal, quantity: 1 });
    //       }

    //       updateDiet(diet.id, diet.nutrition);
    //     } else {
    //       createDiet();
    //     }
    //   });
  }

  function updateDiet(dietId, meals) {
    fetch(`${dietUrl}/${dietId}`, {
      method: "PATCH",
      body: JSON.stringify({ meals }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  function createDiet() {
    fetch(`${dietUrl}`, {
      method: "POST",
      body: JSON.stringify({
        meals: [{ mealId: id, quantity: 1 }],
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return (
    <Link to={`/nutrition-details/${id}`} className="workout-card--container">
      <li className="card-container">
        <article className="nutrition-card">
          <img src={strMealThumb} alt="Meal thumb" className="nutr-img" />

          <div className="card-details">
            <h2 className="nutrition-card--title">{strMeal}</h2>

            <p className="nutr-category">
              Category: <span>{strCategory}</span>
            </p>
            <p className="nutr-description">
              Descritpion:{" "}
              <span className="description-shortening">{strInstructions}</span>
            </p>
            <p className="added-to-diet">{addedError}</p>
          </div>

          <div className="btn-nutr-container">
            <button className="btn btn-more-info">More Info</button>

            <button onClick={addToDiet} className="btn btn-add-diet">
              Add to myDiet
            </button>
          </div>
        </article>
      </li>
    </Link>
  );
}
