import { Link } from "react-router-dom";
import { IUser } from "../pages/Approve";
import { IInterview } from "../pages/Interviews";
import { IStudent } from "../pages/Students";

interface IstudentTableProps {
  headers: string[];
  data: IStudent[] | IInterview[] | IUser[];
  className?: string;
  route: string;
  lastColText?: string,
}

const Table = (props: IstudentTableProps) => {
  return (
    <table className={`table-auto w-full text-center my-8 ${props.className}`}>
      <thead>
        <tr>
          {props.headers.map((header) => (
            <th key={header}>{header.toUpperCase()}</th>
          ))}
          <th>{props.lastColText}</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((d: any) => (
          <tr key={d._id}>
            {props.headers.map((header: string) => (
              <td key={header}>{d[header]}</td>
            ))}
            <td>
              <Link
                to={`/${props.route}/${d._id}`}
                className="underline text-blue-700"
              >
                {props.lastColText || 'update'}
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
