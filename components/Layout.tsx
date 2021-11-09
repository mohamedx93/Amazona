import React, { ReactElement } from 'react';
import Head from 'next/head';
import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import useStyles from '../utils/styles';

interface Props {
  children: ReactElement;
}

export default function Layout({ children }: Props): ReactElement {
  const classes = useStyles();
  return (
    <div>
      <Head>
        <title>Next-Amazona</title>
      </Head>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          <Typography>Amamzona</Typography>
        </Toolbar>
      </AppBar>
      <Container>{children}</Container>
      <footer>All rights reserved. Amazona corporation.</footer>
    </div>
  );
}
