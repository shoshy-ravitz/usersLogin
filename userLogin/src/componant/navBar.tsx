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
