import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FooterComponent } from "../reusables/FooterComponent";
import { HeaderComponent } from "../reusables/HeaderComponent";
import "./NutritionDetails.css";

export function NutritionDetails() {
  const nutritionDetailsUrl = "http://localhost:3001/nutrition";
  const dietUrl = "http://localhost:3001/diet";

  let { id } = useParams();
  const [nutritionDetails, setNutritionDetails] = useState({});

  const [addedError, setAddedError] = useState("");

  useEffect(() => {
    fetch(`${nutritionDetailsUrl}/${id}`)
      .then((response) => response.json())
      .then((nutrition) => setNutritionDetails(nutrition));
  }, []);

  function addToDiet(event) {
    event.preventDefault();

    fetch(dietUrl)
      .then((response) => response.json())
      .then((dietList) => {
        const [diet] = dietList;

        if (diet) {
          const meailInDiet = diet.meals.find((meal) => meal.mealId === id);

          if (meailInDiet) {
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
    <section>
      <HeaderComponent />

      <h1 className="nutrition-details-title">Meal Details</h1>

      <article className="nutrition-details-container">
        <img src={nutritionDetails.strMealThumb} alt="Meal poster" />
        <div className="description-container">
          <h3 className="description-title">{nutritionDetails.strMeal}</h3>
          <p>Diet: {nutritionDetails.diet}</p>
          <p>Category: {nutritionDetails.strCategory}</p>
          <p className="description-instructions">
            Instructions: {nutritionDetails.strInstructions}
          </p>
          <button onClick={addToDiet} className="btn add-to-diet-btn">
            Add to myDiet
          </button>
          <p className="added-message">{addedError}</p>
        </div>
      </article>

      <FooterComponent />
    </section>
  );
}
