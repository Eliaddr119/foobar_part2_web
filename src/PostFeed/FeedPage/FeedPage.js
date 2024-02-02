import Post from "../Post/Post";
import SideMenu from "../SideMenu/SideMenu";
import posts from "./posts.json";
import { useState } from "react";

function FeedPage() {
  const [postsList, setPostsList] = useState(posts);

  return (
    <div>
      <div className="row">
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
