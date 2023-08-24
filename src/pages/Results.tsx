import Layout from "./Layout";
import { useState, useEffect, ChangeEvent } from "react";
import { IStudent } from "./Students";
import { IInterview } from "./Interviews";
import makeRequest from "../utils/makeRequest";
import { useNavigate } from "react-router-dom";
import { getFromLocalStorage } from "../utils/getFromLocalStorage";

interface IResult {
  studentId: string;
  interviewId: string;
}

const Results = () => {
  const details = getFromLocalStorage();
  const [students, setStudents] = useState<IStudent[]>([]);
  const [interviews, setInterviews] = useState<IInterview[]>([]);
  const [resultState, setResultState] = useState<IResult>({
    studentId: "",
    interviewId: "",
  });
  const [warningMessage, setWarningMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!details || !details.isLoggedIn) {
      navigate("/login");
      return;
    }
    const getStudents = async () => {
      const data = await makeRequest("/student");
      setStudents(data.data);
    };
    getStudents();
    const getInterviews = async () => {
      const data = await makeRequest("/interview");
      setInterviews(data.data);
    };
    getInterviews();
  }, [details, navigate]);

  const studentChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setResultState({ ...resultState, studentId: e.target.value });
  };

  const interviewChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setResultState({ ...resultState, interviewId: e.target.value });
  };

  const submitHandler = async () => {
    const data = await makeRequest("/result", {
      method: "POST",
      body: JSON.stringify({
        student: resultState.studentId,
        interview: resultState.interviewId,
      }),
    });
    console.log(data);
    if (data === null) {
      setWarningMessage("Student is already set for this interview");
    } else {
      navigate("/interviews");
    }
  };

  return (
    <Layout>
      <h1>Create a new result</h1>
      <div className="flex justify-evenly items-center">
        <div className="interview">
          <label className="mr-2" htmlFor="interviews">
            Choose an interview
          </label>
          <select
            name="interviews"
            id="interviews"
            onChange={interviewChangeHandler}
          >
            {interviews.map((interview) => (
              <option value={interview._id}>
                {interview.companyName}, {interview.position}
              </option>
            ))}
          </select>
        </div>
        <div className="students">
          <label htmlFor="students" className="mr-2">
            Choose a student
          </label>
          <select name="students" id="students" onChange={studentChangeHandler}>
            {students.map((student) => (
              <option value={student._id}>{student.name}</option>
            ))}
          </select>
        </div>
        <button
          className="cursor-pointer bg-blue-300 rounded px-2 py-1"
          onClick={submitHandler}
        >
          Submit
        </button>
      </div>
      {warningMessage.length > 0 && (
        <p className="text-red-500 text-xl">Warning: {warningMessage}</p>
      )}
    </Layout>
  );
};
export default Results;
