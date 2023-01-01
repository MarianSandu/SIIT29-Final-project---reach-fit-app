import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { HeaderComponent } from "../reusables/HeaderComponent";
import { WorkoutCardComponent } from "./WorkoutCardComponent";
import "./WorkoutListComponent.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth/Auth-context";
import { FooterComponent } from "../reusables/FooterComponent";

export function WorkoutListComponent() {
  const workoutsUrl = "http://localhost:3001/workouts";
  const [workouts, setWorkouts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [initialWorkouts, setInitialWorkouts] = useState([]);
  const [filters, setFilters] = useState({
    legs: false,
    back: false,
    abs: false,
    chest: false,
    arms: false,
  });

  const { auth, logOut } = useContext(AuthContext);

  let timeout;

  useEffect(() => {
    fetch(workoutsUrl, {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((workoutsFromServer) => {
        setWorkouts(workoutsFromServer);
        setInitialWorkouts(workoutsFromServer);
      });
  }, []);

  useEffect(() => {
    let timeout = setTimeout(() => {
      const filteredWorkouts = initialWorkouts
        .filter((workout) => workout.muscles.toLowerCase().includes(searchTerm))
        .filter((workout) => {
          // if (
          //   filters.legs &&
          //   filters.back &&
          //   filters.abs &&
          //   filters.chest &&
          //   filters.arms
          // ) {
          //   return (
          //     workout.muscles === "Legs" ||
          //     workout.muscles === "Back" ||
          //     workout.muscles === "Abs" ||
          //     workout.muscles === "Chest" ||
          //     workout.muscles === "Arms"
          //   );
          // } else
          if (filters.legs) {
            return workout.muscles === "Legs";
          } else if (filters.back) {
            return workout.muscles === "Back";
          } else if (filters.abs) {
            return workout.muscles === "Abs";
          } else if (filters.chest) {
            return workout.muscles === "Chest";
          } else if (filters.arms) {
            return workout.muscles === "Arms";
          } else {
            return true;
          }
        });

      setWorkouts(filteredWorkouts);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchTerm, initialWorkouts, filters]);

  function searchInputHandler(event) {
    setSearchTerm(event.target.value.toLowerCase());
  }

  function filterChangedLegs(event) {
    setFilters({
      ...filters,
      legs: event.target.checked,
    });
  }

  function filterChangedBack(event) {
    setFilters({
      ...filters,
      back: event.target.checked,
    });
  }

  function filterChangedAbs(event) {
    setFilters({
      ...filters,
      abs: event.target.checked,
    });
  }

  function filterChangedChest(event) {
    setFilters({
      ...filters,
      chest: event.target.checked,
    });
  }

  function filterChangedArms(event) {
    setFilters({
      ...filters,
      arms: event.target.checked,
    });
  }

  return (
    <section>
      <HeaderComponent />

      <header className="list-titles-container">
        <h2 className="workout-list--title">Exercises</h2>
        <Link to="/nutrition-list" className="nutrition-list--title">
          <h2>Nutrition</h2>
        </Link>
      </header>

      <div className="search-container">
        <input
          type="text"
          id="search"
          onChange={searchInputHandler}
          placeholder="Search by muscle group"
        />
      </div>

      <div className="main-list-container">
        <aside className="filters-container">
          <h3>Filter by:</h3>
          <h4 className="muscles-title">Muscle group</h4>
          <div>
            <label htmlFor="legs">Legs</label>
            <input
              type="radio"
              name="muscle"
              id="legs"
              onChange={filterChangedLegs}
            />
          </div>

          <div>
            <label htmlFor="back">Back</label>
            <input
              type="radio"
              name="muscle"
              id="back"
              onChange={filterChangedBack}
            />
          </div>

          <div>
            <label htmlFor="abs">Abs</label>
            <input
              type="radio"
              name="muscle"
              id="abs"
              onChange={filterChangedAbs}
            />
          </div>

          <div>
            <label htmlFor="chest">Chest</label>
            <input
              type="radio"
              name="muscle"
              id="chest"
              onChange={filterChangedChest}
            />
          </div>

          <div>
            <label htmlFor="arms">Arms</label>
            <input
              type="radio"
              name="muscle"
              id="arms"
              onChange={filterChangedArms}
            />
          </div>

          <h4 className="equipment-title">Equipment</h4>
          <div>
            <label htmlFor="none">None</label>
            <input
              type="radio"
              name="equipment"
              id="none"
              // onChange={filterChangedArms}
            />
          </div>

          <div>
            <label htmlFor="dumbells">Dumbells</label>
            <input
              type="radio"
              name="equipment"
              id="dumbells"
              // onChange={filterChangedArms}
            />
          </div>

          <div>
            <label htmlFor="kettlebell">Kettlebell</label>
            <input
              type="radio"
              name="equipment"
              id="kettlebell"
              // onChange={filterChangedArms}
            />
          </div>

          <div>
            <label htmlFor="machine">Machine</label>
            <input
              type="radio"
              name="equipment"
              id="machine"
              // onChange={filterChangedArms}
            />
          </div>
        </aside>

        <ul className="workout-list">
          {workouts.map((workout) => {
            return (
              <WorkoutCardComponent
                name={workout.name}
                muscles={workout.muscles}
                equipment={workout.equipment}
                poster={workout.poster}
                id={workout.id}
                key={workout.id}
              ></WorkoutCardComponent>
            );
          })}
        </ul>
      </div>

      <FooterComponent />
    </section>
  );
}
