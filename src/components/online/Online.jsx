import './online.css';

export const Online = ({ user }) => {
  const PF_AWS = process.env.REACT_APP_PUBLIC_FOLDER_AWS;
  return (
    <li className="rightbarFreiend">
      <div className="rightbarProfileImgContainer">
        <img
          className="rightbarProfileImg"
          src={`${PF_AWS}` + user.profilePicture}
          alt=""
        />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">{user.username}</span>
    </li>
  );
};
