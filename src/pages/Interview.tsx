import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IInterview } from "./Interviews";
import makeRequest from "../utils/makeRequest";
import Layout from "./Layout";
import { IStudent } from "./Students";
import Table from "../components/Table";

interface IResultForStudentsWithInterviewId {
  _id: string;
  interview: string;
  result: string;
  student: IStudent;
}

const Interview = () => {
  const [interview, setInterview] = useState<IInterview>();
  const [students, setStudents] = useState<IStudent[]>([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchInterview = async () => {
      const data = await makeRequest("/interview/" + id);
      if(!data) return;
      const dateOfInterview = new Date(data.data.dateOfInterview);
      const date = `${dateOfInterview.getDate()}/${
        dateOfInterview.getMonth() + 1
      }/${dateOfInterview.getFullYear()}`;
      setInterview({ ...data.data, dateOfInterview: date });
    };

    const fetchStudents = async () => {
      const data = await makeRequest("/result/" + id + "/students");
      if(!data) return ;
      setStudents(
        data.data.map((b: IResultForStudentsWithInterviewId) => b.student)
      );
    };

    fetchInterview();
    fetchStudents();
  }, [id]);
  return (
    <Layout>
      <div className="interview-details">
        <h1 className="text-2xl mt-8">{interview?.companyName}</h1>
        <h4 className="text-blue-600 text-xl mt-1">{interview?.position}</h4>
        <h5 className="text-gray-700 mt-1">
          {interview?.dateOfInterview.toString()}
        </h5>
      </div>
      <div className="students mt-4">
          <h3 className="text-xl">Students assigned to interview</h3>
        {students.length > 0 && (
          <Table
            headers={["name", "college", "status", "batch"]}
            data={students}
            route="students"
          />
        )}
      </div>
    </Layout>
  );
};

export default Interview;
