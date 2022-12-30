import { useState, useEffect } from "react";

export function ShowWorkouts({ text, className, onClick }) {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const planUrl = "http://localhost:3001/plan";
    const workoutsUrl = "http://localhost:3001/workouts";

    fetch(planUrl)
      .then((response) => response.json())
      .then((planList) => {
        const [plan] = planList;

        fetch(workoutsUrl)
          .then((response) => response.json())
          .then((workouts) => {
            const planWorkouts = [];

            for (const workout of workouts) {
              const planWorkout = plan.workouts.find(
                (planWorkouts) => planWorkouts.id === workout.id
              );

              if (planWorkout) {
                planWorkouts.push({
                  ...workout,
                  quantity: planWorkout.quantity,
                });
              }
            }

            setWorkouts(planWorkouts);
          });
      });
  }, []);

  const [visibility, setVisibility] = useState("none");

  function visbilityHandler(className) {
    setVisibility(!visibility);
  }

  return (
    <>
      <button onClick={visbilityHandler} className="btn-toggle">
        <p>Monday</p>
        <p>Muscles Group: Shoulders</p>
      </button>
      <ul className={`${visibility ? "plan-hidden" : "plan-visible"} plan`}>
        {workouts.map((workout) => (
          <li>
            <p>Name: {workout.name}</p>
            <p>Muscle Group: {workout.muscles}</p>
            <p>Equipment needed: {workout.equipment}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
