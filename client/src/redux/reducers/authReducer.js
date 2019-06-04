import { SET_CURRENT_USER } from "../actions/types";
//import isEmpty from "../../utils/isEmpty";
import isEmpty from "../../utils/isEmpty";
const initialState = {
  isAuthenticated: false,
  user: null,
  loading: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload.user),
        user: action.payload.user,
        loading: false
      };
    default:
      return state;
  }
}
