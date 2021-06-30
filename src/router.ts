import {
    createWebHistory,
    createRouter,
    RouteRecordRaw
} from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        // alias: '/tutorials',
        name: 'Home',
        component: () => import("./components/Home.vue"), 
    },
    {
        path: "/shop",
        name: 'Shopping Cart',
        component: () => import("./components/ShoppingCart.vue"),
    },
    {
        path: "/about",
        name: "About me",
        component: () => import("./components/About.vue")
    }
] ;

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
