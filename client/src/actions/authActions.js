//register user action
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER } from "./types";

export const registerUser = (userData, history) => dispatch => {
  //axios to test backend api routes
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    //.catch(err => console.log(err)); if you want to see errors in network tab of dev tools
    //.catch(err => console.log(err.response.data)); //to retrieve actual object and errors in console
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//login / get user token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      //save to local storage
      const { token } = res.data; //destructure token
      //set token to local storage
      localStorage.setItem("jwtToken", token); //setItem only takes strings-use stringify
      //set token to Auth header
      setAuthToken(token);
      //decode token to get user data
      const decoded = jwt_decode(token);
      //set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

//logout user
export const logoutUser = () => dispatch => {
  //remove token from localstorage
  localStorage.removeItem("jwtToken");
  //remove auth header for future requests
  setAuthToken(false);
  //set current user to empty object, which will also set isAuthenticated to false
  dispatch(setCurrentUser({})); //this sets initialState back to initial state (no user logged in) from reducer
};
