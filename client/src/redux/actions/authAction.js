import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import axios from "axios";
import setHeader from "../../utils/applyTokenToRequestHeaders";
import jwtDecode from "jwt-decode";

export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err => {
      return dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const loginUser = (userData, history) => dispatch => {
  //TODO: confirm login and get token
  //TODO: Decode token and set the current user
  //TODO: Store token in local storage
  //TODO: Apply token as authorization header for subsequent calls

  axios
    .post("/api/users/login", userData)
    .then(res => {
      localStorage.setItem("token", res.data.token);
      setHeader(res.data.token);

      const user = jwtDecode(res.data.token);

      dispatch(setCurrentUser(user));
      history.push("/dashboard");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const setCurrentUser = user => dispatch => {
  dispatch({
    type: SET_CURRENT_USER,
    payload: {
      isAuthenticated: true,
      user
    }
  });
};
