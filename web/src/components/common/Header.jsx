import * as React from 'react';
import PropTypes from 'prop-types';

import CssBaseline from '@mui/material/CssBaseline';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppAppBar from '../base/AppAppBar';
import getLPTheme from '../../views/getLPTheme';

export function getInitialMode() {
    const savedMode = JSON.parse(localStorage.getItem('mode'));
    return savedMode || 'light'; 
  }

export default function Header() {
  const [mode, setMode] = React.useState(getInitialMode());
  const LPtheme = createTheme(getLPTheme(mode));

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  React.useEffect(() => {
    localStorage.setItem('mode', JSON.stringify(mode));
  }, [mode]);


  return (
    <ThemeProvider theme={ LPtheme } >
      <CssBaseline />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
    </ThemeProvider>
  );
}