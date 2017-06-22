import Vue      from 'vue'
import Router   from 'vue-router'
import Archive  from '../components/front/Archive.vue'
import Article  from '../components/front/Article.vue'
import Console  from '../components/back/Console.vue'
import Login    from '../components/back/Login.vue'
import Articles from '../components/back/Articles.vue'
import Editor   from '../components/back/Editor.vue'
import Links    from '../components/back/Links.vue'
import Account  from '../components/back/Account.vue'
import LinkEdit from '../components/back/LinkEditor.vue'
import Users from '../components/back/Users.vue'
import User from '../components/back/User.vue'
import About from '../components/front/Aboutme.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/archive', name: 'archive', component: Archive},
    {path: '/article', name: 'article', component: Article},
    {path: '/about', name: 'about', component: About},
    {path: '/', component: Login},
    {
      path: '/console',
      component: Console,
      children: [
        {path: '', component: Articles},
        {path: 'articles', name: 'articles', component: Articles},
        {path: 'editor', name: 'editor', component: Editor},
        {path: 'links', name: 'links', component: Links},
        {path: 'account', name: 'account', component: Account},
        {path: 'linkeditor',name: 'linkeditor', component: LinkEdit},
        {path:'users',name:'users',component:Users},
        {path: 'user', name: 'user', component: User }
      ]
    }
  ]
})
