import { GET_TASKS } from "../actions/types";

const initialState = {
  tasks: null,
  stats: {
    total: null,
    completed: null,
    uncompleted: null
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TASKS:
      return {
        ...initialState,
        tasks: action.payload.tasks,
        stats: action.payload.stats
      };

    default:
      return state;
  }
}
