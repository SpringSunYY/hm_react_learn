import {createBrowserRouter} from 'react-router-dom'

import Login from '@/pages/Login'
import Layout from '@/pages/Layout'
import AuthRoute from '@/components/AuthRoute'
import Home from "src/pages/home";
import Article from "@/pages/article";
import Publish from "@/pages/publish";


const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthRoute><Layout/></AuthRoute>,
        children: [
            {
                index: true,// 默认路由
                element: <Home/>,
            },
            {
                path: 'article',
                element: <Article/>
            }, {
                path: 'publish',
                element: <Publish/>
            }
        ]
    },
    {
        path: '/login',
        element: <Login/>,
    },
])

export default router
