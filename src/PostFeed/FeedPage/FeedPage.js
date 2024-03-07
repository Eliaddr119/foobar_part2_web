import Post from "../Post/Post";
import SideMenu from "../SideMenu/SideMenu";
import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import WritePost from "../Post/WritePost";
import { serverURL } from "../../userService";

function FeedPage() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/FeedPage") {
      getCurrentUser();
      getPosts();

    }
  }, [location]);

  const [postList, setPostList] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState("light");
  const [isChecked, setIsChecked] = useState(false);
  const [currentUser,setCurrentUser] = useState(null);

  const handleSwitchChange = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      setIsDarkMode("dark");
    } else {
      setIsDarkMode("light");
    }
  };

  const getPosts = async () => {
    const token = sessionStorage.getItem("jwt");
    const res = await fetch(serverURL + "/api/posts", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const posts = await res.json();
    setPostList(posts);
    
  };

  const getCurrentUser = async () => {
    const token = sessionStorage.getItem("jwt");
    const username = sessionStorage.getItem("username");
    const res = await fetch(serverURL + `/api/users/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const currentUser = await res.json();
    const userObject = {
      username: currentUser.username,
      displayName: currentUser.displayName,
      profilePic: currentUser.profilePic,
    };
    const userString = JSON.stringify(userObject);
    sessionStorage.setItem("currentUser", userString);
    setCurrentUser(userObject);
  };

  const listOfPosts = postList.map((post) => {
    return <Post post={post} id={post.id} />;
  });

  return (
    <body data-bs-theme={isDarkMode}>
      <Navbar />
      <div className="row mt-1 mb-5 ">
        <div className="col-3" id="sideCol">
          <div className>
          {currentUser && <SideMenu currentUsr={currentUser}/>}
          </div>
        </div>

        <div class="col-6" id="postCol">
          <WritePost currentUser={currentUser} />
          {listOfPosts}
        </div>

        <div className="col-3" id="darkModeSwitch">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="switch"
              checked={isChecked}
              onChange={handleSwitchChange}
            />
            <label class="form-check-label" for="flexSwitchCheckDefault">
              dark Mode
            </label>
          </div>
        </div>
      </div>
    </body>
  );
}
export default FeedPage;
