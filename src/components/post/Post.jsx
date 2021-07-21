import './post.css';
import { useContext, useState } from 'react';
import { MoreVert } from '@material-ui/icons';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { format } from 'timeago.js';
import { AuthContext } from '../../context/AuthContext';

export const Post = ({ post }) => {
  const HEROKU = process.env.REACT_APP_PUBLIC_FOLDER_HEROKU;
  const PF_AWS = process.env.REACT_APP_PUBLIC_FOLDER_AWS;
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`${HEROKU}users?userId=${post.userId}`);

      setUser(res.data);
    };
    fetchUser();
  }, [post.userId, HEROKU]);

  const likeHandler = () => {
    try {
      axios.put(`${HEROKU}posts/${post._id}/like`, { userId: currentUser._id });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? PF_AWS + user.profilePicture
                    : PF_AWS + 'person/noAvatar.png'
                }
                alt=""
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={`${PF_AWS}${post.img}`} alt="" />
        </div>

        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`${PF_AWS}like.png`}
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              src={`${PF_AWS}heart.png`}
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{like}</span>
          </div>

          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};
