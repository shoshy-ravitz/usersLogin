import { Box, Button, Modal, TextField, Typography } from "@mui/material"
import { FormEvent, useContext, useRef, useState } from "react";
import ShowDetailsUser from "./showDetailsUser";
import UpdateUserDetails from "./updateUserDetails";
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';
import { styleForm, styleIconClose } from "../style/style";
import { UserContext } from "../reducer/userContext";
import Logout from "./Logout";

const Login = () => {

    const { Dispatch } = useContext(UserContext)

    const [open, setOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const [isShow, setIsShow] = useState(false);
    const [showRegisterButton, setShowRegisterButton] = useState(false)

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
            const path = await axios.post(`http://localhost:3000/api/user/${isLogin ? 'login' : isRegister ? 'register' : ''}`, {
                email: emailRef.current?.value,
                password: passwordRef.current?.value
            })
            if (isLogin) {
                Dispatch({ type: 'UPDATE_USER', data: path.data.user })
            }
            else {//register
                Dispatch({
                    type: 'ADD_USER',
                    data: {
                        email: emailRef.current?.value || '',
                        password: passwordRef.current?.value || '',
                        id: Number(path.data.id) //for create user(save it in users) - only name,the rest input will be empty
                    }
                })
                setShowRegisterButton(true)
            }
            setIsShow(true)
            setOpen(false)
        }
        catch (e: any) {
            if (e.status == 401) {
                alert("Invalid credentials")
            }
            if (e.status == 400) {
                alert("User already exists")
            }
        }
    }
    return (<>
        {!isShow && (<>
            <Button onClick={handleLogin} variant="contained" style={{ backgroundColor: '#2979ff', color: "white" }}>
                Login
            </Button>
            <Button onClick={handleRegister} disabled={showRegisterButton} variant="contained" style={{ backgroundColor: '#2979ff', color: "white" }}>
                Register
            </Button>
        </>)}
        <Modal open={open} onClose={() => {  setOpen(false)}}>
            <Box sx={styleForm}>
                <Box sx={styleIconClose} onClick={() => setOpen(false)}>
                    <CloseIcon sx={{ color: 'white' }} />
                </Box>
                <Typography variant="h6" component="h2" gutterBottom>
                    login
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
                    <Button type="submit" variant="contained" color="secondary">
                        Save
                    </Button>
                </form>
            </Box>
        </Modal>
        {isShow && <ShowDetailsUser />}
        {isShow && <UpdateUserDetails />}
        {isShow&&<Logout/>}
    </>)
}
export default Login