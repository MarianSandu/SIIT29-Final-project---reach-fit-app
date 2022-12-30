import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HeaderComponent } from "../reusables/HeaderComponent";
import "./WorkoutsDetails.css";

export function WorkoutsDetails() {
  const workoutDetailsUrl = "http://localhost:3001/workouts";
  let { id } = useParams();
  const [workoutDetails, setWorkoutDetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${workoutDetailsUrl}/${id}`)
      .then((response) => response.json())
      .then((workout) => setWorkoutDetails(workout));
  }, []);

  function deleteWorkout() {
    fetch(`${workoutDetailsUrl}/${id}`, {
      method: "DELETE",
    }).then(() => navigate("/"));
  }

  function editWorkout() {
    navigate("./edit");
  }

  return (
    <section>
      <HeaderComponent />

      <h1 className="exercise-details">Exercise Details</h1>
      <h2>{workoutDetails.name}</h2>
      <span>{workoutDetails.muscles}</span>
      <span>{workoutDetails.equipment}</span>
      <img src={workoutDetails.poster} alt="Workout poster" />

      <button onClick={deleteWorkout}>Delete</button>
      <button onClick={editWorkout}>Edit</button>
    </section>
  );
}
