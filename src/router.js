import Vue from 'vue';
import Router from 'vue-router';
import HomeView from './views/HomeView.vue';
import AboutView from './views/AboutView.vue';
import BlogView from './views/BlogView.vue';
import ContactView from './views/ContactView.vue';
import LegalView from './views/LegalView.vue';
import ProchatView from './views/ProchatView.vue';
import ShopView from './views/ShopView.vue';
import AboutHome from './components/AboutHome.vue';
import AboutPress from './components/AboutPress.vue';
import AboutFaq from './components/AboutFaq.vue';

import ProjectDetail from './components/ProjectDetail.vue';
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
            path: '/prochat',
            name: 'prochat',
            component: ProchatView
        },
        {
            path: '/shop',
            name: 'shop',
            component: ShopView
        }
    ]
});
