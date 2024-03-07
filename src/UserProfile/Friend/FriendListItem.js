import { useState } from "react";
import { useEffect } from "react";
import "./FriendListItem.css";
import { useNavigate } from "react-router-dom";
import { serverURL } from "../../userService";

function FriendListItem({ friend }) {
  const [friendObject, setFriendObject] = useState(null);

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
  };

  useEffect(() => {
    getFriend(friend); 
  }, [friend]);

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/UserProfile/${friend}`, { state: { userString: JSON.stringify(friendObject) } });
  };
  return (friendObject ?(
    <div className="friendListItem" onClick={handleNavigate}>
      <span>
        <img alt="" src ={friendObject.profilePic }className="friend-image" />
        <span className="ms-2">{friendObject.displayName}</span>
      </span>
    </div>) : (<p>Loading...</p>)
  );
}
export default FriendListItem;
