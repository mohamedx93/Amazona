import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  navbar: {
    background: solid '#203040',
    '& a': {
      color: '#fff',
      marginLeft: 10,
    },
  },
});

export default useStyles;
