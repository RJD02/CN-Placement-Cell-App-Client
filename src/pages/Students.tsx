import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../components/Table";
import { getFromLocalStorage } from "../utils/getFromLocalStorage";
import makeRequest from "../utils/makeRequest";
import CreateStudent from "./CreateStudent";
import Layout from "./Layout";

export interface IStudent {
  name: string;
  college: string;
  batch: string;
  status: string;
  _id: string;
}

const Students = () => {
  const navigate = useNavigate();
  const details = getFromLocalStorage();
  const [students, setStudents] = useState<IStudent[]>([]);
  const [isAddStudentClicked, setIsAddStudentClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
      if(!details || !details.isLoggedIn) {
          navigate('/login');
          return;
      }
    const getStudents = async () => {
      const data = await makeRequest("/student");
      setStudents(data.data);
      setIsLoading(false);
    };
    getStudents();
  }, [details, navigate]);
  const addStudentHandler = () => {
    setIsAddStudentClicked(true);
  };
  return (
    <Layout>
      <div className="flex justify-between mt-4 items-center ">
        <h1 className="text-2xl">All students</h1>
        <div
          onClick={addStudentHandler}
          className="add-student flex items-center rounded bg-blue-300 px-2 py-1"
        >
          <i className="fa-solid fa-lg fa-plus mr-2"></i>
          <p className="text-lg cursor-pointer">Add student</p>
        </div>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Table
          headers={["name", "college", "batch", "status"]}
          data={students}
          route="students"
        />
      )}
      {isAddStudentClicked && (
        <CreateStudent
          state={isAddStudentClicked}
          setState={setIsAddStudentClicked}
        />
      )}
    </Layout>
  );
};

export default Students;
