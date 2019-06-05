import axios from "axios";
import { GET_TASKS, GET_ERRORS, GET_STATS } from "./types";

export const createTask = data => dispatch => {
  axios
    .post("/api/tasks/create", data)
    .then(res => {
      console.log(res.data);
      alert("Task added SUCCESSFULLY!");
      dispatch(getTasks());
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
//TODO: GET TOTAL COUNT OF TASKS:CREATE A ROUTE FOR IT
//TODO: GET TOTAL COUNT OF COMPLETED AND UNCOMPLETED
//TODO: GET THE MOST RECENT 5 TASKS
//TODO: CALL THE ACTION GET STATS
export const getTasks = () => dispatch => {
  axios
    .get("/api/tasks/recent")
    .then(res => {
      dispatch({
        type: GET_TASKS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: {
          errors: err.response.data
        }
      });
    });
};

export const getStats = () => dispatch => {
  axios
    .get("/api/tasks/stats")
    .then(res =>
      dispatch({
        type: GET_STATS,
        payload: {
          stats: res.data
        }
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
