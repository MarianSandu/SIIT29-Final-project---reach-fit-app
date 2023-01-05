import React from "react";
import "./WorkoutCardComponent.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth/Auth-context";
import { useContext } from "react";

// Cart (myPlan page) is a list
// Each item in the cart should be an object {}

export function WorkoutCardComponent(props) {
  const planUrl = "http://localhost:3001/plan";
  const { name, muscles, equipment, poster, id } = props;

  const { auth, logOut } = useContext(AuthContext);

  function addToPlan(event) {
    event.preventDefault();

    fetch(planUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.accessToken}`,
      },
    })
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
  }

  function updatePlan(planId, workouts) {
    fetch(`${planUrl}/${planId}`, {
      method: "PATCH",
      body: JSON.stringify({ workouts }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.accessToken}`,
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
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
  }

  return (
    <Link to={`/workouts-details/${id}`} className="workout-card--container">
      <li className="workout-card-container">
        <article className="workout-card">
          <h3 className="workout-card--title">{name}</h3>

          <div className="card-short-description">
            <span>Muscle group: {muscles}</span>
            <span>Equipment: {equipment}</span>
          </div>

          <img
            src={poster}
            alt="Workout poster"
            className="workout-details-img"
          />
        </article>

        <button className="btn workout-details-btn" onClick={addToPlan}>
          Add to myPlan
        </button>
      </li>
    </Link>
  );
}
