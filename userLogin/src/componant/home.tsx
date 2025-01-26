import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';

const Home = () => {
  useEffect(()=>{
    console.log("home");
  
  },[])
 
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Typography variant="h1">Home Page</Typography>
    </Box>
  );
};

export default Home;