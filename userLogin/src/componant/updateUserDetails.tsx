import { Box, Button, Modal, TextField, Typography } from "@mui/material"
import { FormEvent, useContext, useState } from "react"
import axios from "axios"
import { UserContext } from "../reducer/userContext";
import { styleForm, styleIconClose } from "../style/style";
import CloseIcon from '@mui/icons-material/Close';

const UpdateUserDetails = () => {
    const userDetail = useContext(UserContext)//using in useReducer value (all the data and function data)

    const [isUpdate, setIsUpdate] = useState(false)

    const [email, setEmail] = useState(userDetail.user.email || '')
    const [firstName, setName] = useState(userDetail.user.firstName || '')
    const [lastName, setLastName] = useState(userDetail.user.lastName || '')
    const [address, setAddress] = useState(userDetail.user.address || '')
    const [phone, setPhone] = useState(userDetail.user.phone || '')
    const [password, setPassword] = useState(userDetail.user.password || '')

    const handleUpdate = () => { setIsUpdate(true) }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        try {
            await axios.put("http://localhost:3000/api/user", {
                firstName: firstName, lastName: lastName, email: email, address: address, phone: phone
            }, { headers: { 'user-id': userDetail.user.id } })
            //for saving the detail in user , using by Dispatch function and send type of action (update,delte ...) and input value
            userDetail.Dispatch({
                type: 'UPDATE_USER', data: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    address: address,
                    phone: phone,
                    password: password,
                    id: userDetail.user.id
                }
            })
            setIsUpdate(false)
        }
        catch (e: any) {
            if (e.status == 404)
                alert(e.response.data.message)
            if (e.status == 403)
                console.log(e);
        }
    }
    return (
        <>
            <Button onClick={handleUpdate} style={{ backgroundColor:"secondary", color: "white" }} >update</Button>
            <Modal open={isUpdate} onClose={handleUpdate}>
                <Box sx={styleForm}>
                    <Box sx={styleIconClose} onClick={() => setIsUpdate(false)}>
                        <CloseIcon sx={{ color: 'white' }} />
                    </Box>
                    <Typography variant="h6" component="h2" gutterBottom>
                        Update Information
                    </Typography>
                    <form>
                        <TextField
                            label="שם משפחה"
                            name="lastName"
                            color="secondary"
                            value={lastName}
                            fullWidth
                            margin="normal"
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <TextField
                            label="שם"
                            name="name"
                            color="secondary"
                            value={firstName}
                            fullWidth
                            margin="normal"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            label="מייל"
                            name="email"
                            color="secondary"
                            value={email}
                            fullWidth
                            margin="normal"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            label="כתובת"
                            name="address"
                            color="secondary"
                            value={address}
                            fullWidth
                            margin="normal"
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <TextField
                            label="טלפון"
                            name="phone"
                            color="secondary"
                            value={phone}
                            fullWidth
                            margin="normal"
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <TextField
                            label="סיסמא"
                            name="password"
                            type="password"
                            color="secondary"
                            value={password}
                            fullWidth
                            margin="normal"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            onClick={handleSubmit}
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            שמירה
                        </Button>
                    </form>
                </Box>
            </Modal>
        </>)
}
export default UpdateUserDetails
