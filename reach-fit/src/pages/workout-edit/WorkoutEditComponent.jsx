import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/Auth-context";
import { FooterComponent } from "../reusables/FooterComponent";
import { HeaderComponent } from "../reusables/HeaderComponent";
import "../workouts-details/WorkoutsDetails.css";
import "./WorkoutEditComponent.css";

// type can be create/edit
export function WorkoutEditComponent({ formType = "edit" }) {
  const workoutDetailsUrl = "http://localhost:3001/workouts";
  let { id } = useParams();
  const navigate = useNavigate();

  const { auth } = useContext(AuthContext);

  // In React the following are controlled inputs
  const [name, setName] = useState("");
  const [muscles, setMuscles] = useState("");
  const [equipment, setEquipment] = useState("");

  useEffect(() => {
    if (formType === "edit") {
      fetch(`${workoutDetailsUrl}/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((workout) => {
          setName(workout.name);
          setMuscles(workout.muscles);
          setEquipment(workout.equipment);
        });
    }
  }, []);

  function nameChange(event) {
    setName(event.target.value);
  }

  function muscleChange(event) {
    setMuscles(event.target.value);
  }

  function equipmentChange(event) {
    setEquipment(event.target.value);
  }

  function submit(event) {
    event.preventDefault();

    const body = {
      name: name,
      muscles: muscles,
      equipment: equipment,
    };

    const url =
      formType === "edit" ? `${workoutDetailsUrl}/${id}` : workoutDetailsUrl;

    fetch(url, {
      method: formType === "edit" ? "PATCH" : "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${auth.accessToken}`,
      },
      body: JSON.stringify(body),
    }).then(() => {
      if (formType === "edit") {
        navigate("/workouts-details/" + id);
      } else {
        navigate("/");
      }
    });
  }

  return (
    <section>
      <HeaderComponent />

      <h1 className="exercise-details">Edit Exercise</h1>

      <div className="edit-container">
        <form className="edit-form">
          <label htmlFor="name">Name</label>
          <input id="name" type="text" value={name} onChange={nameChange} />

          <label htmlFor="muscles">Muscle Group</label>
          <select
            id="muscles"
            type="text"
            value={muscles}
            onChange={muscleChange}
          >
            <option value="null" disabled>
              Please select a value
            </option>
            <option value="Back">Back</option>
            <option value="Legs">Legs</option>
            <option value="Arms">Arms</option>
            <option value="Chest">Chest</option>
            <option value="Abs">Abs</option>
          </select>

          <label htmlFor="equipment">Equipment</label>
          <select
            id="equipment"
            type="text"
            value={equipment}
            onChange={equipmentChange}
          >
            <option value="null" disabled>
              Please select a value
            </option>
            <option value="Dumbell">Dumbell</option>
            <option value="None">None</option>
            <option value="Kettlebell">KettleBell</option>
            <option value="Machine">Machine</option>
          </select>
        </form>
        <button className="btn edit-exercise-btn" onClick={submit}>
          {formType === "edit" ? "Save changes" : "Create"}
        </button>
      </div>

      <FooterComponent />
    </section>
  );
}
