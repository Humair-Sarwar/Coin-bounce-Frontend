import { NavLink, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CustomizedSwitches from "../DarkWhiteMode/DarkWhiteMode";
import Login from "../../pages/Login/Login";
import Signup from "../../pages/Signup/Signup";
import { useDispatch, useSelector } from "react-redux";
import { logoutApi } from "../../api/internal";
import { resetUser } from "../../store/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.auth);
  const handleLogout = async () => {
    const response = await logoutApi();
    if(response.status == 200){
      dispatch(resetUser());
      navigate('/')
      
    }
  }
  let switchCheck = useSelector(state=>state.switchCheck)
  return (
    <div className="nav-container" style={{background: (switchCheck ? 'white' : '')}}>
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "activeStyle" : "unActiveStyle"
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/cryptocurrencies"
            className={({ isActive }) =>
              isActive ? "activeStyle" : "unActiveStyle"
            }
          >
            Cryptocurrencies
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/blog"
            className={({ isActive }) =>
              isActive ? "activeStyle" : "unActiveStyle"
            }
          >
            Blog
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/submit-blog"
            className={({ isActive }) =>
              isActive ? "activeStyle" : "unActiveStyle"
            }
          >
            Submit A Blog
          </NavLink>
        </li>
        <li>
          {isAuthenticated ? (
            <div>
              <Button onClick={handleLogout} size="small" variant="contained" color="error">
                Logout
              </Button>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Login />
              <Signup />
            </div>
          )}
        </li>
        <li>
          <CustomizedSwitches />
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
