import './rightbar.css';
import { Users } from '../../dummyData';
import { Online } from '../online/Online';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Add, Remove } from '@material-ui/icons';

export const Rightbar = ({ user }) => {
  const HEROKU = process.env.REACT_APP_PUBLIC_FOLDER_HEROKU;
  const PF_AWS = process.env.REACT_APP_PUBLIC_FOLDER_AWS;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    const getIsFollowing = async () => {
      try {
        const isFollowing = await axios.put(
          `${HEROKU}users/${user._id}/isfollowing`,
          { userId: currentUser._id }
        );

        setFollowed(isFollowing.data);
      } catch (err) {
        console.log(err);
      }
    };
    getIsFollowing();

    // setFollowed(currentUser.followings.includes(user?._id));
  }, [currentUser._id, user?._id, user, HEROKU]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get(
          `${HEROKU}users/friends/${user._id}`
        );
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user?._id, HEROKU]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`${HEROKU}users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({
          type: 'UNFOLLOW',
          action: user._id,
        });
        setFollowed(!followed);
      } else {
        await axios.put(`${HEROKU}users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({
          type: 'FOLLOW',
          action: user._id,
        });
      }
      setFollowed(!followed);
    } catch (err) {
      console.log(err);
    }
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="/assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today
          </span>
        </div>
        <img className="rightbarAd" src="/assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };
  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? 'Unfollow' : 'Follow'}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User Information </h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? 'Single'
                : user.relationship === 2
                ? 'Married'
                : ''}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User Friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              key={friend._id}
              to={friend && '/profile/' + friend.username}
              style={{ textDecoration: 'none' }}
            >
              <div className="rightbarFollowing">
                <img
                  className="rightbarFollowingImg"
                  src={
                    friend && friend.profilePicture
                      ? PF_AWS + friend.profilePicture
                      : PF_AWS + 'person/noAvatar.png'
                  }
                  alt=""
                />
                <span className="rightbarFolowingName">
                  {friend && friend.username}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
};
