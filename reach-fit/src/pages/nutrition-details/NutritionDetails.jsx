import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FooterComponent } from "../reusables/FooterComponent";
import { HeaderComponent } from "../reusables/HeaderComponent";
import "./NutritionDetails.css";

export function NutritionDetails() {
  const nutritionDetailsUrl = "http://localhost:3001/nutrition";
  let { id } = useParams();
  const [nutritionDetails, setNutritionDetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${nutritionDetailsUrl}/${id}`)
      .then((response) => response.json())
      .then((nutrition) => setNutritionDetails(nutrition));
  }, []);

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
          <button className="btn nutrition-details-btn">Add to myDiet</button>
        </div>
      </article>

      <FooterComponent />
    </section>
  );
}
