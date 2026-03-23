import { createBrowserRouter } from 'react-router';
import App from '../App';
import HomePage from '../pages/HomePage/HomePage'
import ProjectPage from '../pages/ProjectsPage/ProjectsPage'
import AboutPage from '../pages/AboutPage/AboutPage'
import ContactPage from '../pages/ContactPage/ContactPage'
import BlogsPage from '../pages/BlogsPage/BlogsPage'
import AdminRoute from './AdminRoute';
import AdminPanel from '../pages/AdminPanel/AdminPanel';
import LoginForm from '../components/admin/Form/LoginForm';

export const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                index: true,
                Component: HomePage
            },
            {
                path: "projects",
                Component: ProjectPage
            },
            {
                path: "about",
                Component: AboutPage
            },
            {
                path: "contact",
                Component: ContactPage
            },
            {
                path: "blogs",
                Component: BlogsPage
            },
        ]
    },
    {
        path: "login",
        Component: LoginForm
    },
    {
        path: "admin",
        element: <AdminRoute>
            <AdminPanel />
        </AdminRoute>
    }
]);