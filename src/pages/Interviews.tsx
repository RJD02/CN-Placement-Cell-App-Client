import Layout from "./Layout";
import { useState, useEffect } from "react";
import makeRequest from "../utils/makeRequest";
import { Link } from "react-router-dom";

interface IInterview {
  companyName: string;
  position: string;
  dateOfInterview: Date;
  _id: string;
}

const Interviews = () => {
  const [interviews, setInterviews] = useState<IInterview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getInterviews = async () => {
      const data = await makeRequest("/interview");
      setInterviews(data.data);
      setIsLoading(false);
    };
    getInterviews();
  }, []);
  return (
    <Layout>
      <div className="flex justify-between mt-4 items-center">
        <h1 className="text-2xl">All Interviews</h1>
        <div className="add-interview cursor-pointer py-1 flex items-center rounded bg-blue-300 px-2">
          <i className="fa-solid fa-lg fa-plus mr-1"></i>
          <p className="text-lg">Add interview</p>
        </div>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="table-auto w-full text-center mt-4">
          <thead>
            <tr>
              <th>Company</th>
              <th>Position</th>
              <th>Date of Interview</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {interviews.map((interview) => (
              <tr>
                <td>{interview.companyName}</td>
                <td>{interview.position}</td>
                <td>{`${new Date(interview.dateOfInterview).getDate()}/${
                  new Date(interview.dateOfInterview).getMonth() + 1
                }/${new Date(interview.dateOfInterview).getFullYear()}`}</td>
                <td>
                  <Link className="underline text-blue-400" to={`/interviews/${interview._id}`}>Update</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
};

export default Interviews;
