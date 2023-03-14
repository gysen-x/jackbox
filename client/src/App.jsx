import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import React from 'react';
import Leftbar from './global/Leftbar';
import Topbar from './global/Topbar/Topbar';
import GameSetup from './pages/GameSetup/GameSetup';
import { ColorModeContext, useMode } from './theme';

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Topbar />
        <Leftbar />
        <main className="main" />
        <GameSetup />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
