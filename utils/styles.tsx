import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles({
  navbar: {
    background: '#203040',
    '& p': {
      color: '#fff',
      fontWeight: 'bold',
      marginLeft: 10,
    },
  },
  main: {
    minHeight: '80vh',
  },
  footer: {
    textAlign: 'center',
  },
});

export default useStyles;
// import { createTheme } from '@mui/material/styles';
// import { red } from '@mui/material/colors';

// // Create a theme instance.
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#556cd6',
//     },
//     secondary: {
//       main: '#19857b',
//     },
//     error: {
//       main: red.A400,
//     },
//   },
// });

// export default theme;
