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
  brand: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
  },
  grow: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexGrow: 1,
  },
  main: {
    minHeight: '80vh',
  },
  section: {
    marginTop: '10px',
    marginBottom: '10px',
  },
  footer: {
    marginTop: '10px',
    textAlign: 'center',
  },
  form: {
    maxWidth: '800px',
    margin: '0 auto',
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
