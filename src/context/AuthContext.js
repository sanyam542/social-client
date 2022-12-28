import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: {
    _id: "6394db8ccf87e19a8d1e8399",

    username: "jane",
    email: "jane@gmail.com",
    password: "123456",
    profilePicture: "person/1.jpeg",
    coverPicture: "",
    followers: ["", "6394dd6ec1d8e6a29e7e49b3"],
    isAdmin: false,
    createdAt: {
      $date: {
        $numberLong: "1670699916613",
      },
    },
    updatedAt: {
      $date: {
        $numberLong: "1670790289396",
      },
    },
    __v: 0,
    followings: ["1,2,3"],
    city: "New York",
    from: "madrid",
    relationship: "1",
  },
  isFectching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFecthing: state.isFectching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
