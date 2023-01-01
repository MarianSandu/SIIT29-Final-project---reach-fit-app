import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { Link } from "react-router-dom";

export function Register() {
  const registerUrl = "http://localhost:3001/register";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");

  const navigate = useNavigate();

  function passwordChangeHandler(event) {
    setPassword(event.target.value);
  }

  function emailChangeHandler(event) {
    setEmail(event.target.value);
  }

  function firstNameChangeHandler(event) {
    setFirstName(event.target.value);
  }

  function lastNameChangeHandler(event) {
    setLastName(event.target.value);
  }

  function onSubmit(event) {
    event.preventDefault();
    setEmailError("");
    setPasswordError("");

    const emailRegex =
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;

    const emailValid = emailRegex.test(email);
    const passwordValid = validatePassword(password);

    if (!emailValid) {
      setEmailError("Please enter a valid email");
    }

    if (!emailValid || !passwordValid) {
      return;
    }

    const body = {
      firstName,
      lastName,
      email,
      password,
    };

    fetch(registerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((response) => {
        navigate("/login");
      });
  }

  function validatePassword(password) {
    if (!(password.length >= 6)) {
      setPasswordError("Password must contain at least 6 characters");

      return false;
    }

    let hasUpperCaseCharacter = false;
    let hasNumberCharacter = false;

    for (let letter of password) {
      if (Number.isNaN(Number(letter)) && letter === letter.toUpperCase()) {
        hasUpperCaseCharacter = true;
      }

      if (typeof Number(letter) === "number") {
        hasNumberCharacter = true;
      }
    }

    if (!hasUpperCaseCharacter) {
      setPasswordError(
        "Your password must have at least one upper case character"
      );
    }

    if (!hasNumberCharacter) {
      setPasswordError("Your password must have at least one number");
    }

    if (hasUpperCaseCharacter && hasNumberCharacter) {
      return true;
    }

    return false;
  }

  return (
    <div className="login-page">
      <div className="register-container">
        <form
          onSubmit={onSubmit}
          noValidate
          className="register-form login-form"
        >
          <h2 className="register-title">Create a new account</h2>

          <div className="reg-container">
            <input
              type="text"
              id="first-name"
              onChange={firstNameChangeHandler}
              placeholder="First Name"
            />
            {/* <p className="warning-register">{firstNameError}</p> */}
          </div>

          <div className="reg-container">
            <input
              type="text"
              id="last-name"
              onChange={lastNameChangeHandler}
              placeholder="Last Name"
            />
            {/* <p className="warning-register">{lastNameError}</p> */}
          </div>

          <div className="reg-container">
            <input
              type="email"
              id="email"
              onChange={emailChangeHandler}
              placeholder="E-mail"
            />
            <p className="warning-register">{emailError}</p>
          </div>

          <div className="reg-container">
            <input
              type="password"
              id="password"
              onChange={passwordChangeHandler}
              placeholder="Password"
            />
            <p className="warning-register">{passwordError}</p>
          </div>

          <button type="submit" className="btn btn-register">
            Sign Up
          </button>
        </form>

        <div className="login">
          <h2>Already have an account?</h2>
          <Link to={"/login"} className="btn-login-form">
            <button className="btn btn-login-form">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
