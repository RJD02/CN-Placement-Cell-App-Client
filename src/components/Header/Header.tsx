import { Link } from "react-router-dom";
import { getFromLocalStorage } from "../../utils/getFromLocalStorage";

const Header = () => {
  const details = getFromLocalStorage();

  const downloadStudentData = async () => {
    const response = await fetch("http://localhost:8000/result/download", {
      headers: { Authorization: `Bearer ${details.token}` },
    });
    console.log(response);
    const blob = await response.blob();
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = "student-report.csv";
    a.click();
  };
  return (
    <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-2xl">Placement Ninjas</h1>
      <div className="actions flex justify-between">
        <Link to="/login" className="mr-2 text-xl">
          Login
        </Link>
        {details.isLoggedIn && details.isApproved && (
          <>
            <Link to="/students" className="mr-2 text-xl">
              Students
            </Link>
            <Link to="/interviews" className="mr-2 text-xl">
              Interviews
            </Link>
            {details.isAdmin && (
              <Link to="/approve" className="mr-2 text-xl">
                Approve
              </Link>
            )}
            <p
              className="mr-2 text-xl cursor-pointer"
              onClick={downloadStudentData}
            >
              Report
            </p>
            <Link to="/result" className="mr-2 text-xl">
              Result
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
