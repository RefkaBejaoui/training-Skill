import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";

function CourseDetails() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const theCourse = useSelector((state) => state.course);
  //   const selectedCourse = theCourse.find((course) => course._id === courseId);
  const theCurrentUser = useSelector((state) => state.user);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const course = theCourse.find((course) => course._id === courseId);
    setSelectedCourse(course);
  }, [courseId, theCourse]);

  const goBack = () => {
    if (theCurrentUser.role === "admin") {
      navigate("/adminDashBoard/courseList");
    } else {
      navigate("/studentDashBoard/courseList");
    }
  };

  if (!selectedCourse) {
    return <p>Loading course details ...</p>;
  }

  return (
    <>
      <div>
        {/* {selectedCourse && (
          <> */}
        <p>{selectedCourse.title}</p>
        <p>{selectedCourse.lesson1}</p>
        <p>{selectedCourse.video}</p>
        {selectedCourse.image && (
          <img
            src={selectedCourse.image}
            alt={selectedCourse.title}
            style={{ Width: 800, height: 250 }}
          />
        )}
        <p>{selectedCourse.lesson2}</p>
        {/* </>
        )} */}
        <Button variant="outline-dark" onClick={goBack}>
          Go Back{" "}
        </Button>
        <Button variant="outline-dark" onClick={goBack}>
          Next{" "}
        </Button>
      </div>
    </>
  );
}

export default CourseDetails;
