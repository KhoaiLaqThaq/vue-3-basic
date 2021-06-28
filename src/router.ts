import {
    createWebHistory,
    createRouter,
    RouteRecordRaw
} from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        alias: '/tutorials',
        name: 'Tutorials',
        component: () => import("./components/TutorialsList.vue"), 
    },
    {
        path: "/tutorials/:id",
        name: 'Tutorial details',
        component: () => import("./components/Tutorial.vue"),
    },
    {
        path: "/tutorial/add",
        name: 'Add new Tutorial',
        component: () => import("./components/AddTutorial.vue"),
    },
] ;

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
