import "./HeaderComponent.css";
import { Link } from "react-router-dom";

export function HeaderComponent() {
  return (
    <header>
      <ul className="navbar">
        <li className="logo">REACH</li>

        <Link to="/my-plan" className="link">
          <li>myPlan</li>
        </Link>

        <Link to="/my-diet" className="link">
          <li>myDiet</li>
        </Link>

        <Link to="/progress" className="link">
          <li>Progress</li>
        </Link>

        <Link to="/workouts-list" className="link">
          <li className="workouts-diet">Workouts/Diet</li>
        </Link>

        <Link to="/profile" className="link">
          <li>Profile</li>
        </Link>
        <li className="socials">
          <i className="fa-brands fa-instagram"></i>
          <i className="fa-brands fa-facebook"></i>
          <i className="fa-brands fa-tiktok"></i>
          <i className="fa-brands fa-youtube"></i>
          <i className="fa-brands fa-twitter"></i>
        </li>
      </ul>
    </header>
  );
}
