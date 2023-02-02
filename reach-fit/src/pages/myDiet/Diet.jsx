import { HeaderComponent } from "../reusables/HeaderComponent";
import { FooterComponent } from "../reusables/FooterComponent";
import "./Diet.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function MyDiet() {
  const dietUrl = "http://localhost:3001/diet";
  const nutritionUrl = "http://localhost:3001/nutrition";

  let { mealId } = useParams();
  const navigate = useNavigate();

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

  function deleteFromDiet() {
    fetch(`${dietUrl}/1/${mealId}`, {
      method: "DELETE",
    }).then(() => navigate("/my-diet"));
  }

  const [expanded, setExpanded] = useState("none");

  function expandedView(className) {
    setExpanded(!expanded);
  }

  return (
    <section>
      <HeaderComponent />

      <h1 className="diet-title">My Diet</h1>

      <ul className="my-diet-list">
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
                <span
                  className={`${
                    expanded ? "description-shortening" : "long-description"
                  }`}
                >
                  {meal.strInstructions}
                </span>
              </p>
            </div>
            <div
              className={`${
                expanded ? "diet-buttons-expanded" : "diet-buttons"
              }`}
            >
              <button onClick={expandedView} className="btn diet-more-info">
                More Info
              </button>
              <button onClick={deleteFromDiet} className="btn diet-delete">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <FooterComponent />
    </section>
  );
}
