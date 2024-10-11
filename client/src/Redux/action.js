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
    await axios.delete(`/user/deleteUser/${userId}`);
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

export const updateUser = (userId, newUser) => async (dispatch) => {
  try {
    const res = await axios.put(`/user/updateUser/${userId}`, newUser);
    dispatch({ type: UPDATE_USER, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const getStudents = () => async (dispatch) => {
  try {
    const res = await axios.get("/user/getStudents");
    dispatch({ type: GET_STUDENTS, payload: res.data });
  } catch (error) {
    console.error(error);
  }
};

export const getCourses = () => async (dispatch) => {
  try {
    const res = await axios.get("/user/getAllCourses");
    dispatch({ type: GET_COURSES, payload: res.data });
  } catch (error) {
    console.error(error);
  }
};

export const addCourse = (newCourse) => async (dispatch) => {
  try {
    const res = await axios.post("/user/addCourse", newCourse);
    dispatch({ type: ADD_COURSE, payload: res.data });
  } catch (error) {
    console.error(error);
  }
};

export const deleteCourse = (courseId) => async (dispatch) => {
  try {
    await axios.delete(`/user/deleteCourse/${courseId}`);
    dispatch({ type: DELETE_COURSE, payload: courseId });
  } catch (error) {
    console.error(error);
  }
};

export const updateCourse = (courseId, newCourse) => async (dispatch) => {
  try {
    const res = await axios.put(`/user/updateCourse/${courseId}`, newCourse);
    dispatch({ type: UPDATE_COURSE, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};


export const fetchCourseImage = (courseId) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/course/images/${courseId}`);
      const imageCourse = res.data.image;
      dispatch({ type: SET_COURSE_IMAGE, payload: imageCourse });
    } catch (error) {
      // Handle any errors if needed
      console.error("Error fetching course image:", error);
    }
  };
};