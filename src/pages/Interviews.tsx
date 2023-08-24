import Layout from "./Layout";
import { useState, useEffect } from "react";
import makeRequest from "../utils/makeRequest";
import { Link } from "react-router-dom";
import CreateInterview from "../components/CreateInterview";
import Table from "../components/Table";

export interface IInterview {
  companyName: string;
  position: string;
  dateOfInterview: Date | string;
  _id?: string;
}

const Interviews = () => {
  const [interviews, setInterviews] = useState<IInterview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddInterviewClicked, setIsAddInterviewClicked] = useState(false);

  const addInterviewHandler = () => {
    console.log("Clicked");
    setIsAddInterviewClicked(true);
  };

  useEffect(() => {
    const getInterviews = async () => {
      const data = await makeRequest("/interview");
      if(!data) return;
      const studentData = data.data.map((d: IInterview) => {
        const date = new Date(d.dateOfInterview);
        return {
          ...d,
          dateOfInterview: `${date.getDate()}/${
            date.getMonth() + 1
          }/${date.getFullYear()}`,
        };
      });
      setInterviews(studentData);
      setIsLoading(false);
    };
    getInterviews();
  }, [isAddInterviewClicked]);

  return (
    <Layout>
      <div className="flex justify-between mt-4 items-center relative">
        <h1 className="text-2xl">All Interviews</h1>
        <div
          onClick={addInterviewHandler}
          className="add-interview cursor-pointer py-1 flex items-center rounded bg-blue-300 px-2"
        >
          <i className="fa-solid fa-lg fa-plus mr-1"></i>
          <p className="text-lg">Add interview</p>
        </div>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Table
          headers={["companyName", "position", "dateOfInterview"]}
          data={interviews}
          route="interviews"
        />
      )}
      {isAddInterviewClicked && (
        <CreateInterview
          state={isAddInterviewClicked}
          setState={setIsAddInterviewClicked}
        />
      )}
    </Layout>
  );
};

export default Interviews;
