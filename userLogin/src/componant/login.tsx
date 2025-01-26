import { Box, Button, Modal, TextField, Typography } from "@mui/material"
import { FormEvent, useReducer, useRef, useState } from "react";
import ShowDetailsUser from "./showDetailsUser";
import UpdateUserDetails from "./updateUserDetails";
import userReducer, { userType } from "./userReducer";
import { UserContext } from "./userContext";
import axios from "axios";
import { pink } from '@mui/material/colors';


const Login = () => {

    const [users, Dispatch] = useReducer(userReducer, {} as userType)//saved all the data:user detail ,function to add,create...
    const [open, setOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const [isShow, setIsShow] = useState(false);
    const [showRegisterButton,setShowRegisterButton]=useState(false)
    const [color,setColor]=useState<string>(pink[500])

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const handleLogin = () => {
        setIsLogin(true)
        setOpen(true)
    }
    const handleRegister = () => {
        setIsRegister(true)
        setOpen(true)
    }
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        try {
            console.log(`http://localhost:3000/api/user/${isLogin ? 'login' : isRegister ? 'register' : ''}`);

            const path = await axios.post(`http://localhost:3000/api/user/${isLogin ? 'login' : isRegister ? 'register' : ''}`, {
                email: emailRef.current?.value,
                password: passwordRef.current?.value
            })
            if (isLogin) {
                const userData = path.data.user
                Dispatch({ type: 'UPDATE', data: userData })
                
            }
            else {//register
                Dispatch({
                    type: 'ADD',
                    data: {
                        email: emailRef.current?.value || '',
                        password: passwordRef.current?.value || '',
                        id: path.data.id //for create user(save it in users) - only name,the rest input will be empty
                    }
                })
                setShowRegisterButton(true)
                setColor(pink[300])
            }
           
            setOpen(false)
        }
        catch (e: any) {
            if (e.status == 401) {
                alert("Invalid credentials")
            }
            if (e.status == 422) {
                alert("User already exists")
            }
        }
    }
    return (<>
        {!isShow && (
            <>
                <Button onClick={handleLogin}   variant="contained" style={{ backgroundColor: pink[500], color: "white" }}>
                    Login
                </Button>
                <Button onClick={handleRegister} disabled={showRegisterButton} variant="contained"  style={{ backgroundColor: color, color: "white" }}>
                    Register
                </Button>
            </>
        )}
        <Modal open={open} onClose={() => { }}>
            <Box sx={{
                width: 300,
                padding: 2,
                bgcolor: 'background.paper',
                boxShadow: 24,
                borderRadius: 2,
                margin: 'auto',
                marginTop: '200px'
            }}>                    <Typography variant="h6" component="h2" gutterBottom>
                    Update Information
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        inputRef={emailRef}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        inputRef={passwordRef}
                    />
                    <Button type="submit" variant="contained" color="success">
                        Save
                    </Button>
                </form>
            </Box>
        </Modal>
        <UserContext.Provider value={{ user: users, Dispatch }}>
            {isShow && <ShowDetailsUser />}
            {isShow && <UpdateUserDetails />}
        </UserContext.Provider>
    </>)
}
export default Login