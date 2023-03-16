import React, { useEffect, useState } from 'react';
import './Profile.css';
import { Avatar } from '@mui/material';
// import { useSelector } from 'react-redux';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomModal from '../../components/CustomModal/CustomModal';
import CustomInput from '../../components/CustomInput/CustomInput';

export default function Profile() {
  const [user, setUser] = useState({});
  const [friends, setFriends] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [showChange, setShowChange] = useState(false);
  // const id = useSelector((state) => state.user.userid);

  useEffect(() => {
    (async () => {
      const tokenJWT = localStorage.getItem('token');
      const response = await fetch(
        '/users',
        {
          headers: {
            Authentication: `Bearer ${tokenJWT}`,
          },
        },
      );
      const result = await response.json();
      const { user: newUser, friends: newFriends } = result;
      setUser(result);
      setUser(newUser);
      setFriends(newFriends);
    })();
  }, []);

  // async function editProfile(id) {
  //   const tokenJWT = localStorage.getItem('token');
  //   const response = await fetch('/users', {
  //     method: 'PUT',
  //     headers: {
  //       Authentication: `Bearer ${tokenJWT}`,
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ id }),
  //   });
  // }

  async function deleteFriends(id) {
    const tokenJWT = localStorage.getItem('token');
    const response = await fetch('/users', {
      method: 'DELETE',
      headers: {
        Authentication: `Bearer ${tokenJWT}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    console.log('-----------------------------------', response);
    if (response.status === 200) {
      const refreshFriends = friends.filter((friend) => friend.id !== id);
      console.log('1111---------', refreshFriends);
      setFriends(refreshFriends);
    }
  }

  return (
    <div className="profile">
      {showEdit
      && (
      <CustomModal
        setSwitchModal={setShowEdit}
        inner={(
          <form onSubmit={handleCheckPass} className="formCheckPass">
            <CustomInput
              title="Room password"
              className="form-control"
              id="checkPass"
              type="text"
              name="password"
              onChange={handleCheckForm}
              placeholder="Enter room password..."
            />
            <div style={{ height: '20px' }} />
            <CustomButton
              id="checkButton"
              title="Submit"
              color="#fe9e84"
              type="submit"
            />
          </form>
)}
      />
      )}
      <div className="profile-header">
        <Avatar
          alt="Remy Sharp"
          src={user.avatar}
          sx={{
            width: 100, height: 100, marginLeft: 35, marginRight: 3,
          }}
        />
        <div className="profile-bio">
          <h2>{user.login}</h2>
          <h2>{user.email}</h2>
          <CustomButton
            id="edit"
            title="Edit profile"
            color="#fe9e84"
            type="submit"
          />
          <CustomButton
            id="change"
            title="Сhange password"
            color="#fe9e84"
            type="submit"
          />
        </div>
      </div>
      <div className="profile-friens">
        <h1>My friends</h1>
        {friends.length === 0 ? "You don't have friends"
          : (
            <ul>
              {friends.map(({ id, login, avatar }) => (
                <li className="liFriend" key={id}>
                  <Avatar
                    alt="Remy Sharp"
                    src={avatar}
                    sx={{ width: 50, height: 50, marginRight: 1 }}
                  />
                  <p>{login}</p>
                  <img
                    onPointerDown={() => { console.log('chat'); }}
                    className="chatFriends"
                    src="https://cdn-icons-png.flaticon.com/512/9883/9883272.png"
                    alt="chat"
                  />
                  <img
                    onPointerDown={() => { deleteFriends(id); }}
                    className="deleteFriends"
                    src="https://cdn-icons-png.flaticon.com/512/656/656857.png"
                    alt="delete"
                  />

                </li>
              ))}
            </ul>
          )}
      </div>
    </div>
  );
}
