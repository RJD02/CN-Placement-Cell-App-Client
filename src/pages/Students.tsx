import { useEffect, useState } from "react";
import { getFromLocalStorage } from "../utils/getFromLocalStorage";
import makeRequest from "../utils/makeRequest";
import Layout from "./Layout";

interface IStudent {
  name: string;
  college: string;
  batch: string;
  status: string;
  _id: string;
}

const Students = () => {
  const [students, setStudents] = useState<IStudent[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getStudents = async () => {
      const data = await makeRequest("/student");
      setStudents(data.data);
      setIsLoading(false);
    };
    getStudents();
  }, []);
  return (
    <Layout>
      <div className="flex justify-between mt-4">
        <h1 className="text-2xl mt-4">All students</h1>
        <div className="add-student flex items-center rounded bg-blue-300 px-2">
          <i className="fa-solid fa-lg fa-plus mr-2"></i>
          <p className="text-lg">Add student</p>
        </div>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="table-auto w-full text-center">
          <thead>
            <tr>
              <th>Name</th>
              <th>College</th>
              <th>batch</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr>
                <td>{student.name}</td>
                <td>{student.college}</td>
                <td>{student.batch}</td>
                <td>{student.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
};

export default Students;
