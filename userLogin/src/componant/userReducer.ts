export type userType = {
    name: string,
    lastName: string,
    email: string,
    addres: string,
    password: string,
    phone: string,
    id:number
}

export type Actoin = {
    type: 'UPDATE',
    data: userType
} |{
    type: 'DELETE',
} |{
    type: 'ADD',
    data: Partial<userType> & {email: string,password:string}
}

export default (state: userType, actoin: Actoin): userType => {
    switch (actoin.type) {
        case 'UPDATE':
            return actoin.data//{...state,...actoin.data}
        case 'DELETE':
            return state;
        case 'ADD':
            return actoin.data
        default: return state
    }
}