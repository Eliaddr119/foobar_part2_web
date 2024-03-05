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
    getCurrentUser();
    getPosts();
  }, []);

  const [postsList, setPostsList] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState("light");
  const [isChecked, setIsChecked] = useState(false);

  const handleSwitchChange = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      setIsDarkMode("dark");
    } else {
      setIsDarkMode("light");
    }
  };

  const getPosts = async () => {
    const token = localStorage.getItem("jwt");
    const res = await fetch(serverURL + "/api/posts", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const posts = await res.json();
    setPostsList(posts);
  };

  const getCurrentUser = async () => {
    const token = localStorage.getItem("jwt");
    const username = localStorage.getItem("username");
    const res = await fetch(serverURL + `/api/users/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const currentUser = await res.json();
    localStorage.setItem(currentUser,"currentUser");
  };

  const listOfPosts = postsList.map((post) => {
    return (
      <Post
        post={post}
        key={post.id}
        postsList={postsList}
        setPostsList={setPostsList}
      />
    );
  });

  return (
    <body data-bs-theme={isDarkMode}>
      <Navbar />
      <div className="row mt-5"></div>
      <div className="row mt-5 mb-5"></div>
      <div className="row mt-5 mb-5 ">
        <div className="col-3" id="sideCol">
          <div className>
            <SideMenu />
          </div>
        </div>

        <div class="col-6" id="postCol">
          <WritePost postsList={postsList} setPostsList={setPostsList} />
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
