import { Avatar } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "./userContext";


const ShowDetailsUser = () => {
    const userDetail = useContext(UserContext)
    console.log(userDetail);
    
    return (<>
        <Avatar>{userDetail.user.email?.charAt(0)}</Avatar> {userDetail.user.email}
    </>)
}
export default ShowDetailsUser;