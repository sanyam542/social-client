import axios from "axios";

const SU = process.env.REACT_APP_SERVER_URL;

export const loginCall = async (userCredential, dispatch) => {
  // dispatch({ type: "LOGIN_START" }).then(console.log("dispacthed"));
  dispatch({ type: "LOGIN_START" });

  try {
    const res = await axios.post(`${SU}auth/login`, userCredential);
    console.log(res);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });

    alert("Invalid Credentials");
  }
};
