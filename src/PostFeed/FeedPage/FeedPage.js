import Post from "../Post/Post";
import SideMenu from "../SideMenu/SideMenu";
import posts from "./posts.json";
import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import WritePost from "../Post/WritePost";

function FeedPage() {
  const [postsList, setPostsList] = useState(posts);

  return (
    <div className="container-fluid" id="feedContainer">
      <div className="row">
        <Navbar />
      </div>

      <div className="row mt-5">
        <div className="col-3"  id="sideCol">
          <div className>
            <SideMenu />
          </div>
        </div>
        <div class="col-6  ">
          <div className="row">
            <WritePost/>
          </div>
          {postsList.map((post) => (
            <Post {...post} />
          ))}
        </div>
      </div>
    </div>
  );
}
export default FeedPage;
