import { useDispatch, useSelector } from "react-redux";
import { showStudentResponse } from "../Redux/action";
import { useEffect } from "react";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

function Correction() {
    const theResponse = useSelector((state) => state.response); 
    const theCurrentUser = useSelector((state) => state.user);
    const theCheckPoint = useSelector((state) => state.checkPoint);
    console.log(theCheckPoint)
    const theCheckPointCorrectAnswer = theCheckPoint.map((checkpoint)=> checkpoint.correctAnswer)
   const dispatch = useDispatch();
   console.log(theCheckPointCorrectAnswer)
  useEffect(() => {
    
    dispatch(showStudentResponse(theCurrentUser.userName))
  }, [dispatch, theCurrentUser.userName]);

  
  
  return (
    <>
      <Table striped bordered hover variant="dark" style={{width : "97%"}}>
        <thead>
          <tr>
            <th>#</th>
            <th>Question</th>
            <th>Responses</th>
            <th>Right answer</th>
            <th>Correction</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(theCheckPoint) &&
            theCheckPoint.map((el, index) => {
                const studentResponse = theResponse.studentResponses && theResponse.studentResponses[index] ? theResponse.studentResponses[index] : []
              return (
                <tr key={el._id}>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    {index + 1}
                  </td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    {el.question}
                  </td>
                  <td>
                    <Form>
                      {el.options.map((option, index) => {
                        const isStudentResponse = studentResponse.includes(option);
                        return (
                        <div key={index} className="mb-3">
                          <Form.Check
                            type="checkbox"
                            id={`default-checkbox-${index}`}
                            label={option}
                            checked={isStudentResponse }
                          readOnly
                          />
                        </div>
                      )})}
                    </Form>
                  </td>

                  <td>
                    <Form>
                      {el.options.map((option, index) => {
                        const correctAnswer = el.correctAnswer.includes(option);
                        return (
                        <div key={index} className="mb-3">
                          <Form.Check
                            type="checkbox"
                            id={`default-checkbox-${index}`}
                            label={option}
                            checked={correctAnswer}
                          readOnly
                          
                          />
                        </div>
                      )})}
                    </Form>
                  </td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                        {theCheckPointCorrectAnswer.join(', ')}
                        </td>
                </tr>
                
              );
            })}
        </tbody>
      </Table>
      
    </>
  );
}
export default Correction;
