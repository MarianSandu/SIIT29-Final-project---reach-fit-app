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
      <h2>{workoutDetails.name}</h2>
      <span>{workoutDetails.muscles}</span>
      <span>{workoutDetails.equipment}</span>
      <img src={workoutDetails.poster} alt="Workout poster" />

      <button onClick={deleteWorkout}>Delete</button>
      <button onClick={editWorkout}>Edit</button>

      <FooterComponent />
    </section>
  );
}
