import React from "react";
import "./Navbar.scss";
import Avatar from "../avatar/Avatar";
import { useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
// import { RxHamburgerMenu } from "react-icons/rx";
import { useSelector } from "react-redux";
import { axiosClient } from "../../utils/axiosClient";
import { KEY_ACCESS_TOKEN, removeItem } from "../../utils/localStorageManager";
// import Sidebar from "../sidebar/Sidebar";

function Navbar() {
  const navigate = useNavigate();
  // const [openSidebar, setOpenSidebar] = useState(false);
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);

  async function handleLogoutClicked() {
    try {
      await axiosClient.get("auth/logout");
      removeItem(KEY_ACCESS_TOKEN);
      navigate("/login");
    } catch (error) {
      return
    }
  }

  return (
    <>
      <div className="Navbar">
        <div className="container">
          <h2 className="banner hover-link" onClick={() => navigate("/")}>
            Social Media
          </h2>
          <div className="right-side">
            <div
              className="profile hover-link"
              onClick={() => navigate(`/profile/${myProfile?._id}`)}
            >
              <Avatar src={myProfile?.avatar?.url} />
            </div>
            <div className="logout hover-link" onClick={handleLogoutClicked}>
              <AiOutlineLogout />
            </div>
            {/* <div className="sidebar">
              <RxHamburgerMenu onClick={() => setOpenSidebar(!openSidebar)} />
            </div> */}
          </div>
        </div>
      </div>
      {/* {openSidebar && <Sidebar onClose={() => setOpenSidebar(false)} />} */}
    </>
  );
}

export default Navbar;
