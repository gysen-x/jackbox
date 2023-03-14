import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { ColorModeContext, useMode } from './theme';
import Homepage from './pages/Homepage';
import Leftbar from './global/Leftbar';
import Topbar from './global/Topbar/Topbar';
import Signin from './pages/Signin/Signin';
import Signup from './pages/Signup/Signup';
import { setUser } from './store/actions';

function App() {
  const [theme, colorMode] = useMode();
  const dispatch = useDispatch();
  const isAuth = useSelector((store) => store.user);

  useEffect(() => {
    async function checkAuth() {
      const tokenJWT = localStorage.getItem('token');
      const response = await fetch('/auth/check', {
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
        <Leftbar />
        <main className="main">
          <Routes>
            <Route index element={<Homepage />} />
            {isAuth ? (
              <Route path="/profile" element={<p>Profile</p>} />
            ) : (
              <>
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
              </>
            )}
          </Routes>
        </main>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
