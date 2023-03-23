/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {
  useEffect, useState, useCallback, useRef,
} from 'react';
import './Profile.css';
import io from 'socket.io-client';
import { Avatar } from '@mui/material';
import ChromeDinoGame from 'react-chrome-dino';
import EmailIcon from '@mui/icons-material/Email';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { useSelector } from 'react-redux';
import ChatProfile from '../GamePage/Chat/ChatProfile';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomModal from '../../components/CustomModal/CustomModal';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomTooltip from '../../components/CustomTooltip/CustomTooltip';

import url from '../../url';

export default function Profile() {
  const { userid: uId } = useSelector((store) => store.user);
  const socketRef = useRef(null);
  const [user, setUser] = useState({});
  const [friends, setFriends] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [changedInfo, setChangedInfo] = useState({ login: '', email: '', avatar: null });
  const [showChange, setShowChange] = useState(false);
  const [passwords, setPasswords] = useState({ oldPass: '', newPass: '' });
  const [success, setSuccess] = useState(false);
  const [friendId, setFriendId] = useState(null);
  const [friendName, setFriendName] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [openTooltipEdit, setTooltipEdit] = useState(false);
  const [openTooltipCheckPassword, setTooltipCheckPassword] = useState(false);

  useEffect(() => {
    socketRef.current = io(url);
    socketRef.current.emit('connection');
    (async () => {
      const tokenJWT = localStorage.getItem('token');
      const response = await fetch(
        `${url}/users`,
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

  useEffect(() => {
    socketRef.current.on('checkDeleteFriend', ({ ourId, frId }) => {
      if (uId === ourId) {
        const refreshFriends = friends.filter((friend) => friend.id !== frId);
        setFriends(refreshFriends);
        if (frId === friendId) {
          setShowChat(false);
        }
      }
    });
  }, [friends, friendId]);

  async function deleteFriends(id) {
    const tokenJWT = localStorage.getItem('token');
    const response = await fetch(`${url}/users`, {
      method: 'DELETE',
      headers: {
        Authentication: `Bearer ${tokenJWT}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    if (response.status === 200) {
      socketRef.current.emit('deleteFriend', { id, tokenJWT });
      const refreshFriends = friends.filter((friend) => friend.id !== id);
      console.log(id, friendId);
      if (id === friendId) {
        setShowChat(false);
      }
      setFriends(refreshFriends);
    }
  }

  const hadleShowEdit = () => {
    setShowEdit(true);
    setChangedInfo({ login: user.login, email: user.email, avatar: null });
  };

  const handleCheckForm = (event) => {
    if (event.target.name === 'Login') {
      setChangedInfo({ ...changedInfo, login: event.target.value });
    } else if (event.target.name === 'Email') {
      setChangedInfo({ ...changedInfo, email: event.target.value });
    } else {
      setChangedInfo({ ...changedInfo, avatar: event.target.files[0] });
    }
  };

  async function handleEdit(event) {
    event.preventDefault();
    const data = new FormData();
    data.append('avatar', changedInfo.avatar);
    const tokenJWT = localStorage.getItem('token');
    const emailValidation = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (changedInfo.email.match(emailValidation)) {
      try {
        if (changedInfo.avatar) {
          const responseAvatar = await fetch(`${url}/users`, {
            method: 'PUT',
            headers: {
              Authentication: `Bearer ${tokenJWT}`,
            },
            body: data,
          });
          const result = await responseAvatar.json();
          setUser({ ...user, avatar: result.avatar });
        }

        const response = await fetch(`${url}/users`, {
          method: 'PUT',
          headers: {
            Authentication: `Bearer ${tokenJWT}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ login: changedInfo.login, email: changedInfo.email }),
        });
        if (response.status === 200) {
          setUser((prev) => ({ ...prev, login: changedInfo.login, email: changedInfo.email }));
          setChangedInfo({ login: '', email: '', avatar: '' });
          setShowEdit(false);
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
          }, 1000);
        } else {
          setErrorText('Fail');
          setTooltipEdit(true);
        }
      } catch (error) {
        console.log('error: ', error);
        setErrorText('Fail. Try later.');
        setTooltipEdit(true);
      }
    } else {
      setErrorText('Incorrect email');
      setTooltipEdit(true);
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
    const response = await fetch(`${url}/users`, {
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
      setTooltipCheckPassword(true);
    }
  }

  const hadleShowChat = (id, name) => {
    setFriendId(id);
    setFriendName(name);
    setShowChat(true);
  };

  const hadleCloseChat = useCallback(() => {
    setShowChat(false);
  }, []);

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
                    <form
                      style={{ gap: 20 }}
                      onSubmit={handleEdit}
                      className="formCheckPass"
                      encType="multipart/form-data"
                    >
                      <input
                        title="Avatar"
                        className="inputfile"
                        id="Avatar"
                        type="file"
                        name="Avatar"
                        onChange={handleCheckForm}
                      />
                      <label className="avatar" htmlFor="Avatar">
                        <Avatar
                          alt="Remy Sharp"
                          src={user.avatar}
                          sx={{
                            width: 100, height: 100,
                          }}
                        />
                        <p className="editAvatar">change</p>
                      </label>
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
                      <CustomTooltip
                        message={errorText}
                        openTooltip={openTooltipEdit}
                        setOpenTooltip={setTooltipEdit}
                        inner={(
                          <CustomButton
                            id="checkButton"
                            title="Submit"
                            color="#fe9e84"
                            type="submit"
                          />
                                    )}
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
                    <form style={{ gap: 20 }} onSubmit={handleChange} className="formCheckPass">
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
                      <CustomTooltip
                        message="Wrong old password"
                        openTooltip={openTooltipCheckPassword}
                        setOpenTooltip={setTooltipCheckPassword}
                        inner={(
                          <CustomButton
                            id="checkButton"
                            title="Submit"
                            color="#fe9e84"
                            type="submit"
                          />
                                    )}
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
                    <EmailIcon
                      onPointerDown={() => {
                        hadleShowChat(id, login);
                      }}
                      className="chatFriends"
                    />
                    <ClearRoundedIcon
                      onPointerDown={() => {
                        deleteFriends(id);
                      }}
                      className="deleteFriends"
                      fontSize="medium"
                    />
                  </li>
                ))}
              </ul>
            )}
        </div>
      </div>
      {showChat
        ? (
          <div className="chatProfile">
            <ChatProfile
              id={friendId}
              name={friendName}
              hadleCloseChat={hadleCloseChat}
              socketRef={socketRef}
            />
          </div>
        )
        : (
          <div className="dino">
            <ChromeDinoGame />
          </div>
        )}
    </div>
  );
}
