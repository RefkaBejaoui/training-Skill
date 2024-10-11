import {
  ADD_COURSE,
  DELETE_COURSE,
  DELETE_USER,
  GET_COURSES,
  GET_STUDENTS,
  LOG_OUT_USER,
  LOGIN_USER,
  REGISTER_USER,
  SET_COURSE_IMAGE,
  SHOW_USER_NAME,
  UPDATE_COURSE,
  UPDATE_USER,
} from "./actionTypes";

const initialState = {
  token: localStorage.getItem("token"),
  user: [],
  course: [],
  student: [],
  image: null,
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
    case UPDATE_USER:
      return { ...state, user: action.payload };
    case GET_STUDENTS:
      return { ...state, student: action.payload.user };
    case GET_COURSES:
      return { ...state, course: action.payload.courses };
    case ADD_COURSE:
      return { ...state, course: action.payload.newCourse };
    case DELETE_COURSE:
      return {
        ...state,
        course: state.course.filter((course) => course._id !== action.payload),
      };
    case UPDATE_COURSE:
      return { ...state, course: action.payload };
      case SET_COURSE_IMAGE:
      // Update the state with the received image URL
      return { ...state, image: action.payload, };
    default:
      return state;
  }
};
export default reducer;
