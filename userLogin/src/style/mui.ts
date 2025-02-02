import { createTheme } from '@mui/material/styles';

const color = createTheme({
  palette: {
    primary: {
      main: '#f50057',
    },
    secondary: {
      main: '#2979ff',
    },
    // הוספת צבע מותאם אישית
    custom: {
      main: '#ffc400',
    },
  },
});

export default color;
