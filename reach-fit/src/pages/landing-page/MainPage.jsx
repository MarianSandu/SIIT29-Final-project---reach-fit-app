// import { useState } from "react";
import { Link } from "react-router-dom";
import "./MainPage.css";

export function MainPage() {
  return (
    <div className="main-container">
      <img
        src="/images/karsten-winegeart-0Wra5YYVQJE-unsplash.jpg"
        alt="Main site theme"
        className="main-img"
      />
      <h1 className="motto">Reach your goals faster!</h1>

      <p className="app-name">REACH</p>

      <div className="btns-container">
        <Link to={"/take-a-tour"} className="tour-btn">
          <button className="btn btn-tour">Take a Tour</button>
        </Link>
        <Link to={"/login"} className="login-btn">
          <button className="btn btn-login">Login</button>
        </Link>
      </div>
    </div>
  );
}
