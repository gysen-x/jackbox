import React, { useEffect, useState } from 'react';
import './Profile.css';
import { Avatar } from '@mui/material';
import ChromeDinoGame from 'react-chrome-dino';
// import { useSelector } from 'react-redux';
import ChatProfile from '../GamePage/Chat/ChatProfile';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomModal from '../../components/CustomModal/CustomModal';
import CustomInput from '../../components/CustomInput/CustomInput';

export default function Profile() {
  const [user, setUser] = useState({});
  const [friends, setFriends] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [changedInfo, setChangedInfo] = useState({ login: '', email: '', avatar: '' });
  const [showChange, setShowChange] = useState(false);
  const [passwords, setPasswords] = useState({ oldPass: '', newPass: '' });
  const [falseOldPassword, setFalseOldPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [friendId, setFriendId] = useState(null);
  const [showChat, setShowChat] = useState(false);
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
    if (response.status === 200) {
      const refreshFriends = friends.filter((friend) => friend.id !== id);
      setFriends(refreshFriends);
    }
  }

  const hadleShowEdit = () => {
    setShowEdit(true);
    setChangedInfo({ login: user.login, email: user.email, avatar: user.avatar });
  };

  const handleCheckForm = (event) => {
    if (event.target.name === 'Login') {
      setChangedInfo({ ...changedInfo, login: event.target.value });
    } else if (event.target.name === 'Email') {
      setChangedInfo({ ...changedInfo, email: event.target.value });
    } else {
      setChangedInfo({ ...changedInfo, avatar: event.target.value });
    }
  };

  async function handleEdit(event) {
    event.preventDefault();
    const tokenJWT = localStorage.getItem('token');
    const response = await fetch('/users', {
      method: 'PUT',
      headers: {
        Authentication: `Bearer ${tokenJWT}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(changedInfo),
    });
    if (response.status === 200) {
      setUser({ ...user, ...changedInfo });
      setChangedInfo({ login: '', email: '', avatar: '' });
      setShowEdit(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 1000);
    }
  }

  const hadleShowChange = () => {
    setShowChange(true);
  };

  const handleCheckFormPassword = (event) => {
    if (event.target.name === 'Old Password') {
      setPasswords({ ...passwords, oldPass: event.target.value });
    } else {
      setPasswords({ ...passwords, newPass: event.target.value });
    }
  };

  async function handleChange(event) {
    event.preventDefault();
    const tokenJWT = localStorage.getItem('token');
    const response = await fetch('/users', {
      method: 'PATCH',
      headers: {
        Authentication: `Bearer ${tokenJWT}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(passwords),
    });
    if (response.status === 200) {
      setPasswords({ oldPass: '', newPass: '' });
      setShowChange(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 1000);
    } else {
      setFalseOldPassword(true);
    }
  }

  const hadleShowChat = (id) => {
    setFriendId(id);
    setShowChat(true);
  };

  return (
    <div className="profile">
      {success
      && (
      <CustomModal
        setSwitchModal={setSuccess}
        inner={(
          <p className="succesfully-changed">Succesfully changed</p>
)}
      />
      )}
      {showEdit
      && (
      <CustomModal
        setSwitchModal={setShowEdit}
        inner={(
          <form onSubmit={handleEdit} className="formCheckPass">
            <CustomInput
              title="Login"
              className="form-control"
              id="Login"
              type="text"
              name="Login"
              onChange={handleCheckForm}
              value={changedInfo.login}
            />
            <CustomInput
              title="Email"
              className="form-control"
              id="Email"
              type="text"
              name="Email"
              onChange={handleCheckForm}
              value={changedInfo.email}
            />
            <CustomInput
              title="Avatar"
              className="form-control"
              id="Avatar"
              type="text"
              name="Avatar"
              onChange={handleCheckForm}
              value={changedInfo.avatar}
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
      {showChange
      && (
      <CustomModal
        setSwitchModal={setShowChange}
        inner={(
          <form onSubmit={handleChange} className="formCheckPass">
            <CustomInput
              title="Old Password"
              className="form-control"
              id="Old Password"
              type="password"
              name="Old Password"
              onChange={handleCheckFormPassword}
              value={passwords.oldPass}
            />
            <CustomInput
              title="New Password"
              className="form-control"
              id="New Password"
              type="password"
              name="New Password"
              onChange={handleCheckFormPassword}
              value={passwords.newPass}
            />
            <div style={{ height: '20px' }} />
            {falseOldPassword && <p className="wrong-pass">Wrong old password</p>}
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
        <div className="bio">
          <Avatar
            alt="Remy Sharp"
            src={user.avatar}
            sx={{
              width: 100, height: 100, marginRight: 3,
            }}
          />
          <div className="profile-bio">
            <h2>{user.login}</h2>
            <h2>{user.email}</h2>
            <CustomButton
              id="edit"
              className="edit"
              title="Edit profile"
              color="#fe9e84"
              width={200}
              type="button"
              handleOnClick={hadleShowEdit}
            />
            <CustomButton
              id="change"
              className="change"
              title="Сhange password"
              color="#fe9e84"
              width={200}
              type="button"
              handleOnClick={hadleShowChange}
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
                      onPointerDown={() => { hadleShowChat(id); }}
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
      {showChat
        && (
          <div className="chatProfile">
            <ChatProfile id={friendId} />
          </div>
        ) }
      {!showChat
        && (<div className="dino"><ChromeDinoGame /></div>)}
    </div>
  );
}
