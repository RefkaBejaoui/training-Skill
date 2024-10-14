import "./App.css";
import NavBar from "./Components/NavBar";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage";
import Login from "./Components/Login";
import AdminDashBoard from "./Components/AdminDashBoard";
import StudentDashBoard from "./Components/StudentDashBoard";
import StudentList from "./Components/StudentList";
import CourseList from "./Components/CourseList";
import CheckPointList from "./Components/CheckPointList";
import AddUser from "./Components/AddUser";
import AddCourse from "./Components/AddCourse";
import CourseDetails from "./Components/CourseDetails";
import Profile from "./Components/Profile";
import AddCheckPoint from "./Components/AddCheckPoint";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/adminDashBoard" element={<AdminDashBoard />}>
          <Route path="/adminDashBoard/studentList" element={<StudentList />} />
          <Route
            path="/adminDashBoard/studentList/addUser"
            element={<AddUser />}
          />
          <Route path="/adminDashBoard/courseList" element={<CourseList />} />
          <Route
            path="/adminDashBoard/courseList/addCourse"
            element={<AddCourse />}
          />
          <Route
            path="/adminDashBoard/checkPointList"
            element={<CheckPointList />}
          />
          <Route path="/adminDashBoard/checkPointList/addCheckpoint" element={<AddCheckPoint/>}/>
          <Route
            path="/adminDashBoard/profile"
            element={<Profile/>}
          />
        </Route>
        <Route path="/studentDashBoard" element={<StudentDashBoard />}>
          <Route path="/studentDashBoard/courseList" element={<CourseList />} />
          <Route
            path="/studentDashBoard/checkPointList"
            element={<CheckPointList />}
          />
          <Route
            path="/studentDashBoard/profile"
            element={<Profile/>}
          />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/courseDetails/:courseId" element={<CourseDetails />} />
      </Routes>
    </div>
  );
}

export default App;
