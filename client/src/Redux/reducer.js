import {
  ADD_CHECKPOINT,
  ADD_COURSE,
  DELETE_CHECKPOINT,
  DELETE_COURSE,
  DELETE_USER,
  GET_CHECKPOINT,
  GET_COURSES,
  GET_STUDENTS,
  LOG_OUT_USER,
  LOGIN_USER,
  REGISTER_USER,
  SET_COURSE_IMAGE,
  SHOW_USER_NAME,
  UPDATE_CHECKPOINT,
  UPDATE_COURSE,
  UPDATE_USER,
  REGIDTER_STUDENT_SCORE,
  SHOW_STUDENT_SCORE,
  SHOW_SCORES,
  REGISTER_RESPONSE_STUDENT,
  SHOW_STUDENT_RESPONSE,
  SHOW_ALL_RESPONSES,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
} from "./actionTypes";

const initialState = {
  token: localStorage.getItem("token"),
  user: [],
  course: [],
  student: [],
  image: null,
  checkPoint: [],
  score: 0,
  response: [],
  hashPassword: "",
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
      return { ...state, course: action.payload };
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
      return { ...state, image: action.payload };
    case ADD_CHECKPOINT:
      return { ...state, CheckPoint: action.payload.newCheckPoint };
    case GET_CHECKPOINT:
      return { ...state, checkPoint: action.payload };
    case DELETE_CHECKPOINT:
      return {
        ...state,
        checkPoint: state.checkPoint.filter(
          (checkPoint) => checkPoint._id !== action.payload
        ),
      };
    case UPDATE_CHECKPOINT:
      return { ...state, checkPoint: action.payload };
    case REGIDTER_STUDENT_SCORE:
      return { ...state, score: action.payload.newScore };
    case SHOW_STUDENT_SCORE:
      return {
        ...state,
        score: action.payload,
      };
    case SHOW_SCORES:
      return { ...state, score: action.payload };
    case REGISTER_RESPONSE_STUDENT:
      return { ...state, response: action.payload.newResponse };
    case SHOW_STUDENT_RESPONSE:
      return { ...state, response: action.payload };
    case SHOW_ALL_RESPONSES:
      return { ...state, response: action.payload };
    case UPDATE_PASSWORD_SUCCESS:
      return { ...state, user: action.payload };
    case UPDATE_PASSWORD_FAIL:
      return { ...state, user: action.payload };
    // case CLEAR_STUDENT_RESPONSE:
    //   return state.filter((response) => response.studentId !== action.payload);
    // case CLEAR_STUDENT_SCORE:
    //   return state.filter((score) => score.studentId !== action.payload);

    default:
      return state;
  }
};
export default reducer;
