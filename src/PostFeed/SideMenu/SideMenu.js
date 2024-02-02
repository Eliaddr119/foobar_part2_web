import "./SideMenu.css";

function SideMenu() {
  return (
    <ul class="list-group-flush ">
      <li class="list-group-item d-flex align-items-start ms-3  pt-4 pb-4 mt-50">
      <i class="ps-2 bi bi-search"></i>
      <input type="email" class="form-control form-control-lg ms-2" id="searchResult" placeholder="Search FooBar" control-id="ControlID-52"/>
      </li>
      <li class="list-group-item d-flex align-items-start ms-3  pt-4 pb-4 ">
        <i class="ps-2  bi bi-person-circle"></i>
        <span className="ms-3 fs-3">Your Profile</span>
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
    </ul>
  );
}

export default SideMenu;
