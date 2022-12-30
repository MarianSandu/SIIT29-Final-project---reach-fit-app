import React from "react";
import "./WorkoutCardComponent.css";
import { Link } from "react-router-dom";

// Cart (myPlan page) is a list
// Each item in the cart should be an object {}

export function WorkoutCardComponent(props) {
  const planUrl = "http://localhost:3001/plan";
  const { name, muscles, equipment, poster, id } = props;

  function addToPlan(event) {
    event.preventDefault();

    fetch(planUrl)
      .then((response) => response.json())
      .then((planList) => {
        const [plan] = planList;

        if (plan) {
          const workoutInPlan = plan.workouts.find(
            (workout) => workout.id === id
          );

          if (workoutInPlan) {
            workoutInPlan.quantity = workoutInPlan.quantity + 1;
          } else {
            plan.workouts.push({ id: id, quantity: 1 });
          }

          updatePlan(plan.id, plan.workouts);
        } else {
          createPlan();
        }
      });

    // fetch(`${planUrl}?id=${id}`)
    //   .then((response) => response.json())
    //   .then((workoutCarts) => {
    //     const [workoutCart] = workoutCarts;

    //     if (workoutCart) {
    //       updatePlanWorkoutQuantity(workoutCart);
    //     } else {
    //       createPlanWorkout();
    //     }
    //   });
  }

  function updatePlan(planId, workouts) {
    fetch(`${planUrl}/${planId}`, {
      method: "PATCH",
      body: JSON.stringify({ workouts }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  function createPlan() {
    fetch(`${planUrl}`, {
      method: "POST",
      body: JSON.stringify({
        workouts: [{ id: id, quantity: 1 }],
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return (
    <Link to={`/workouts-details/${id}`} className="workout-card--container">
      <li className="card-container">
        <article className="workout-card">
          <h3 className="workout-card--title">{name}</h3>

          <div className="card-short-description">
            <span>Muscle group: {muscles}</span>
            <span>Equipment needed: {equipment}</span>
          </div>

          <img src={poster} alt="Workout poster" />
        </article>

        <button onClick={addToPlan}>Add to myPlan</button>
      </li>
    </Link>
  );
}
