// // import { AppBar, Button, Toolbar } from "@mui/material";
// // import { Link } from "react-router";

// // const NanBar = () => {


// //     return (
// //         <AppBar position="static" >
// //             {/* <Toolbar> */}
// //                 <Button color="inherit">
// //                     <Link to="/home" >home</Link>
// //                 </Button>
// //                 <Button color="inherit">
// //                     <Link to="/about" >about</Link>
// //                 </Button>
// //             {/* </Toolbar> */}
// //         </AppBar>
// //     );
// // };

// // export default NanBar;
// import React from 'react';
// import { Link } from "react-router"; // Ensure you import from react-router-dom
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import Button from '@mui/material/Button';
// import { makeStyles } from '@mui/styles';

// const useStyles = makeStyles((theme) => ({
//     navbar: {
//         position: 'absolute', // Positioning the navbar absolutely
//         top: 1, // Distance from the top
//         right: 0, // Distance from the right
//     },
//     link: {
//         color: 'white', // Link color
//         textDecoration: 'none', // Remove underline
//     },
// }));

// const NanBar = () => {
//     const classes = useStyles();

//     return (
//         <AppBar position="static" className={classes.navbar}>
//             <Toolbar className={classes.navbar}>
//                 <Button color="inherit">
//                     <Link to="/home" className={classes.link}>home</Link>
//                 </Button>
//                 <Button color="inherit">
//                     <Link to="/about" className={classes.link}>about</Link>
//                 </Button>
//             </Toolbar>
//         </AppBar>
//     );
// };

// export default NanBar;
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router';
import Login from './login';

const NavBar = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        <Login />
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <Button color="inherit">
                            <Link to="/home" >home</Link>
                        </Button>
                        <Button color="inherit">
                            <Link to="/about" >about</Link>
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
export default NavBar
