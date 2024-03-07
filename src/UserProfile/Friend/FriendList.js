import FriendListItem from "./FriendListItem";

function FriendList({ friendList }) {
  const listOfFriends = friendList.map((friend) => {
    return <FriendListItem friend={friend} key={friend.username} />;
  });
  return (
    <>
      <h2>Friends</h2>
      <div>{listOfFriends}</div>
    </>
  );
}
export default FriendList;
