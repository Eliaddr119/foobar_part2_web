import "./Navbar.css"
function Navbar() {
  return (
    <nav className="navbar fixed-top bg-success ">
      <div className="container-fluid  ">
        <a className="navbar-brand "><h1 id="navHead">FooBar</h1></a>
        <form className="d-flex" role="search">
          <input
            classNameName="form-control me-2"
            type="search"
            placeholder="Search FooBar"
            aria-label="Search"
          />
          <button className="btn btn-outline-light" type="submit">
            Search
          </button>
        </form>
      </div>
    </nav>
  );
}
export default Navbar;
