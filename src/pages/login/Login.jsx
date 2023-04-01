import { useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@mui/material/";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  console.log(AuthContext);

  const handleClick = (e) => {
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
    // console.log(email.current.value, password.current.value);
    e.preventDefault();
    console.log(user);
    console.log(error);
  };

  //
  return (
    <>
      <div className="login">
        <div className="loginWrapper">
          <div className="loginLeft">
            <h3 className="loginLogo">GetSocial</h3>
            <span className="loginDesc">
              Connect with friends and the world around you on GetSocial.
            </span>
          </div>
          <div className="loginRight">
            <form className="loginBox ">
              <input
                placeholder="Email"
                required
                type="email"
                className="loginInput"
                ref={email}
              />
              <input
                ref={password}
                required
                minLength="6"
                placeholder="Password"
                type="password"
                className="loginInput"
              />
              <button className="loginButton" onClick={handleClick}>
                {isFetching ? (
                  <CircularProgress
                    color="inherit"
                    size="20px"
                    disabled={isFetching}
                  />
                ) : (
                  "Log in"
                )}
              </button>

              {/* <span className="loginForgot">Forgot Password?</span> */}
              <a
                href="/register"
                type="submit"
                className="loginRegisterButton"
                disabled={isFetching}
              >
                {isFetching ? (
                  <CircularProgress color="inherit" size="20px" />
                ) : (
                  "Create a New Account"
                )}
              </a>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
