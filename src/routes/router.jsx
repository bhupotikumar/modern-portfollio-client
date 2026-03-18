import React from 'react';
import { createBrowserRouter } from 'react-router';
import App from '../App';
import HomePage from '../pages/HomePage/HomePage'

export const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                index: true,
                Component: HomePage
            }
        ]
    },
]);