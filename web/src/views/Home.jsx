import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Footer from '../components/common/Footer';
import getLPTheme from './getLPTheme';


export default function Home() {
  const [mode, setMode] = React.useState(getInitialMode());
  const LPtheme = createTheme(getLPTheme(mode));


  function getInitialMode() {
    const savedMode = JSON.parse(localStorage.getItem('mode'));
    return savedMode || 'light';
  }

  return (
    <ThemeProvider theme={ LPtheme }>
      <Box>
        <Footer/>
      </Box>
    </ThemeProvider>
  );
}