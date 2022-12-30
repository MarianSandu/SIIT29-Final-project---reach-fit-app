import React, { useState } from "react";
import { useEffect } from "react";
import { HeaderComponent } from "../reusables/HeaderComponent";
import { WorkoutCardComponent } from "./WorkoutCardComponent";
import "./WorkoutListComponent.css";
import { Link } from "react-router-dom";

export function WorkoutListComponent() {
  const workoutsUrl = "http://localhost:3001/workouts";
  const [workouts, setWorkouts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [initialWorkouts, setInitialWorkouts] = useState([]);
  const [filters, setFilters] = useState({
    legs: false,
    shoulders: false,
  });

  let timeout;

  useEffect(() => {
    fetch(workoutsUrl)
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
          if (filters.legs && filters.shoulders) {
            return (
              workout.muscles === "Legs" || workout.muscles === "Shoulders"
            );
          } else if (filters.legs) {
            return workout.muscles === "Legs";
          } else if (filters.shoulders) {
            return workout.muscles === "Shoulders";
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

  function filterChangedShoulders(event) {
    setFilters({
      ...filters,
      shoulders: event.target.checked,
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

      <label htmlFor="search">Search</label>
      <input type="text" id="search" onChange={searchInputHandler} />

      <div className="main-list-container">
        <aside className="filters-container">
          <h3>Select by Filters:</h3>
          <div>
            <label htmlFor="legs">Legs</label>
            <input type="checkbox" id="legs" onChange={filterChangedLegs} />
          </div>

          <div>
            <label htmlFor="shoulders">Shoulders</label>
            <input
              type="checkbox"
              id="shoulders"
              onChange={filterChangedShoulders}
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
    </section>
  );
}
