import {
  DELETE_USER,
  GET_COURSES,
  GET_STUDENTS,
  LOG_OUT_USER,
  LOGIN_USER,
  REGISTER_USER,
  SHOW_USER_NAME,
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

export const updateUser = (userId, newUser) => async(dispatch)=>{
try {
  const res = await axios.put(`/user/updateUser/${userId}`, newUser);
  dispatch({ type : UPDATE_USER , payload: res.data});
} catch (error) {
  console.log(error)
}
}

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
    const res = await axios.get("/student/getAllCourses");
    dispatch({ type: GET_COURSES, payload: res.data });
  } catch (error) {
    console.error(error);
  }
};
