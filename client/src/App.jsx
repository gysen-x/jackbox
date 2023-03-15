import React, {useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {ThemeProvider} from '@emotion/react';
import {CssBaseline} from '@mui/material';
import {ColorModeContext, useMode} from './theme';
import Homepage from './pages/Homepage';
import Leftbar from './global/Leftbar';
import Topbar from './global/Topbar/Topbar';
import Signin from './pages/Signin/Signin';
import Signup from './pages/Signup/Signup';
import SelectGames from './pages/SelectGames/SelectGames';
import Choose from './pages/Choose/Choose';
import Rooms from './pages/Rooms/Rooms';
import GameSetup from './pages/GameSetup/GameSetup';
import {setUser} from './store/actions';
import GamePage from "./pages/GamePage/GamePage";
import Profile from "./pages/Profile/Profile"

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
                const {user, token} = result;
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
                <CssBaseline/>
                <Topbar/>
                <main className="main">
                    <Routes>
                        {isAuth ? (
                            <>
                                <Route path="/profile" element={<Profile/>}/>
                                <Route path="/games" element={<SelectGames/>}/>
                                <Route path="/choose" element={<Choose/>}/>
                                <Route path="/rooms" element={<Rooms/>}/>
                                <Route path="/games/:id/options" element={<GameSetup/>}/>
                            </>
                        ) : (
                            <>
                                <Route path="/signin" element={<Signin/>}/>
                                <Route path="/signup" element={<Signup/>}/>
                                <Route path="/room" element={<GamePage/>}/>
                            </>
                        )}
                        <Route index element={<Homepage/>}/>
                        <Route path="*" element={<div>404</div>}/>
                    </Routes>
                </main>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
