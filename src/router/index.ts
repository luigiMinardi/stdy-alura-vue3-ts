import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import ViewTasks from '../views/ViewTasks.vue';
import ViewProjects from "../views/ViewProjects.vue";
import ViewForm from "@/views/Projects/ViewForm.vue";
import ViewList from "@/views/Projects/ViewList.vue";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Tasks',
        component: ViewTasks
    },
    {
        path: '/projects',
        component: ViewProjects,
        children: [
            {
                path: '',
                name: 'Projects',
                component: ViewList
            },
            {
                path: 'new',
                name: 'New Project',
                component: ViewForm
            },
            {
                path: ':id',
                name: 'Edit Project',
                component: ViewForm,
                props: true
            },
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router;