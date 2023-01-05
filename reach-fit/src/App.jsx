import "./App.css";
import React, { useEffect, useState } from "react";
import { WorkoutListComponent } from "./pages/workouts-list/WorkoutListComponent";
import { NutritionListComponent } from "./pages/nutrition-list/NutritionListComponent";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { WorkoutsDetails } from "./pages/workouts-details/WorkoutsDetails";
import { WorkoutEditComponent } from "./pages/workout-edit/WorkoutEditComponent";
import { MyPlan } from "./pages/myPlan/plan";
import { MainPage } from "./pages/landing-page/MainPage";
import { Login } from "./pages/auth/Login";
import { AuthContextProvider } from "./pages/auth/Auth-context";
import { Profile } from "./pages/profile-page/Profile";
import { CanNavigate } from "./pages/auth/CanNavigate";
import { Register } from "./pages/auth/Register";
import { ProfileDetailsEdit } from "./pages/profile-page/ProfileDetailsEdit";
import { MyDiet } from "./pages/myDiet/Diet";
import { Progress } from "./pages/progress-page/Progress";
import { NutritionDetails } from "./pages/nutrition-details/NutritionDetails";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/progress" element={<Progress />}></Route>
          <Route path="/my-diet" element={<MyDiet />}></Route>
          <Route
            path="/profile/:id/edit"
            element={<ProfileDetailsEdit />}
          ></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route
            path="/profile"
            element={
              <CanNavigate>
                <Profile />
              </CanNavigate>
            }
          ></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<MainPage />}></Route>
          <Route
            path="/workouts-list"
            element={
              <CanNavigate>
                <WorkoutListComponent />
              </CanNavigate>
            }
          ></Route>
          <Route
            path="/nutrition-list"
            element={
              <CanNavigate>
                <NutritionListComponent />
              </CanNavigate>
            }
          ></Route>
          <Route
            path="/nutrition-details/:id"
            element={<NutritionDetails />}
          ></Route>
          <Route
            path="/workouts-details/:id"
            element={
              <CanNavigate>
                <WorkoutsDetails />
              </CanNavigate>
            }
          ></Route>
          <Route
            path="/workouts-details/:id/edit"
            element={<WorkoutEditComponent />}
          ></Route>
          <Route
            path="/create"
            element={<WorkoutEditComponent formType="create" />}
          ></Route>
          <Route
            path="/my-plan"
            element={
              <CanNavigate>
                <MyPlan />
              </CanNavigate>
            }
          ></Route>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
