import Vue from 'vue';
import Router from 'vue-router';
import HomeView from './views/HomeView.vue';
import CategoryView from './views/CategoryView.vue';
import BrowseView from './views/BrowseView.vue';
import BrowseHome from './components/BrowseHome.vue';
import AboutView from './views/AboutView.vue';
import BlogView from './views/BlogView.vue';
import ContactView from './views/ContactView.vue';
import LegalView from './views/LegalView.vue';
import ProchatView from './views/ProchatView.vue';
import ProchatPros from './components/ProchatPros.vue';
import ProchatHours from './components/ProchatHours.vue';
import ProchatApply from './components/ProchatApply.vue';
import ShopView from './views/ShopView.vue';
import AboutHome from './components/AboutHome.vue';
import AboutPress from './components/AboutPress.vue';
import AboutFaq from './components/AboutFaq.vue';
import ProjectDetail from './components/ProjectDetail.vue';
import ShopDetail from './components/ShopDetail.vue';
// import CategoryDetail from './components/CategoryDetail.vue';
import BlogDetail from './components/BlogDetail.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/category',
            name: 'category',
            component: CategoryView
        },
        {
            path: '/browse',
            name: 'browse',
            component: BrowseView,
            children: [
                {
                    path: ':id',
                    name: 'browseHome',
                    component: BrowseHome
                }
            ]
        },
        {
            path: '/blog',
            name: 'blog',
            component: BlogView
        },
        {
            path: '/blog/:id',
            name: 'blogDetail',
            component: BlogDetail
        },
        {
            path: '/about',
            name: 'about',
            component: AboutView,
            children: [
                {
                    path: 'home',
                    name: 'aboutHome',
                    component: AboutHome
                },
                {
                    path: 'press',
                    name: 'aboutPress',
                    component: AboutPress
                },
                {
                    path: 'faq',
                    name: 'aboutFaq',
                    component: AboutFaq
                }
            ]
        },
        {
            path: '/contact',
            name: 'contact',
            component: ContactView
        },
        {
            path: '/project/:id',
            name: 'projectDetail',
            component: ProjectDetail
        },
        {
            path: '/legal',
            name: 'legal',
            component: LegalView
        },
        {
            path: '/pro-chat',
            name: 'prochat',
            component: ProchatView,
            children: [
                {
                    path: 'pros',
                    name: 'prochatHome',
                    component: ProchatPros
                },
                {
                    path: 'hours',
                    name: 'prochatHours',
                    component: ProchatHours
                },
                {
                    path: 'apply',
                    name: 'prochatApply',
                    component: ProchatApply
                }
            ]
        },
        {
            path: '/shop',
            name: 'shop',
            component: ShopView
        },
        {
            path: '/shop/:id',
            name: 'shopDetail',
            component: ShopDetail
        }
    ]
});
