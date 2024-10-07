import {
  DELETE_STUDENT,
  GET_COURSES,
  LOG_OUT_STUDENT,
  LOGIN_STUDENT,
  REGISTER_STUDENT,
  SHOW_STUDENT_NAME,
} from "./actionTypes";
import axios from "axios";

export const registerStudent = (newStudent) => async (dispatch) => {
  try {
    const res = await axios.post("/admin/registerStudent", newStudent);
    dispatch({ type: REGISTER_STUDENT, payload: res.data });
  } catch (error) {
    console.error(error);
  }
};

export const loginStudent = (student) => async (dispatch) => {
  try {
    const res = await axios.post("/student/loginStudent", student);
    dispatch({ type: LOGIN_STUDENT, payload: res.data });
  } catch (error) {
    console.error(error);
  }
};

export const deleteStudent = (studentId) => async (dispatch) => {
  try {
    await axios.delete(`/admin/deleteStudent/:${studentId}`);
    dispatch({ type: DELETE_STUDENT, payload: studentId });
  } catch (error) {
    console.error(error);
  }
};

export const showStudentName = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        autorisation: localStorage.getItem("token"),
      },
    };
    const res = await axios.get("student/authorizedStudent", config);
    dispatch({ type: SHOW_STUDENT_NAME, payload: res.data });
  } catch (error) {
    console.error(error);
  }
};

export const logOutStudent = () => (dispatch) => {
  dispatch({ type: LOG_OUT_STUDENT });
};

export const getCourses = () => async (dispatch) => {
  try {
    const res = await axios.get("/student/getAllCourses");
    dispatch({ type: GET_COURSES, payload: res.data });
  } catch (error) {
    console.error(error);
  }
};
