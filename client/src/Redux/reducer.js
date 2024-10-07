import {
  DELETE_STUDENT,
  GET_COURSES,
  LOG_OUT_STUDENT,
  LOGIN_STUDENT,
  REGISTER_STUDENT,
  SHOW_STUDENT_NAME,
} from "./actionTypes";

const initialState = {
  token: localStorage.getItem("token"),
  user: null,
  cours: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_STUDENT:
      return { ...state, user: action.payload.newStudent };
    case LOGIN_STUDENT:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        user: action.payload.student,
        token: action.payload.token,
      };
    case DELETE_STUDENT:
      return {
        ...state,
        user: state.user.filter((student) => student._id !== action.payload),
      };
    case SHOW_STUDENT_NAME:
      return {
        ...state,
        user: action.payload.user,
      };
    case LOG_OUT_STUDENT:
      localStorage.removeItem("token");
      return { ...state, user: null, token: null };
    case GET_COURSES:
      return { ...state, cours: action.payload.courses };
    default:
      return state;
  }
};
export default reducer;
