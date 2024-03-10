import { useState,useEffect } from "react";
import { serverURL } from "../../userService";

const currentUserString = sessionStorage.getItem('currentUser');
const currentUser = JSON.parse(currentUserString);



function FriendReqItem( {friend} ) {
  const [friendReqObject, setFriendReqObject] = useState(null);
  useEffect(() => {
    getRequestDetails();
  });

  const getRequestDetails = async () => {
    const token = sessionStorage.getItem("jwt");
    const res = await fetch(serverURL + `/api/users/${friend}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const newReq = await res.json();
    setFriendReqObject(newReq);
  };

  const handleReqAccept = async() => {
    const token = sessionStorage.getItem("jwt");
    const res = await fetch(serverURL + `/api/users/${currentUser.username}/friends/${friendReqObject.username}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    window.location.reload();
  };

  const handleReqDecline = async () => {
    const token = sessionStorage.getItem("jwt");
    const res = await fetch(serverURL + `/api/users/${currentUser.username}/friends/${friendReqObject.username}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  return (
    friendReqObject?(
    <div className="friendListItem">
      <span>
        <img alt="" src={friendReqObject.profilePic} className="friend-image" />
        <span className="ms-2 fs-5">{friendReqObject.displayName}</span>
        <button className="btn btn-success ms-2" onClick={handleReqAccept}><i className="bi bi-check-lg"> </i></button>
        <button className="btn btn-secondary ms-2" onClick={handleReqDecline}><i className="bi bi-x-lg"> </i></button>
      </span>
    </div>) :(<p>Loading friend requests...</p>)
  );
}
export default FriendReqItem;
