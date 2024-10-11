import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router";
import {fetchCourseImage, getCourses} from "../Redux/action"
import { useEffect } from "react";

function CourseLayOut() {
  const params = useParams();
  const dispatch = useDispatch()
  // const navigate = useNavigate()
  const showAllCourses = useSelector((state) => state.course);
  const course = showAllCourses.find((elem) => elem._id == params.id);
console.log(course)
  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);
 
  useEffect(() => {
    if (course._id) {
      // Assuming you have the user's ID available in the Redux state
      dispatch(fetchCourseImage(course._id));
    }
  }, [dispatch, course]);
  const fullImagePath = `http://localhost:5000${course.image}`;
  console.log(fullImagePath);
  return (
    <>
      <h1>CourseLayOut</h1>
      {course && <p>{course.title} {course.lesson} {course.image} </p>}
      {course.image ? (
          <img alt="User Profile" src={fullImagePath} />
        ) : (
          <img alt="User Profile" />
        )}
      {/* <button onClick={()=>navigate('/')}> go back </button> */}
    </>
  );
}
export default CourseLayOut;
