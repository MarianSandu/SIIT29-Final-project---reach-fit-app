import { useContext } from "react";
import { AuthContext } from "../auth/Auth-context";
import { FooterComponent } from "../reusables/FooterComponent";
import { HeaderComponent } from "../reusables/HeaderComponent";
import { Link } from "react-router-dom";
import "./Profile.css";
import { useParams } from "react-router-dom";

export function Profile() {
  const { auth, logOut } = useContext(AuthContext);
  let { id } = useParams();

  return (
    <section>
      <HeaderComponent />

      <div className="profile-btns-container">
        <Link to={`/profile/${id}/edit`}>
          <button className="btn edit-btn">Edit</button>
        </Link>
        <button onClick={logOut} className="btn logout-btn">
          Logout
        </button>
      </div>

      <section className="profile-section user-details">
        <h2 className="profile-title">Details</h2>

        <div className="details-container">
          <img
            src="./images/user-icon.png"
            alt="User profile icon"
            className="user-img"
          />
          <div className="profile-details">
            <p>First Name:</p>
            <p>{auth.user.firstName}</p>

            <p>Last Name:</p>
            <p>{auth.user.lastName}</p>

            <p>Phone:</p>
            <p></p>

            <p>Address:</p>
            <p></p>

            <p>E-mail:</p>
            <p>{auth.user.email}</p>

            <p>Password:</p>
            <p>{auth.user.password}</p>
          </div>
        </div>
      </section>

      <section className="profile-section progress-short">
        <h2 className="profile-title">Goal</h2>
      </section>

      <section className="profile-section payment-plans">
        <h2 className="profile-title">Upgrade Plan</h2>
      </section>

      <FooterComponent />
    </section>
  );
}
