import React, {
  ReactChildren,
  ReactElement,
  useContext,
  useEffect,
} from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import {
  AppBar,
  Container,
  createMuiTheme,
  CssBaseline,
  Link,
  Switch,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@material-ui/core';
import Cookies from 'js-cookie';
import useStyles from '../utils/styles';
import { Store, IState } from '../utils/store';

interface Props {
  title?: string;
  description?: string;
  children: ReactElement | ReactElement[];
}

export default function Layout({
  title,
  description,
  children,
}: Props): ReactElement {
  const { state, dispatch } = useContext(Store);
  const { darkMode } = state;

  const theme = createMuiTheme({
    typography: {
      h1: {
        fontSize: '1.6rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
      h2: {
        fontSize: '1.6rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
    },
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: '#f0c000',
      },
      secondary: {
        main: '#208080',
      },
    },
  });
  const classes = useStyles();
  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' });
    const newDarkMode = !darkMode;
    Cookies.set('darkMode', newDarkMode ? 'ON' : 'OFF');
  };
  return (
    <div>
      <Head>
        <title>{title ? `${title} - Next Amazona` : 'Next Amazona'}</title>
        {description && <meta name="description" content={description} />}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" className={classes.navbar}>
          <Toolbar>
            <NextLink href="/" passHref>
              <Link>
                <Typography className={classes.brand}>amazona</Typography>
              </Link>
            </NextLink>
            <div className={classes.grow}>
              <Switch checked={darkMode} onChange={darkModeChangeHandler} />
              <NextLink href="/cart" passHref>
                <Link>
                  <Typography>Cart</Typography>
                </Link>
              </NextLink>
              <NextLink href="/login" passHref>
                <Link>
                  <Typography>Login</Typography>
                </Link>
              </NextLink>
            </div>
          </Toolbar>
        </AppBar>
        <Container className={classes.main}>{children}</Container>
        <footer className={classes.footer}>
          All rights reserved. Amazona corporation.
        </footer>
      </ThemeProvider>
    </div>
  );
}
