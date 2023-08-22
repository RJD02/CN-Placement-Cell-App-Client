import { getFromLocalStorage } from "../utils/getFromLocalStorage";
import { useEffect, useState } from "react";
import makeRequest from "../utils/makeRequest";
import Table from "../components/Table";
import Layout from "./Layout";

export interface IUser {
  _id: string;
  name: string;
  batch: string;
  password: string;
  isAdmin: boolean;
  isApproved: boolean;
  email: string;
}

const Approve = () => {
  const [unApprovedUsers, setUnApprovedUsers] = useState<IUser[]>([]);
  useEffect(() => {
    const fetchUnApprovedUsers = async () => {
      const data = await makeRequest("/user/unapproved");
      setUnApprovedUsers(data.data);
    };
    fetchUnApprovedUsers();
  }, []);
  const details = getFromLocalStorage();
  if (!details.isAdmin) {
    return <div>Approve</div>;
  }
  return (
    <Layout>
      <h1>Hello admin</h1>
      <h2>Approve a user</h2>
      <Table
        headers={["email", "name", "batch"]}
        data={unApprovedUsers}
        route="approve"
      />
    </Layout>
  );
};

export default Approve;
