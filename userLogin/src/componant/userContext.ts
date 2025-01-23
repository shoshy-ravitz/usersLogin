import { Dispatch, createContext } from "react";
import { Actoin, userType } from "./userReducer";


const user: userType = {
    name: '', email: '', lastName: '', phone: '', password: '', addres: '',
    id: 0
}

export const UserContext = createContext<{ user: userType, Dispatch: Dispatch<Actoin> }>
    ({ user: user, Dispatch: () => null });
