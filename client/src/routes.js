import Edit from './modules/Edit'
import LoginAndRegister from './modules/LoginAndRegister'
import Home from './modules/Home'
import Article from './modules/Article'
import NotFound from './modules/NotFound'


import { Redirect } from 'react-router-dom'  

const auth = false

const routes = [
    {
        path: '/',
        exact: true,
        render: () => (
            auth ? <Redirect to='/edit'/> : <Redirect to='/sign'/>
        )
    },
    {
        path: '/edit',
        exact: true,
        render: () => (
            auth ? <Edit/> : <Redirect to='/sign' />
        )
    },
    {
        path: '/sign',
        exact: true,
        render: () => (
            auth ? <Redirect to='/edit' /> : <LoginAndRegister/>
        )
    },
    {
        path: '/home',
        exact: true,
        component: Home
    },
    {
        path: '/article',
        exact: true,
        component: Article
    }, 
    {
        path: '*',
        component: NotFound
    }
]


export default routes