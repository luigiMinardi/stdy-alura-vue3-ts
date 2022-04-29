import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import ViewTasks from '../views/ViewTasks.vue';
import ViewProjects from "../views/ViewProjects.vue";

const routes: RouteRecordRaw[] = [{
    path: '/',
    name: 'ViewTasks',
    component: ViewTasks
},
{
    path: '/projects',
    name: 'ViewProjects',
    component: ViewProjects
}
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router;