import http from "@/http";
import { INotification } from "@/interfaces/INotification";
import IProject from "@/interfaces/IProject";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from 'vuex';
import { CHANGE_PROJECT, CREATE_PROJECT, DESTROY_PROJECT, GET_PROJECTS } from "./actions";
import { ADD_PROJECT, EDIT_PROJECT, DELETE_PROJECT, NOTIFY, DEFINE_PROJECTS } from "./mutations";

interface State {
    projects: IProject[],
    notifications: INotification[]
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state: {
        projects: [],
        notifications: [],
    },
    mutations: {
        [ADD_PROJECT](state, nameOfTheProject: string) {
            const project = {
                id: new Date().toISOString(),
                name: nameOfTheProject
            } as IProject
            state.projects.push(project)
        },
        [EDIT_PROJECT](state, project: IProject) {
            const index = state.projects.findIndex(proj => proj.id == project.id)
            state.projects[index] = project
        },
        [DELETE_PROJECT](state, id: string) {
            state.projects = state.projects.filter(projects => projects.id !== id)
        },
        [DEFINE_PROJECTS](state, projects: IProject[]) {
            state.projects = projects
        },
        [NOTIFY](state, newNotification: INotification) {
            newNotification.id = new Date().getTime()
            state.notifications.push(newNotification)

            setTimeout(() => {
                state.notifications = state.notifications.filter(notification => notification.id !== newNotification.id)
            }, 3000)
        }
    },
    actions: {
        [GET_PROJECTS]({ commit }) {
            http.get('projects')
                .then(response => commit(DEFINE_PROJECTS, response.data))
                .catch(err => console.log(err))
        },
        [CREATE_PROJECT](context, nameOfTheProject: string) {
            return http.post('/projects', {
                name: nameOfTheProject,
            } as IProject)
        },
        [CHANGE_PROJECT](context, project: IProject) {
            return http.put(`/projects/${project.id}`, project)
        },
        async [DESTROY_PROJECT]({ commit }, id: string) {
            return http.delete(`/projects/${id}`)
                .then(() => commit(DELETE_PROJECT, id))
        },
    }
})

export function useStore(): Store<State> {
    return vuexUseStore(key)
}