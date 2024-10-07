import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "../Redux/action";
//import { useState } from "react";
import Button from "react-bootstrap/Button";

function DashBoard() {
  const dispatch = useDispatch();
  const cours = useSelector((state) => state.cours);
  console.log(cours);
  //const [Courses, setCourses] = useState(false);

  const showCours = () => {
    //setCourses(true);
    dispatch(getCourses());
  };

  // useEffect(() => {
  //     if (Courses) {
  //         dispatch(getCourses());
  //     }
  // }, [Courses , dispatch]);

  console.log(cours);
  return (
    <>
      <Button onClick={showCours}>lessons</Button>

      <p>
        {cours.map((element , index) =>(
            <div key={index}
            {...element}>
              {element.title} , {element.lesson} , {element.video} , {element.image} 
            </div>)
          ) }
      </p>
      <h2>lessons</h2>
    </>
  );
}

export default DashBoard;
