import { SET_CURRENT_USER } from "../actions/types";
//import isEmpty from "../../utils/isEmpty";
const initialState = {
  isAuthenticated: false,
  user: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user
      };
    default:
      return state;
  }
}
