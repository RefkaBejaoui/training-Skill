import "./App.css";
import NavBar from "./Components/NavBar";
import { Route, Routes } from "react-router-dom";
//import DashBoard from "./Components/DashBoard";
import HomePage from "./Components/HomePage";
import Login from "./Components/Login";
import AdminDashBoard from "./Components/AdminDashBoard";
import StudentDashBoard from "./Components/StudentDashBoard";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/admin" element={<AdminDashBoard/>} />
        <Route path = "/studentDashBoard" element={<StudentDashBoard/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<HomePage/>} />
        {/* <Route path="/dashBoard" element={<DashBoard />} /> */} */
        
      </Routes>
    </div>
  );
}

export default App;
