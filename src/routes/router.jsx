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
import Dashboard from '../pages/AdminPanel/Dashboard/Dashboard';
import Projects from '../pages/AdminPanel/Projects/Projects';
import Skills from '../pages/AdminPanel/Skills/Skills';
import Settings from '../pages/AdminPanel/Settings/Settings';
import NotFound from '../components/NotFound/NotFound';
import Blogs from '../pages/AdminPanel/Blogs/Blogs';
import ContactAndSocials from '../pages/AdminPanel/Contact&Socials/ContactAndSocials';
import OpenSharedBlog from '../pages/OpenSharedBlog/OpenSharedBlog';

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
                Component: BlogsPage,
            },
            {
                path: "blogs/:slug",
                Component: BlogsPage
            },
            { path: "*", Component: NotFound }
        ]
    },
    {
        path: "login",
        Component: LoginForm
    },
    {
        path: "admin",
        element: (<AdminRoute>
            <AdminPanel />
        </AdminRoute>),
        children: [
            {
                index: true,
                Component: Dashboard
            },
            {
                path: "projects",
                Component: Projects
            },
            {
                path: "skills",
                Component: Skills
            },
            {
                path: "blogs",
                Component: Blogs
            },
            {
                path: "blogs",
                Component: Blogs
            },
            {
                path: "contacts",
                Component: ContactAndSocials
            },
            {
                path: "settings",
                Component: Settings
            },
            { path: "*", Component: NotFound }
        ]
    },
    { path: "*", Component: NotFound }
]);