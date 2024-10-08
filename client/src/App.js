import "./App.css";
import NavBar from "./Components/NavBar";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage";
import Login from "./Components/Login";
import AdminDashBoard from "./Components/AdminDashBoard";
import StudentDashBoard from "./Components/StudentDashBoard";
import AdminList from "./Components/AdminList";
import StudentList from "./Components/StudentList";
import CourseList from "./Components/CourseList";
import CheckPointList  from "./Components/CheckPointList"

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/adminDashBoard" element={<AdminDashBoard />}>
          <Route path="/adminDashBoard/adminList" element={<AdminList />} />
          <Route path="/adminDashBoard/studentList" element={<StudentList />} />
          <Route path="/adminDashBoard/courseList" element={<CourseList />} />
          <Route path="/adminDashBoard/checkPointList" element={<CheckPointList />} />
        </Route>
        <Route path="/studentDashBoard" element={<StudentDashBoard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
