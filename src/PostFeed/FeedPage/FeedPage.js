import Post from "../Post/Post";
import SideMenu from "../SideMenu/SideMenu";
import posts from "./posts.json";
import { useState } from "react";
import Navbar from "../Navbar/Navbar";

function FeedPage() {
  const [postsList, setPostsList] = useState(posts);


  return (
    <div className="container-fluid">
      <div className="row">
        <Navbar />
      </div>
      <div className="row mt-5">
        <div className="col-3  ">
          <div className>
            <SideMenu />
          </div>
        </div>
        <div class="col-6  ">
          {postsList.map((post) => (
            <Post {...post} />
          ))}
        </div>
      </div>
    </div>
  );
}
export default FeedPage;
