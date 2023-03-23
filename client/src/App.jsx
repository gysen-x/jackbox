import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { ColorModeContext, useMode } from './theme';
import Homepage from './pages/Homepage';
import Topbar from './global/Topbar/Topbar';
import Signin from './pages/Signin/Signin';
import Signup from './pages/Signup/Signup';
import { setUser } from './store/actions';
import GamePage from './pages/GamePage/GamePage';
import Profile from './pages/Profile/Profile';
import VoteGamePage from './pages/GamePage/GameField/VoteGamePage/VoteGamePage';
import Page404 from './pages/404/Page404';
import url from './url';

function App() {
  const [theme, colorMode] = useMode();
  const dispatch = useDispatch();
  const isAuth = useSelector((store) => store.user);

  useEffect(() => {
    async function checkAuth() {
      const tokenJWT = localStorage.getItem('token');
      const response = await fetch(`${url}/auth/check`, {
        headers: {
          Authentication: `Bearer ${tokenJWT}`,
        },
      });
      const result = await response.json();
      if (!result.fail) {
        const { user, token } = result;
        localStorage.setItem('token', token);
        dispatch(setUser(user));
      } else {
        localStorage.removeItem('token');
      }
    }

    checkAuth();
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Topbar />
        <main className="main">
          <Routes>
            {isAuth ? (
              <>
                <Route path="/profile" element={<Profile />} />
                <Route path="/rooms/:id" element={<GamePage />} />
              </>
            ) : (
              <>
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
              </>
            )}
            <Route index element={<Homepage />} />
            <Route path="gamepage" element={<GamePage />} />
            <Route path="vote" element={<VoteGamePage />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </main>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
