import { RouterProvider } from 'react-router'
import './App.css'
import { router } from './Router'
import { Outlet } from 'react-router'
import { Provider } from 'react-redux'
import store from './store/store'
import { useReducer } from 'react'
import userReducer, { userType } from './reducer/userReducer'
import { ThemeProvider } from '@mui/material'
import color from './style/mui'
import { UserContext } from './reducer/userContext'


function App() {
  const [users, Dispatch] = useReducer(userReducer, {} as userType)//saved all the data:user detail ,function to add,create...

  return (
    <>
      <ThemeProvider theme={color}>
        <UserContext.Provider value={{ user: users, Dispatch }}>
          <Provider store={store} >
            <RouterProvider router={router} />
            <Outlet />
          </Provider>
        </UserContext.Provider>
      </ThemeProvider>
    </>
  )
}

export default App
