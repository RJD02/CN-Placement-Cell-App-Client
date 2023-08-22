import { Link } from "react-router-dom";
import { getFromLocalStorage } from "../../utils/getFromLocalStorage";

const Header = () => {
  const details = getFromLocalStorage();
  return (
    <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-2xl">Placement Ninjas</h1>
      <div className="actions flex justify-between">
        <Link to="/login" className="mr-2 text-xl">
          Login
        </Link>
        {details.isLoggedIn && (
          <>
            <Link to="/students" className="mr-2 text-xl">
              Students
            </Link>
            <Link to="/interviews" className="mr-2 text-xl">
              Interview
            </Link>
            {details.isAdmin && (
              <Link to="/approve" className="mr-2 text-xl">
                Approve
              </Link>
            )}
            <Link to="/report" className="mr-2 text-xl">
              Report
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
