//register user action
import { GET_ERRORS } from "./types";
import axios from "axios";

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
