import React from 'react';
import { Route, Routes, createBrowserRouter } from 'react-router';
import About from './componant/about';
// import AppLayout from './componant/appLayout';
import Home from './componant/home';
import NavBar from './componant/navBar';
import { Outlet } from 'react-router';
import RecipeDetail from './componant/recipes/recipeDetail';
import AppLayout from './componant/AppLaot';
import RecipeList from './componant/recipes/recipeList';
import AddRecipe from './componant/recipes/recipeForm';



export const router = createBrowserRouter([
    {
        path: '/', element: <AppLayout />,
        children: [
            { path: 'home', element: <Home /> },
            { path: 'about', element: <About /> },
            {
                path: 'recipe', element: <><RecipeList />  <Outlet /></>,
                children:
                    [{ path: ':id', element: <RecipeDetail /> },
                    { path: 'form', element: <AddRecipe/> }]
            },
        ]
    }
])