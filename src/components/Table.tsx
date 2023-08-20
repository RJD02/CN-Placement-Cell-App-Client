import { Link } from "react-router-dom";
import { IInterview } from "../pages/Interviews";
import { IStudent } from "../pages/Students";

interface IstudentTableProps {
  headers: string[];
  data: IStudent[] | IInterview[];
  className?: string;
  route: string
}
const Table = (props: IstudentTableProps) => {
  return (
    <table className={`table-auto w-full text-center my-8 ${props.className}`}>
      <thead>
        <tr>
          {props.headers.map((header) => (
            <th key={header}>{header.toUpperCase()}</th>
          ))}
          <th>UPDATE</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((d: any) => (
          <tr key={d._id}>
            {props.headers.map((header: string) => (
              <td key={header}>{d[header]}</td>
            ))}
            <td>
              <Link to={`/${props.route}/${d._id}`} className="underline text-blue-700">Update</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
