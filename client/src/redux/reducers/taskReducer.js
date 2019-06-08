import { GET_TASKS, FETCH_NEXT, UPDATE_TASK } from "../actions/types";

const initialState = {
  tasks: null,
  stats: {
    total: null,
    completed: null,
    uncompleted: null
  },
  paginate: {
    next: false,
    prev: false
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TASKS:
      return {
        ...state,
        tasks: action.payload.tasks,
        stats: action.payload.stats,
        paginate: action.payload.paginate
      };

    case UPDATE_TASK:
      return {
        ...state,
        tasks: action.payload.tasks,
        stats: action.payload.stats,
        paginate: action.payload.paginate
      };
    case FETCH_NEXT:
      const res = {
        ...state,
        tasks: action.payload.tasks,
        paginate: action.payload.paginate
      };
      return res;

    default:
      return state;
  }
}
