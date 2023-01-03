import { FooterComponent } from "../reusables/FooterComponent";
import { HeaderComponent } from "../reusables/HeaderComponent";
import "./Profile.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../auth/Auth-context";

export function ProfileDetailsEdit(formType = "edit") {
  const profileDetailsUrl = "http://localhost:3001/users";
  let { id } = useParams();
  const navigate = useNavigate();

  const { auth } = useContext(AuthContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (formType === "edit") {
      fetch(`${profileDetailsUrl}/${id}`, {
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((user) => {
          setFirstName(user.firstName);
          setLastName(user.lastName);
          setPhone(user.phone);
          setAddress(user.address);
          setEmail(user.email);
          setPassword(user.password);
        });
    }
  }, []);

  function firstNameChange(event) {
    setFirstName(event.target.value);
  }

  function lastNameChange(event) {
    setLastName(event.target.value);
  }

  function phoneChange(event) {
    setPhone(event.target.value);
  }

  function addressChange(event) {
    setAddress(event.target.value);
  }

  function emailChange(event) {
    setEmail(event.target.value);
  }

  function passwordChange(event) {
    setPassword(event.target.value);
  }

  function submit(event) {
    event.preventDefault();

    const body = {
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      address: address,
      email: email,
      password: password,
    };

    const url =
      formType === "edit" ? `${profileDetailsUrl}/${id}` : profileDetailsUrl;

    fetch(url, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${auth.accessToken}`,
      },
      body: JSON.stringify(body),
    }).then(() => {
      if (formType === "edit") {
        navigate("/profile/" + id);
      } else {
        navigate("/profile");
      }
    });
  }

  return (
    <section>
      <HeaderComponent />

      <div className="profile-btns-container">
        <button className="btn save-btn" onClick={submit}>
          Save
        </button>
      </div>

      <section className="profile-section user-details">
        <h2 className="profile-title">Details</h2>

        <div className="details-container">
          <img
            src="/images/user-icon.png"
            alt="User profile icon"
            className="user-img"
          />
          <div className="profile-details">
            <label htmlFor="firstName">First Name:</label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={firstNameChange}
            />
            {/* <p>{auth.user.firstName}</p> */}

            <p>Last Name:</p>
            <input type="text" />
            {/* <p>{auth.user.lastName}</p> */}

            <p>Phone:</p>
            <input type="text" />

            <p>Address:</p>
            <input type="text" />

            <p>E-mail:</p>
            <input type="text" />
            {/* <p>{auth.user.email}</p> */}

            <p>Password:</p>
            <input type="text" />
            {/* <p>{auth.user.password}</p> */}
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

// export function ProfileDetailsEdit() {
//   const profileDetailsUrl = "http://localhost:3001/users";
//   let { id } = useParams();
//   const navigate = useNavigate();

//   // const { auth } = useContext(AuthContext);

//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [address, setAddress] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   useEffect(() => {
//     fetch(`${profileDetailsUrl}/${id}`, {
//       headers: {
//         "Content-Type": "application/json",
//         // Authorization: `Bearer ${auth.accessToken}`,
//       },
//     })
//       .then((response) => response.json())
//       .then((user) => {
//         setFirstName(user.firstName);
//         setLastName(user.lastName);
//         setPhone(user.phone);
//         setAddress(user.address);
//         setEmail(user.email);
//         setPassword(user.password);
//       });
//   }, []);

//   function firstNameChange(event) {
//     setFirstName(event.target.value);
//   }

//   function lastNameChange(event) {
//     setLastName(event.target.value);
//   }

//   function phoneChange(event) {
//     setPhone(event.target.value);
//   }

//   function addressChange(event) {
//     setAddress(event.target.value);
//   }

//   function emailChange(event) {
//     setEmail(event.target.value);
//   }

//   function passwordChange(event) {
//     setPassword(event.target.value);
//   }

//   function submit(event) {
//     event.preventDefault();

//     const body = {
//       firstName: firstName,
//       lastName: lastName,
//       phone: phone,
//       address: address,
//       email: email,
//       password: password,
//     };

//     fetch(`${profileDetailsUrl}/${id}`, {
//       method: "PATCH",
//       headers: {
//         "Content-type": "application/json",
//         // Authorization: `Bearer ${auth.accessToken}`,
//       },
//       body: JSON.stringify(body),
//     }).then(() => {
//       navigate("/profile");
//     });
//   }

//   return (
//     <section>
//       <HeaderComponent />

//       <div className="profile-btns-container">
//         <button className="btn save-btn" onClick={submit}>
//           Save
//         </button>
//       </div>

//       <section className="profile-section user-details">
//         <h2 className="profile-title">Details</h2>

//         <div className="details-container">
//           <img
//             src="/images/user-icon.png"
//             alt="User profile icon"
//             className="user-img"
//           />
//           <div className="profile-details">
//             <p>First Name:</p>
//             <input type="text" value={firstName} onChange={firstNameChange} />
//             {/* <p>{auth.user.firstName}</p> */}

//             <p>Last Name:</p>
//             <input type="text" />
//             {/* <p>{auth.user.lastName}</p> */}

//             <p>Phone:</p>
//             <input type="text" />

//             <p>Address:</p>
//             <input type="text" />

//             <p>E-mail:</p>
//             <input type="text" />
//             {/* <p>{auth.user.email}</p> */}

//             <p>Password:</p>
//             <input type="text" />
//             {/* <p>{auth.user.password}</p> */}
//           </div>
//         </div>
//       </section>

//       <section className="profile-section progress-short">
//         <h2 className="profile-title">Goal</h2>
//       </section>

//       <section className="profile-section payment-plans">
//         <h2 className="profile-title">Upgrade Plan</h2>
//       </section>

//       <FooterComponent />
//     </section>
//   );
// }
