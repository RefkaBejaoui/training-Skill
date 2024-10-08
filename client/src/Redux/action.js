import {
  DELETE_USER,
  GET_COURSES,
  LOG_OUT_USER,
  LOGIN_USER,
  REGISTER_USER,
  SHOW_USER_NAME,
} from "./actionTypes";
import axios from "axios";

export const registerUser = (newUser) => async (dispatch) => {
  try {
    const res = await axios.post("/user/registerUser", newUser);
    dispatch({ type: REGISTER_USER, payload: res.data });
  } catch (error) {
    console.error(error);
  }
};

export const loginUser = (user) => async (dispatch) => {
  try {
    const res = await axios.post("/user/loginUser", user);
    dispatch({ type: LOGIN_USER, payload: res.data });
  } catch (error) {
    console.error(error);
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  try {
    await axios.delete(`/user/deleteUser/:${studentId}`);
    dispatch({ type: DELETE_USER, payload: userId });
  } catch (error) {
    console.error(error);
  }
};

export const showUserName = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        autorisation: localStorage.getItem("token"),
      },
    };
    const res = await axios.get("/user/authorized", config);
    dispatch({ type: SHOW_USER_NAME, payload: res.data });
  } catch (error) {
    console.error(error);
  }
};

export const logOutUser = () => (dispatch) => {
  dispatch({ type: LOG_OUT_USER });
};

export const getCourses = () => async (dispatch) => {
  try {
    const res = await axios.get("/student/getAllCourses");
    dispatch({ type: GET_COURSES, payload: res.data });
  } catch (error) {
    console.error(error);
  }
};
