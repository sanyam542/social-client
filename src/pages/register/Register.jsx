import "./register.css";
import { useContext, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@mui/material";

const SU = process.env.REACT_APP_SERVER_URL;

export default function Login() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();
  const { isFetching } = useContext(AuthContext);

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      password.current.setCustomValidity("Password  don't macth!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };

      await axios
        .post(
          `${SU}auth/register`,

          user
        )
        .then(function (response) {
          console.log(response);
          navigate("/login");
          alert("Account Created");
        })
        .catch(function (error) {
          console.log(error);
          if (error.message === "Request failed with status code 500") {
            alert("User Already Exists , Change Username or Email");
          }
        });
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">GetSocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on GetSocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox " onSubmit={handleClick}>
            <input
              placeholder="Username"
              required
              ref={username}
              className="loginInput"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
            />

            <input
              placeholder="Password"
              required
              ref={password}
              type="password"
              className="loginInput"
              minLength="6"
            />
            <input
              placeholder="Confirm Password"
              required
              type="password"
              ref={passwordAgain}
              className="loginInput"
              minLength="6"
            />

            <button className="loginButton" type="submit">
              {isFetching ? (
                <>
                  <p>loading</p>
                  <CircularProgress
                    color="inherit"
                    size="20px"
                    // disabled={isFetching}
                  />
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
          <div className="loginRegisterButton">
            <a className="a" href="/login">
              Already a user? Log In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
