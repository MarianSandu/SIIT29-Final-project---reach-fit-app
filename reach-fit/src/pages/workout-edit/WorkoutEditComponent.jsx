import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// type can be create/edit
export function WorkoutEditComponent({ formType = "edit" }) {
  const workoutDetailsUrl = "http://localhost:3001/workouts";
  let { id } = useParams();
  const navigate = useNavigate();

  // In React the following are controlled inputs
  const [name, setName] = useState("");
  const [muscles, setMuscles] = useState("");
  const [equipment, setEquipment] = useState("");

  useEffect(() => {
    if (formType === "edit") {
      fetch(`${workoutDetailsUrl}/${id}`)
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
    <form>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" value={name} onChange={nameChange} />
      </div>

      <div>
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
          <option value="Shoulders">Shoulders</option>
          <option value="Legs">Legs</option>
          <option value="Biceps">Biceps</option>
        </select>
      </div>

      <div>
        <label htmlFor="equipment">Equipment</label>
        <select
          id="equipment"
          type="text"
          value={equipment}
          onChange={equipmentChange}
        >
          <option value="Dumbell">Dumbell</option>
          <option value="None">None</option>
        </select>
      </div>

      <button onClick={submit}>
        {formType === "edit" ? "Save changes" : "Create"}
      </button>
    </form>
  );
}