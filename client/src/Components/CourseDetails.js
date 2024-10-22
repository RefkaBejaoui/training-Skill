// import { useParams, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import Button from "react-bootstrap/Button";
// import { useEffect, useState } from "react";

// function CourseDetails() {
//   const { courseId } = useParams();
//   const navigate = useNavigate();
//   const theCourse = useSelector((state) => state.course);
//   const theCurrentUser = useSelector((state) => state.user);
//   const [selectedCourse, setSelectedCourse] = useState(null);

//   useEffect(() => {
//     const course = theCourse.find((course) => course._id === courseId);
//     if (course) {
//       course.lesson1 =
//         typeof course.lesson1 === "string"
//           ? course.lesson1.split(". ").map((sentence) => sentence.trim())
//           : course.lesson1;
//       setSelectedCourse(course);
//     }
//   }, [courseId, theCourse]);

//   const goBack = () => {
//     const currentIndex = theCourse.findIndex(
//       (course) => course._id === courseId
//     );
//     if (currentIndex === 0) {
//       if (theCurrentUser.role === "admin") {
//         navigate("/adminDashBoard/courseList");
//       } else if (theCurrentUser.role === "student") {
//         navigate("/studentDashBoard/courseList");
//       }
//     } else {
//       const previousIndex = currentIndex - 1;
//       const previousCourseId = theCourse[previousIndex]._id;
//       navigate(`/courseDetails/${previousCourseId}`);
//     }
//   };

//   const goToNext = () => {
//     const currentIndex = theCourse.findIndex(
//       (course) => course._id === courseId
//     );
//     const nextIndex = (currentIndex + 1) % theCourse.length;
//     const nextCourseId = theCourse[nextIndex]._id;
//     navigate(`/courseDetails/${nextCourseId}`);
//   };

//   if (!selectedCourse) {
//     return <p style={{ color: "whitesmoke" }}>Loading course details ...</p>;
//   }

//   return (
//     <>
//       <div>
//         <h2
//           style={{ textDecoration: "underline", paddingTop: 80, color: "red" }}
//         >
//           {selectedCourse.title}
//         </h2>
//         <p
//           style={{
//             textAlign: "start",
//             marginTop: 50,
//             border: "dotted 1px gray",
//             color: "whitesmoke",
//             paddingLeft: 20,
//           }}
//         >
//           {/* {selectedCourse.lesson1} */}

//           {selectedCourse.lesson1 &&
//             selectedCourse.lesson1.map((part, index) => (
//               <p key={index} style={{ display: "block", marginBottom: "10px" }}>
//                 {part}
//               </p>
//             ))}
//         </p>
//         <p>{selectedCourse.video}</p>
//         {selectedCourse.image && (
//           <img
//             src={selectedCourse.image}
//             alt={selectedCourse.title}
//             style={{ Width: 800, height: 250 }}
//           />
//         )}
//         <p
//           style={{
//             textAlign: "start",
//             paddingLeft: 20,
//             border: "dotted 1px gray",
//             color: "whitesmoke",
//           }}
//         >
//           {selectedCourse.lesson2}
//         </p>

//         <Button variant="secondary" onClick={goBack}>
//           {"<= Previous course"}
//         </Button>
//         <Button variant="light" onClick={goToNext}>
//           {"Next course =>"}
//         </Button>
//       </div>
//     </>
//   );
// }

// export default CourseDetails;


import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";

function CourseDetails() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const theCourse = useSelector((state) => state.course);
  const theCurrentUser = useSelector((state) => state.user);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const course = theCourse.find((course) => course._id === courseId);
    if (course) {
      course.lesson1 = typeof course.lesson1 === 'string' ? course.lesson1.split('. ').map(sentence => sentence.trim()) : course.lesson1;
      course.lesson2 = typeof course.lesson2 === 'string'
      ? course.lesson2.split('. ').map(sentence => sentence.trim())
      : course.lesson2;
      setSelectedCourse(course);
    }
  }, [courseId, theCourse]);

  const goBack = () => {
    const currentIndex = theCourse.findIndex((course) => course._id === courseId);
    if (currentIndex === 0) {
      if (theCurrentUser.role === "admin") {
        navigate("/adminDashBoard/courseList");
      } else if (theCurrentUser.role === "student") {
        navigate("/studentDashBoard/courseList");
      }
    } else {
      const previousIndex = currentIndex - 1;
      const previousCourseId = theCourse[previousIndex]._id;
      navigate(`/courseDetails/${previousCourseId}`);
      window.scrollTo(0, 0)
    }
  };

  const goToNext = () => {
    const currentIndex = theCourse.findIndex((course) => course._id === courseId);
   
    if (currentIndex+1 === theCourse.length) {
      if (theCurrentUser.role === "admin") {
        navigate("/adminDashBoard/courseList");
      } else if (theCurrentUser.role === "student") {
        navigate("/studentDashBoard/checkPointList");
      }
    } else {

    const nextIndex = (currentIndex + 1) % theCourse.length;
    const nextCourseId = theCourse[nextIndex]._id;
    navigate(`/courseDetails/${nextCourseId}`);
    window.scrollTo(0, 0)
    }
  };

  if (!selectedCourse) {
    return <p style={{ color: "whitesmoke" }}>Loading course details ...</p>;
  }

  return (
    <>
      <div>
        <h2 style={{ textDecoration: "underline", paddingTop: 80, color: "red" }}>
          {selectedCourse.title}
        </h2>
        <p style={{ textAlign: "start", marginTop: 50, border: "dotted 1px gray", color: "whitesmoke", paddingLeft: 20 }}>
          {selectedCourse.lesson1 && selectedCourse.lesson1.map((part, index) => (
            <p key={index} style={{ display: 'block', marginBottom: '10px', marginLeft:20 }}>{part}</p>
          ))}
        </p>
        <p>{selectedCourse.video}</p>
        {selectedCourse.image && (
          <img
            src={selectedCourse.image}
            alt={selectedCourse.title}
            style={{ Width: 800, height: 250 }}
          />
        )}
        <p style={{ textAlign: "start", paddingLeft: 20, border: "dotted 1px gray", color: "whitesmoke" }}>
        {selectedCourse.lesson2 && selectedCourse.lesson2.map((part, index) => (
  <p key={index} style={{ display: 'block', marginBottom: '10px' , marginLeft:20 }}>{part}</p>
         ))}
          </p>
        <Button variant="secondary" onClick={goBack}>
          {"<= Previous course"}
        </Button>
        <Button variant="light" onClick={goToNext}>
          {"Next course =>"}
        </Button>
      </div>
    </>
  );
}

export default CourseDetails;
