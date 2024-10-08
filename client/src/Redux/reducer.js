import {
  DELETE_USER,
  GET_COURSES,
  LOG_OUT_USER,
  LOGIN_USER,
  REGISTER_USER,
  SHOW_USER_NAME,
} from "./actionTypes";

const initialState = {
  token: localStorage.getItem("token"),
  user: null,
  cours: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return { ...state, user: action.payload.newUser };
    case LOGIN_USER:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case DELETE_USER:
      return {
        ...state,
        user: state.user.filter((user) => user._id !== action.payload),
      };
    case SHOW_USER_NAME:
      return {
        ...state,
        user: action.payload.user,
      };
    case LOG_OUT_USER:
      localStorage.removeItem("token");
      return { ...state, user: null, token: null };
    case GET_COURSES:
      return { ...state, cours: action.payload.courses };
    default:
      return state;
  }
};
export default reducer;
