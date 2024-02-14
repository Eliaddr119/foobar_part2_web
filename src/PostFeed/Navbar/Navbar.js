import "./Navbar.css"
function Navbar() {
  return (
    <nav className="navbar fixed-top bg-success ">
      <div className="container-fluid  ">
        <a className="navbar-brand "><h1 id="navHead">FooBar</h1></a>
        <form className= " me-2 form-control-lg" type="text" placeholder=".form-control-lg" aria-label=".form-control-lg example" role="search" id="formBar">
          <input
            type="search"
            placeholder="Search FooBar"
            aria-label="Search"
            id="searchBar"
          />
          <button className="btn btn-outline-light">
            Search
          </button>
        </form>
      </div>
    </nav>
  );
}
export default Navbar;
