import "./Navbar.css"
function Navbar() {
  return (
    <nav class="navbar fixed-top bg-success ">
      <div class="container-fluid  ">
        <a class="navbar-brand "><h1 id="navHead">FooBar</h1></a>
        <form class="d-flex" role="search">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search FooBar"
            aria-label="Search"
          />
          <button class="btn btn-outline-light" type="submit">
            Search
          </button>
        </form>
      </div>
    </nav>
  );
}
export default Navbar;
