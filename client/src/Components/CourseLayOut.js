import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchCourseImage, getCourses } from "../Redux/action";
import { useEffect, useState } from "react";

function CourseLayOut() {
  const params = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  // const navigate = useNavigate()
  const showAllCourses = useSelector((state) => state.course);
  const course = showAllCourses.find((elem) => elem._id === params.id);

  useEffect(() => {
    dispatch(getCourses()).then(()=>setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    if (course && course._id) {
      dispatch(fetchCourseImage(course._id));
    }
  }, [dispatch, course]);
  const fullImagePath = course ? `http://localhost:5000${course.image}`: '';
 
  if(loading){
    return <div>Loading...</div>
  }
  if (!course) {
    return <div>Course not found</div>
  }
  return (
    <>
      {course && 
        <p>
          <h3 style={{textDecoration:"underline" , marginTop : 10}}>{course.title} </h3> <div style={{ marginTop:50 ,border: "solid 1px gray"}}>{course.lesson1}</div>{" "}
        </p>
      }

      {course && course.image ? (
        <img
          alt="course schema"
          src={fullImagePath}
          style={{ width: "350px", height: "auto" }}
        />
      ) : (
        <img alt="course schema" style={{ width: "300px", height: "auto" }} />
      )}
      <div style={{border: "solid 1px gray"}}>{course.lesson2}</div>

      {/* <button onClick={()=>navigate('/')}> go back </button> */}
    </>
  );
}
export default CourseLayOut;
