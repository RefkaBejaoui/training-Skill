function checkPontList() {
    const [responses, setResponses] = useState({});
  const [validationResults, setValidationResults] = useState({});

  const handleChange = (id, value) => {
    setResponses({
      ...responses,
      [id]: value
    });
  };

  const handleSubmit = () => {
    const results = {};
    questions.forEach(q => {
      results[q.id] = responses[q.id] === q.correctAnswer;
    });
    setValidationResults(results);
  };

  return (
    <div>
      {questions.map((q) => (
        <div key={q.id} className="question">
          <label htmlFor={`question-${q.id}`}>{q.question}</label>
          <select
            id={`question-${q.id}`}
            name={`question-${q.id}`}
            required={q.required}
            defaultValue={q.default}
            onChange={(e) => handleChange(q.id, e.target.value)}
          >
            {q.options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          {validationResults[q.id] !== undefined && (
            <div>
              {validationResults[q.id] ? "Correct" : "Incorrect"}
            </div>
          )}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};


export default checkPontList;
import React, { useState } from 'react';

