import Edit from './modules/Edit'
import LoginAndRegister from './modules/LoginAndRegister'
import Home from './modules/Home'
import Article from './modules/Article'
import NotFound from './modules/NotFound'
import Cooperation from './modules/Cooperation'


 



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
        path: '/article/:id',
        exact: true,
        component: Home
    },
    {
        path: '/cooperation/:id',
        exact: true,
        component: Cooperation
    },
    {
        path: '*',
        component: NotFound
    }
]


export default routes