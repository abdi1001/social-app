import { useState, useEffect, useContext } from 'react';
import { Post } from '../post/Post';
import { Share } from '../share/Share';
import axios from 'axios';
import './feed.css';
import { AuthContext } from '../../context/AuthContext';

export const Feed = ({ username }) => {
  const HEROKU = process.env.REACT_APP_PUBLIC_FOLDER_HEROKU;
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get(`${HEROKU}posts/profile/` + username)
        : await axios.get(`${HEROKU}posts/timeline/` + user._id);

      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
      //setPosts(res.data);
    };
    fetchPosts();
  }, [username, user._id, HEROKU]);
  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}

        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
};
