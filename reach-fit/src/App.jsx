import "./App.css";
import React from "react";
import { WorkoutListComponent } from "./pages/workouts-list/WorkoutListComponent";
import { NutritionListComponent } from "./pages/nutrition-list/NutritionListComponent";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { WorkoutsDetails } from "./pages/workouts-details/WorkoutsDetails";
import { WorkoutEditComponent } from "./pages/workout-edit/WorkoutEditComponent";
import { MyPlan } from "./pages/myPlan/plan";
import { MainPage } from "./pages/landing-page/MainPage";
import { Login } from "./pages/auth/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/workouts-list" element={<WorkoutListComponent />}></Route>
        <Route
          path="/nutrition-list"
          element={<NutritionListComponent />}
        ></Route>
        <Route
          path="/workouts-details/:id"
          element={<WorkoutsDetails />}
        ></Route>
        <Route
          path="/workouts-details/:id/edit"
          element={<WorkoutEditComponent />}
        ></Route>
        <Route
          path="/create"
          element={<WorkoutEditComponent formType="create" />}
        ></Route>
        <Route path="/my-plan" element={<MyPlan />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
