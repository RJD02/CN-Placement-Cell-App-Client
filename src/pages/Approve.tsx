import { getFromLocalStorage } from "../utils/getFromLocalStorage";
import { useEffect, useState } from "react";
import makeRequest from "../utils/makeRequest";
import Table from "../components/Table";
import Layout from "./Layout";
import { useNavigate } from "react-router-dom";

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
  const details = getFromLocalStorage();
  const navigate = useNavigate();
  useEffect(() => {
      if(!details || !details.isLoggedIn || !details.isAdmin) {
          navigate('/login');
          return;
      }
    const fetchUnApprovedUsers = async () => {
      const data = await makeRequest("/user/unapproved");
      if (!data) return;
      setUnApprovedUsers(data.data);
    };
    fetchUnApprovedUsers();
  }, []);
  const approveHandler = async (id: string) => {
    const response = await makeRequest("/user/" + id + "/approve");
    if (!response) return;
    window.location.reload();
  };
  return (
    <Layout>
      <h1>Hello admin</h1>
      <h2>Approve a user</h2>
      <table className={`table-auto w-full text-center my-8 `}>
        <thead>
          <tr>
            {["email", "name", "batch"].map((header) => (
              <th key={header}>{header.toUpperCase()}</th>
            ))}
            <th>Approve</th>
          </tr>
        </thead>
        <tbody>
          {unApprovedUsers.map((d: any) => (
            <tr key={d._id}>
              {["email", "name", "batch"].map((header: string) => (
                <td key={header}>{d[header]}</td>
              ))}
              <td>
                <p
                  onClick={() => approveHandler(d._id)}
                  className="underline text-blue-500 pointer-cursor"
                >
                  Approve
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Approve;
