import { HeaderComponent } from "../reusables/HeaderComponent";
import { FooterComponent } from "../reusables/FooterComponent";
import "./Diet.css";
import { useEffect, useState } from "react";

export function MyDiet() {
  const [meals, setMeals] = useState([]);
  useEffect(() => {
    const dietUrl = "http://localhost:3001/diet";
    const nutritionUrl = "http://localhost:3001/nutrition";
    fetch(dietUrl)
      .then((response) => response.json())
      .then((dietList) => {
        const [diet] = dietList;
        fetch(nutritionUrl)
          .then((response) => response.json())
          .then((nutrition) => {
            const dietMeals = [];
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
          <li key={meal.id}>
            <p>Title: {meal.id}</p>
            {/* <p>Price: {meal.Price}</p>
            <p>Quantity: {meal.Quantity}</p> */}
            <img
              src={meal.strMealThumb}
              alt="Movie poster"
              height="150"
              width="100"
            />
          </li>
        ))}
      </ul>
      <FooterComponent />
    </section>
  );
}
