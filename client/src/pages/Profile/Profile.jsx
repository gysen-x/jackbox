import React, { useEffect, useState } from 'react';
import './Profile.css';
import { Avatar } from '@mui/material';
// import { useSelector } from 'react-redux';
import CustomButton from '../../components/CustomButton/CustomButton';

export default function Profile() {
  const [user, setUser] = useState({});
  // const id = useSelector((state) => state.user.userid);

  useEffect(() => {
    (async () => {
      const tokenJWT = localStorage.getItem('token');
      const response = await fetch('/users',
      {
        headers: {
          Authentication: `Bearer ${tokenJWT}`
        }
      });
      const result = await response.json();
      setUser(result)
    })()
  }, [])

  return (
    <div className="profile">
      <div className="profile-header">
        <Avatar
          alt="Remy Sharp"
          src="https://img.freepik.com/premium-photo/hipster-head-with-empty-space-3d-render-illustration_1172-983.jpg?w=2000"
          sx={{ width: 100, height: 100, marginLeft: 35 }}
        />
        <div className="profile-bio">
          <h2>{user.login}</h2>
          <h2>{user.email}</h2>
          <CustomButton
            id="change"
            title="Change"
            color="#fe9e84"
            type="submit"
          />
        </div>
      </div>
      <div className="profile-friens">
        <h1>My friends</h1>
        <ul>
          {/* {friends.map(friend => (
            <li key={friend.id}>{friend.login}</li>
          ))} */}
        </ul>
      </div>
    </div>
  );
}
