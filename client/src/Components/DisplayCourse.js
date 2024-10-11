import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "../Redux/action";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";



function StudentDashBoard() {
    const dispatch = useDispatch();
  const cours = useSelector((state) => state.course);
  console.log(cours);
  const [showCourses, setSchowCourses] = useState(false);

  const showAllCourses = () => {
    setSchowCourses(true);
    dispatch(getCourses());
  };

  useEffect(() => {
      if (showCourses) {
          dispatch(getCourses());
      }
  }, [showCourses , dispatch]);

  console.log(cours);
    return ( <>
    <h1>Student Dash-Board</h1>
    <Button onClick={showAllCourses}>lessons</Button>

      <div>
        {Array.isArray(cours)&& cours.map((element , index) =>(
            <div key={index}
            {...element}>
              {element.title} , {element.lesson} , {element.video} , {element.image} 
            </div>)
          ) }
      </div>
      <h2>lessons</h2>
    </> );
}

export default StudentDashBoard;

