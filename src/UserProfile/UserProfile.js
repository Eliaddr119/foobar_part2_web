import { useLocation, useParams } from "react-router-dom";
import Navbar from "../PostFeed/Navbar/Navbar";
import "./UserProfile.css";
import { serverURL } from "../userService";
import { useEffect, useState } from "react";
import Post from "../PostFeed/Post/Post";
import FriendList from "./Friend/FriendList";
import SideMenu from "../PostFeed/SideMenu/SideMenu";
import FriendRequest from "./Friend/FriendRequestList";
import { Fade } from "react-bootstrap";

function UserProfile() {
  const [userPosts, setUserPosts] = useState([]);
  const [friendList, setFriendList] = useState([]);
  const [areFriends, setAreFriends] = useState(false);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const location = useLocation();

  const { userString } = location.state;
  const profileUser = JSON.parse(userString);
  const { username } = useParams();
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

  useEffect(() => {
    checkIfCurrentUserProfile();
    getFriends();
    if (areFriends || profileUser.username === currentUser.username) {
      getUserPosts();
    }
  }, [username]);

  const getUserPosts = async () => {
    const token = sessionStorage.getItem("jwt");
    const res = await fetch(
      serverURL + `/api/users/${profileUser.username}/posts`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const posts = await res.json();
    setUserPosts(posts);
  };

  const getFriends = async () => {
    const token = sessionStorage.getItem("jwt");
    const res = await fetch(
      serverURL + `/api/users/${profileUser.username}/friends`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (res.status === 409) {
      setAreFriends(false);
    } else {
      const friends = await res.json();
      setFriendList(friends);
      setAreFriends(true);
    }
  };

  const handleFriendAdd = async () => {
    const token = sessionStorage.getItem("jwt");
    const res = await fetch(serverURL + `/api/users/${profileUser.username}/friends`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  };

  const listOfPosts = userPosts.map((post) => {
    return <Post post={post} id={post.id} />;
  });

  const ifNoPosts = () => {
    if (areFriends && userPosts.length === 0) {
      return <h2>No posts yet</h2>;
    }
  };

  const checkIfCurrentUserProfile = () =>{
    if(currentUser.username == profileUser.username) {
      setIsCurrentUser(true);
    }
    else {
      setIsCurrentUser(false);
    }
  }
  

  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <SideMenu currentUsr={currentUser} />
          </div>
          <div className="col-6">
            <div className="container d-flex align-items-center ">
              <img
                alt=""
                src={profileUser.profilePic}
                className="round-image"
              />
              <h5 className=" ms-2 pb-4" id="profile-display-name">
                {profileUser.displayName}
              </h5>
              {!areFriends && (
                <button onClick={handleFriendAdd}>Add Friend</button>
              )}
            </div>
            {listOfPosts}
            {ifNoPosts}
          </div>

          <div className="col-3" id="friendsCol">
          {isCurrentUser && <FriendRequest username={profileUser.username} key={profileUser.username}/>}
            {areFriends && <FriendList friendList={friendList} profileUser={profileUser} />}
            
          </div>
        </div>
      </div>
    </>
  );
}
export default UserProfile;
