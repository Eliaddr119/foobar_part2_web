import { useState } from "react";
import { useEffect } from "react";
import "./FriendListItem.css";
import { useNavigate } from "react-router-dom";
import { serverURL } from "../../userService";

function FriendListItem({ friend, profileUser }) {
  const [friendObject, setFriendObject] = useState(null);
  const [showRemove, setShowRemove] = useState(false);
  const currentUserString = sessionStorage.getItem('currentUser');
const currentUser = JSON.parse(currentUserString);


  const getFriend = async (friendUsername) => {
    const token = sessionStorage.getItem("jwt");
    const res = await fetch(serverURL + `/api/users/${friendUsername}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const friendFromServer = await res.json();
    setFriendObject(friendFromServer);
  }

  const handleFriendRemoval = async() => {
    const token = sessionStorage.getItem("jwt");
    const res = await fetch(serverURL + `/api/users/${profileUser.username}/friends/${friend}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    window.location.reload();
  }

  useEffect(() => {
    getFriend(friend);
    CheckifCurrentUserProfile();
  }, [friend]);

  const CheckifCurrentUserProfile = () => {
    if (currentUser.username === profileUser.username) {
      setShowRemove(true);
    } else {
      setShowRemove(false);
    }
  };

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/UserProfile/${friend}`, {
      state: { userString: JSON.stringify(friendObject) },
    });
  };
  return friendObject ? (
    <>
      <span className="friendListItem" onClick={handleNavigate}>
        <span>
          <img alt="" src={friendObject.profilePic} className="friend-image" />
          <span className="ms-2">{friendObject.displayName}</span>
        </span>
      </span>
      {showRemove&& <><button
        type="button"
        className="btn btn-secondary ms-3"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Remove Friend
      </button><ul className="dropdown-menu text-center">
          Are You Sure ?
          <div>
            <button className="btn btn-danger" onClick={handleFriendRemoval}>Yes</button>
            <button className="btn btn-light">No</button>
          </div>
        </ul></>}
    </>
  ) : (
    <p>Loading...</p>
  );
}
export default FriendListItem;
