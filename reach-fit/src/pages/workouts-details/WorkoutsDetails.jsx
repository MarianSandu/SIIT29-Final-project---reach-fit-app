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

  function deleteWorkout() {
    fetch(`${workoutDetailsUrl}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${auth.accesToken}`,
      },
    }).then(() => navigate("/"));
  }

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
            <button className="btn exercise-add-toplan" onClick={deleteWorkout}>
              Add to myPlan
            </button>
            <button className="btn exercise-edit" onClick={editWorkout}>
              Edit
            </button>
          </div>
        </div>
      </article>

      <FooterComponent />
    </section>
  );
}
