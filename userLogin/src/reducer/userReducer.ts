export type userType = {
    firstName: string,
    lastName: string,
    email: string,
    address: string,
    password: string,
    phone: string,
    id:number
}
const emptyUser: userType = {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  };

export type Actoin = {
    type: 'UPDATE_USER',
    data: userType
} |{
    type: 'DELETE_USER',
    data:number
} |{
    type: 'ADD_USER',
    data: Partial<userType> & {email: string,password:string}
}

export default (state: userType, actoin: Actoin): userType => {
    switch (actoin.type) {
        case 'UPDATE_USER':
            return {...actoin.data}
        case 'DELETE_USER':
            return {...emptyUser};
        case 'ADD_USER':
            return {...state,...actoin.data}
        default: return state
    }
}