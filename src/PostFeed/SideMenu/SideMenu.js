import { useState } from "react";
import "./SideMenu.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function SideMenu({currentUsr}) {
  useEffect(() => {
  }, [currentUsr]);

  const navigate = useNavigate();
  
  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  }

  const handleProfileNavigate = () => {
      navigate('/UserProfile', { state: { userString: JSON.stringify(currentUsr) } });
  };
  


  return (
    <div className="container-fluid" id="sideMenu">
      <ul className="list-group-flush">
        <li className="list-group-item d-flex align-items-start ms-3  pt-4 pb-4 " onClick={handleProfileNavigate} >
          <img
            className="rounded-circle"
            alt="avatar1"
            src={currentUsr.profilePic}
            id="profilePic"
          />
          <span className="ms-3 fs-3">{currentUsr.displayName}</span>
        </li>
        <li class="list-group-item d-flex align-items-start ms-3 pt-4 pb-4">
          <i class="ps-2 bi bi-house-fill"></i>
          <span className="ms-3 fs-3">Home</span>
        </li>
        <li class="list-group-item d-flex align-items-start ms-3  pt-4 pb-4">
          <i class="ps-2 bi bi-people-fill"></i>
          <span className="ms-3 fs-3"> Groups</span>
        </li>
        <li class="list-group-item d-flex align-items-start ms-3  pt-4 pb-4">
          <i class=" ps-2bi bi-shop"></i>
          <span className="ms-3 fs-3">Marketplace</span>
        </li>
        <li class="list-group-item d-flex align-items-start ms-3  pt-4 pb-4">
        <button className="btn btn-danger" onClick={handleLogout}>Log Out</button>
        </li>
      </ul>
    </div>
  );
}


export default SideMenu;
