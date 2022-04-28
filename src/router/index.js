import  VueRouter from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import PlayPage from '../pages/PlayPage.vue'


export default new VueRouter({
    mode:'hash',
    routes:[
        {
            path:'',
            component:HomePage
        },
        {
            path:'/home',
            component:HomePage
        },
        {
            path:'/play',
            component:PlayPage
        }
    ]
})