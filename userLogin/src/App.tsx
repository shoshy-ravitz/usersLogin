import { RouterProvider } from 'react-router'
import './App.css'
import { router } from './Router'
import { Outlet } from 'react-router'


function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Outlet/>
    </>
  )
}

export default App
