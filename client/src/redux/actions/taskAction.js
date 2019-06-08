import axios from "axios";
import {
  GET_TASKS,
  GET_ERRORS,
  GET_STATS,
  FETCH_NEXT,
  UPDATE_TASK,
  GET_ALL_TASKS
} from "./types";

export const updateTask = value => dispatch => {
  axios
    .get(`/api/tasks/paginate/next/${value}`)
    .then(res => {
      //just to obtain statistics
      axios.get("/api/tasks/recent").then(res2 => {
        dispatch({
          type: UPDATE_TASK,
          payload: { stats: res2.data.stats, ...res.data }
        });
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const fetchNext = value => dispatch => {
  axios
    .get(`/api/tasks/paginate/next/${value}`)
    .then(res => {
      dispatch({
        type: FETCH_NEXT,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
export const fetchPrev = value => dispatch => {
  axios
    .get(`/api/tasks/paginate/prev/${value}`)
    .then(res => {
      dispatch({
        type: FETCH_NEXT,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
export const editTask = (data, pageOffset) => dispatch => {
  axios
    .put(`/api/tasks/edit/${data._id}`, data)
    .then(res => {
      dispatch(updateTask(pageOffset));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
export const taskDone = (task_id, pageOffset) => dispatch => {
  axios
    .put(`/api/tasks/markdone/${task_id}`)
    .then(res => {
      dispatch(updateTask(pageOffset));
      dispatch(getAllTasks());
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
export const deleteTask = (task_id, pageOffset) => dispatch => {
  axios
    .delete(`/api/tasks/delete/${task_id}`)
    .then(res => {
      dispatch(updateTask(pageOffset));
      dispatch(getAllTasks());
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
export const createTask = data => dispatch => {
  axios
    .post("/api/tasks/create", data)
    .then(res => {
      alert("Task added SUCCESSFULLY!");
      //Clear any error that exists before coz the user might not have a task before
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
      dispatch(getTasks());
      dispatch(getAllTasks());
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const getTasks = (initial = 5) => dispatch => {
  axios
    .get("/api/tasks/recent")
    .then(res => {
      axios.get(`/api/tasks/paginate/next/${initial}`).then(res2 => {
        dispatch({
          type: GET_TASKS,
          payload: { ...res.data, paginate: res2.data.paginate }
        });
        dispatch(getAllTasks());
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
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
export const getAllTasks = () => dispatch => {
  axios
    .get("/api/tasks/")
    .then(res =>
      dispatch({
        type: GET_ALL_TASKS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};
