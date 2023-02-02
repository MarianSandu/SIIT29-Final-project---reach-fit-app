import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/Auth-context";
import { FooterComponent } from "../reusables/FooterComponent";
import { HeaderComponent } from "../reusables/HeaderComponent";
import "./WorkoutsDetails.css";

export function WorkoutsDetails() {
  const workoutDetailsUrl = "http://localhost:3001/workouts";
  let { id } = useParams();
  const [workoutDetails, setWorkoutDetails] = useState({});

  const planUrl = "http://localhost:3001/plan";
  const [addedError, setAddedError] = useState("");

  const navigate = useNavigate();

  const { auth } = useContext(AuthContext);

  useEffect(() => {
    fetch(`${workoutDetailsUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((workout) => setWorkoutDetails(workout));
  }, []);

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
            (workout) => workout.id === Number(id)
          );

          if (workoutInPlan) {
            setAddedError(
              "This exercise was already added to the Workout Plan"
            );
          } else {
            plan.workouts.push({ id: Number(id), quantity: 1 });
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
    // navigate("/workouts-list");
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
    // navigate("/workouts-list");
  }

  // function deleteWorkout() {
  //   fetch(`${workoutDetailsUrl}/${id}`, {
  //     method: "DELETE",
  //     headers: {
  //       Authorization: `Bearer ${auth.accesToken}`,
  //     },
  //   }).then(() => navigate("/"));
  // }

  function editWorkout() {
    navigate("./edit");
  }

  return (
    <section>
      <HeaderComponent />

      <h1 className="exercise-details">Exercise Details</h1>

      <article className="exercise-details-container">
        <img
          src={workoutDetails.poster}
          alt="Workout poster"
          className="exercise-details-img"
        />
        <div className="exercise-details-text">
          <h2 className="exercise-details-title">{workoutDetails.name}</h2>
          <span>Muscle group: {workoutDetails.muscles}</span>
          <span>Equipment: {workoutDetails.equipment}</span>

          <div className="exercise-btns-container">
            <button className="btn exercise-add-toplan" onClick={addToPlan}>
              Add to myPlan
            </button>
            {/* <button className="btn exercise-edit" onClick={editWorkout}>
              Edit
            </button> */}
          </div>
          <p className="added-to-plan">{addedError}</p>
        </div>
      </article>

      <FooterComponent />
    </section>
  );
}
