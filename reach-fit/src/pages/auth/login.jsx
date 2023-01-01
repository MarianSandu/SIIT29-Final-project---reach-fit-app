import { useContext, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./Auth-context";

export function Login() {
  const loginUrl = "http://localhost:3001/login";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { auth, setAuth } = useContext(AuthContext);

  const navigate = useNavigate();

  function passwordChangeHandler(event) {
    setPassword(event.target.value);
  }

  function emailChangeHandler(event) {
    setEmail(event.target.value);
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
      email,
      password,
    };

    fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((response) => {
        setAuth(response);
        navigate("/my-plan");
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
      <div className="login-container">
        <form onSubmit={onSubmit} noValidate className="login-form">
          <h2 className="login-title">Login to your account</h2>
          <input
            type="email"
            id="email"
            onChange={emailChangeHandler}
            placeholder="E-mail"
          />
          <p className="warning">{emailError}</p>

          <input
            type="password"
            id="password"
            onChange={passwordChangeHandler}
            placeholder="Password"
          />
          <p className="warning">{passwordError}</p>

          <button type="submit" className="btn btn-login--page">
            Login
          </button>
        </form>

        <div className="register">
          <h2>Not a member yet?</h2>
          <p>Join our community and start REACHing your goals!</p>
          <Link to={"/register"} className="register-btn">
            <button className="btn btn-register">Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
