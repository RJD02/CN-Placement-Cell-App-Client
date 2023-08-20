import { useEffect, useState } from "react";
import Table from "../components/Table";
import { getFromLocalStorage } from "../utils/getFromLocalStorage";
import makeRequest from "../utils/makeRequest";
import Layout from "./Layout";

export interface IStudent {
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
      <div className="flex justify-between mt-4 items-center ">
        <h1 className="text-2xl">All students</h1>
        <div className="add-student flex items-center rounded bg-blue-300 px-2 py-1">
          <i className="fa-solid fa-lg fa-plus mr-2"></i>
          <p className="text-lg">Add student</p>
        </div>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Table
          headers={["name", "college", "batch", "status"]}
          data={students}
          route='students'
        />
      )}
    </Layout>
  );
};

export default Students;
