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
  SHOW_SCORES,
  SHOW_STUDENT_SCORE,
  REGISTER_RESPONSE_STUDENT,
  SHOW_STUDENT_RESPONSE,
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
    console.log("action : starting updateUser");
    const res = await axios.put(`/user/updateUser/${userId}`, newUser);
    console.log("reeeeeeeee", res.data);
    dispatch({ type: UPDATE_USER, payload: res.data });
  } catch (error) {
    console.error(error);
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
    const res = await axios.get("/course/getAllCourses");
    dispatch({ type: GET_COURSES, payload: res.data.courses });
  } catch (error) {
    console.error(error);
  }
};

export const addCourse = (newCourse) => async (dispatch) => {
  try {
    const res = await axios.post("/course/addCourse", newCourse);
    dispatch({ type: ADD_COURSE, payload: res.data });
  } catch (error) {
    console.error(error);
  }
};

export const deleteCourse = (courseId) => async (dispatch) => {
  try {
    await axios.delete(`/course/deleteCourse/${courseId}`);
    dispatch({ type: DELETE_COURSE, payload: courseId });
  } catch (error) {
    console.error(error);
  }
};

export const updateCourse = (courseId, newCourse) => async (dispatch) => {
  try {
    const res = await axios.put(`/course/updateCourse/${courseId}`, newCourse);
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
      console.error("Error fetching course image:", error);
    }
  };
};

export const addCheckPoint = (newCheckPoint) => async (dispatch) => {
  try {
    const res = await axios.post("/checkPoint/addCheckPoint", newCheckPoint);
    dispatch({ type: ADD_CHECKPOINT, payload: res.data });
  } catch (error) {
    console.error(error);
  }
};

export const getCheckPoint = () => async (dispatch) => {
  try {
    const res = await axios.get("/checkPoint/getCheckPoint");
    dispatch({ type: GET_CHECKPOINT, payload: res.data.checkPoint });
  } catch (error) {
    console.error(error);
  }
};

export const deleteCheckPoint = (checkpointId) => async (dispatch) => {
  try {
    await axios.delete(`/checkpoint/deleteCheckpoint/${checkpointId}`);
    dispatch({ type: DELETE_CHECKPOINT, payload: checkpointId });
  } catch (error) {
    console.error(error);
  }
};

export const updateCheckpoint =
  (checkpointId, newCheckpoint) => async (dispatch) => {
    try {
      const res = await axios.put(
        `/checkpoint/updateCheckpoint/${checkpointId}`,
        newCheckpoint
      );
      dispatch({ type: UPDATE_CHECKPOINT, payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };

export const registerScore = (studentId, studentName) => async (dispatch) => {
  try {
    const res = await axios.post("/score/registerScore", {
      //studentScore: studentScore,
      studentId: studentId,
      studentName: studentName,
      //studentResponsesId: studentResponsesId,
    });
    dispatch({ type: REGIDTER_STUDENT_SCORE, payload: res.data });
  } catch (error) {
    console.error(error);
  }
};

export const showScores = () => async (dispatch) => {
  try {
    const res = await axios.get("/score/showScores");
    dispatch({ type: SHOW_SCORES, payload: res.data.scores });
  } catch (error) {
    console.error(error);
  }
};

export const showStudentScore = (userName) => async (dispatch) => {
  try {
    const res = await axios.get(`/score/showStudentScore/${userName}`);
    dispatch({ type: SHOW_STUDENT_SCORE, payload: res.data.studentScore });
  } catch (error) {
    console.error(error);
  }
};

export const registerResponseStudent =
  (studentId, studentName, checkPointQuestions, studentResponses) =>
  async (dispatch) => {
    try {
      const res = await axios.post("/response/registerResponseStudent", {
        studentId: studentId,
        studentName: studentName,
        checkPointQuestions: checkPointQuestions,
        studentResponses: studentResponses,
      });
      dispatch({ type: REGISTER_RESPONSE_STUDENT, payload: res.data });
    } catch (error) {
      console.error("error in dispatshing responses", error);
    }
  };

export const showStudentResponse = (userName) => async (dispatch) => {
  try {
    const res = await axios.get(`/response/showStudentResponse/${userName}`);
    dispatch({
      type: SHOW_STUDENT_RESPONSE,
      payload: res.data.studentResponse,
    });
    return res.data.studentResponse;
  } catch (error) {
    console.error(error);
    return null;
  }
};
