import { Button } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../reducer/userContext";

const Logout = () => {
    const navigate = useNavigate();
    const {user,Dispatch} = useContext(UserContext);
    return (
      <>
        <Button
          color="inherit"
          onClick={() => {
            Dispatch({
              type: "DELETE_USER",
              data: user.id,
            });
            navigate("/");
          }}
        >
          Logout
        </Button>
      </>
    );
  };
  export default Logout;