import { useLocation } from "react-router-dom";
import Navbar from "../PostFeed/Navbar/Navbar";
import "./UserProfile.css";
import { serverURL } from "../userService";
import { useEffect, useState } from "react";
import Post from "../PostFeed/Post/Post";
function UserProfile() {

  const [userPosts, setUserPosts] = useState([]);
  const location = useLocation();

  const { userString } = location.state;
  const profileUser = JSON.parse(userString);
  console.log(profileUser);

  useEffect(() => {
    getUserPosts();
    
  }, []);

  const getUserPosts = async () => {
    const token = sessionStorage.getItem("jwt");
    const res = await fetch(serverURL + `/api/users/${profileUser.username}/posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const posts = await res.json();
    setUserPosts(posts);
  };


  const listOfPosts = userPosts.map((post) => {
    return <Post post={post} id={post.id} />;
  });

  return (
    <>
      <Navbar />
      <div className="row justify-content-center">
        <div className="col-6">
          <div className="container d-flex align-items-center">
            <img alt="avatar1"src={profileUser.profilePic} className="round-image" />
            <h5 className=" ms-2 pb-4" id="profile-displat-name">
            {profileUser.displayName}
            </h5>
          </div>
          {listOfPosts}
        </div>
      </div>
    </>
  );
}
export default UserProfile;
