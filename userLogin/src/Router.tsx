import React from 'react';
import { Route, Routes, createBrowserRouter } from 'react-router';
import About from './componant/about';
import AppLayout from './componant/appLayout';
import Home from './componant/home';
import NavBar from './componant/navBar';
import { Outlet } from 'react-router';



export const router = createBrowserRouter([
    {
        path: '/', element: <><NavBar/> <Outlet/></>,
        children: [
            { path: 'home', element: <Home /> },
            { path: 'about', element: <About /> }
        ]
    }
])
