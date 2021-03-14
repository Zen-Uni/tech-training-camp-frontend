import Edit from './modules/Edit'
import LoginAndRegister from './modules/LoginAndRegister'
import Home from './modules/Home'
import Article from './modules/Article'
import NotFound from './modules/NotFound'


import { Redirect } from 'react-router-dom'  



const routes = [
    {
        path: '/',
        exact: true,
        component: Article
    },
    {
        path: '/edit',
        exact: true,
        component: Edit
    },
    {
        path: '/sign',
        exact: true,
        component: LoginAndRegister
    },
    {
        path: '/home',
        exact: true,
        component: Home
    },
   
    {
        path: '*',
        component: NotFound
    }
]


export default routes