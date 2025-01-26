import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';

const About = () => {
  useEffect(()=>{
    console.log("about");
  
  },[])
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Typography variant="h1">About Page</Typography>
    </Box>
  );
};

export default About;