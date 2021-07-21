import './closeFriend.css';

export const CloseFriend = ({ user }) => {
  const PF_AWS = process.env.REACT_APP_PUBLIC_FOLDER_AWS;
  return (
    <li className="sidebarFriend">
      <img
        className="sidebarFriendImg"
        src={`${PF_AWS}` + user.profilePicture}
        alt=""
      />
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  );
};
