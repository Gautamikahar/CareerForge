import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaBriefcase } from "react-icons/fa";

function Navbar() {

  const { token, user, logout } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {

    logout();

    navigate("/login");

  };

  return (

    <nav className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white shadow-lg sticky top-0 z-50">

      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">

        {/* Logo */}

        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold"
        >
          <FaBriefcase />
          CareerForge
        </Link>

        {/* Navigation */}

        <div className="flex items-center gap-6">

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "font-bold underline"
                : ""
            }
          >
            Home
          </NavLink>

          {/* Student Links */}

          {user?.role === "student" && (

            <>

              <NavLink
                to="/jobs"
                className={({ isActive }) =>
                  isActive
                    ? "font-bold underline"
                    : ""
                }
              >
                Jobs
              </NavLink>

              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "font-bold underline"
                    : ""
                }
              >
                Dashboard
              </NavLink>

            </>

          )}

          {/* Recruiter Links */}

          {user?.role === "recruiter" && (

            <>

              <NavLink
                to="/post-job"
                className={({ isActive }) =>
                  isActive
                    ? "font-bold underline"
                    : ""
                }
              >
                Post Job
              </NavLink>

              <NavLink
                to="/recruiter-dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "font-bold underline"
                    : ""
                }
              >
                Recruiter Dashboard
              </NavLink>

              <NavLink
  to="/ai"
  className={({ isActive }) =>
    isActive ? "font-bold underline" : ""
  }
>
  AI Center
</NavLink>

            </>

          )}

          {/* Login/Register */}

          {!token ? (

            <>

              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "font-bold underline"
                    : ""
                }
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive
                    ? "font-bold underline"
                    : ""
                }
              >
                Register
              </NavLink>

            </>

          ) : (

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
            >
              Logout
            </button>

          )}

        </div>

      </div>

    </nav>

  );

}

export default Navbar;