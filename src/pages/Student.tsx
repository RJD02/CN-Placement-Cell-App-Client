import { IStudent } from "./Students";
import { useEffect, useState } from "react";
import { IInterview } from "./Interviews";
import makeRequest from "../utils/makeRequest";
import { useParams } from "react-router-dom";
import Layout from "./Layout";
import Table from "../components/Table";

interface IResultForInterviewWithStudentId {
  _id: string;
  interview: IInterview;
  result: string;
  student: string;
}

const Student = () => {
  const { id } = useParams();
  const [student, setStudent] = useState<IStudent>();
  const [interviews, setInterviews] = useState<IInterview[]>([]);

  useEffect(() => {
    const fetchStudent = async () => {
      const data = await makeRequest("/student/" + id);
      setStudent(data.data);
    };
    fetchStudent();
    const fetchInterviews = async () => {
      const data = await makeRequest("/result/" + id + "/interviews");
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
    </Layout>
  );
};

export default Student;
