import "./SideMenu.css";
import { useNavigate } from "react-router-dom"; 

function SideMenu() {
  const storedUserObject = sessionStorage.getItem("currentUser");
  const currentUser = JSON.parse(storedUserObject);
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem('currentUser');
    navigate("/");
  }

  return (
    <div className="container-fluid" id="sideMenu">
      <ul class="list-group-flush">
        <li class="list-group-item d-flex align-items-start ms-3  pt-4 pb-4 ">
          <img
            className="rounded-circle"
            alt="avatar1"
            src={currentUser.image}
            id="profilePic"
          />
          <span className="ms-3 fs-3">{currentUser.displayName}</span>
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
