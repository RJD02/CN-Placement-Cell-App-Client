import { IStudent } from "./Students";
import { useEffect, useState } from "react";
import { IInterview } from "./Interviews";
import makeRequest from "../utils/makeRequest";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "./Layout";
import Table from "../components/Table";
import Modal from "../components/Modal/Modal";
import CreateStudent from "./CreateStudent";
import { getFromLocalStorage } from "../utils/getFromLocalStorage";

interface IResultForInterviewWithStudentId {
  _id: string;
  interview: IInterview;
  result: string;
  student: string;
}

interface IStudentDetails {
  name: string;
  college: string;
  batch: string;
  status: string;
  scores: {
    DSAFinalScore: number;
    WebDFinalScore: number;
    ReactFinalScore: number;
  };
}
const Student = () => {
  const details = getFromLocalStorage();
  const navigate = useNavigate();
  const { id } = useParams();
  const [student, setStudent] = useState<IStudentDetails>({
    name: "",
    college: "",
    batch: "",
    status: "not_placed",
    scores: { DSAFinalScore: 0, WebDFinalScore: 0, ReactFinalScore: 0 },
  });
  const [interviews, setInterviews] = useState<IInterview[]>([]);
  const [isModalActive, setIsModalActive] = useState(false);

  useEffect(() => {
    if (!details || !details.isLoggedIn) {
      navigate("/login");
      return;
    }
    const fetchStudent = async () => {
      const data = await makeRequest("/student/" + id);
      if(!data) return;
      setStudent(data.data[0]);
    };
    fetchStudent();
    const fetchInterviews = async () => {
      const data = await makeRequest("/result/" + id + "/interviews");
      if(!data) return;
      let interviewData = data.data.map(
        (b: IResultForInterviewWithStudentId) => b.interview
      );
      interviewData = interviewData.map((b: IInterview) => {
        const date = new Date(b.dateOfInterview);
        const dateOfInterview = `${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()}`;
        return { ...b, dateOfInterview };
      });
      setInterviews(interviewData);
    };
    fetchInterviews();
  }, [id]);
  const editHandler = () => {
    console.log(student);
    setIsModalActive(true);
  };
  return (
    <Layout>
      <div className="student-details">
        <h1 className="text-2xl mt-8">{student?.name}</h1>
        <h4 className="text-blue-600 text-xl mt-1">{student?.college}</h4>
        <h5 className="text-gray-700 mt-1">Batch: {student?.batch}</h5>
        <h6 className="mt-1">
          Placement status:{" "}
          <span className="text-green-700">{student?.status}</span>
        </h6>
        <button
          onClick={editHandler}
          className="bg-gray-700 text-white rounded px-2 py-1 mt-2 cursor-pointer"
        >
          Edit
        </button>
      </div>
      <div className="interviews mt-4">
        <h3 className="text-xl">Interviews enrolled in</h3>
        {interviews.length > 0 && (
          <Table
            headers={["companyName", "position", "dateOfInterview"]}
            data={interviews}
            route="interviews"
          />
        )}
      </div>
      <CreateStudent
        state={isModalActive}
        setState={setIsModalActive}
        initialState={{
          name: student.name,
          college: student?.college,
          batch: student?.batch,
          status: student?.status,
          ReactFinalScore: student.scores.ReactFinalScore,
          WebDFinalScore: student.scores.WebDFinalScore,
          DSAFinalScore: student.scores.DSAFinalScore,
        }}
      />
    </Layout>
  );
};

export default Student;
