import Post from "../Post/Post";
import SideMenu from "../SideMenu/SideMenu";
import posts from "./posts.json";
import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom"; 
import WritePost from "../Post/WritePost";

function FeedPage() {
  const navigate = useNavigate();
  useEffect(effect => {
    if (sessionStorage.getItem("current_usr") == null) {
      navigate("/");
    }
  }, []);

  const [postsList, setPostsList] = useState(posts);
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

  const listOfPosts = postsList.map((post) => {
    return <Post post={post} key={post.id} postsList={postsList} setPostsList={setPostsList} />;
  });

  
  if (sessionStorage.getItem("current_usr") != null) {
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
}
export default FeedPage;
