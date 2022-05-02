import { INotification } from "@/interfaces/INotification";
import IProject from "@/interfaces/IProject";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from 'vuex';
import { ADD_PROJECT, EDIT_PROJECT, DELETE_PROJECT, NOTIFY } from "./mutations";

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
            const index = state.projects.findIndex(proj => proj.id === project.id)
            state.projects[index] = project
        },
        [DELETE_PROJECT](state, id: string) {
            state.projects = state.projects.filter(projects => projects.id !== id)
        },
        [NOTIFY](state, newNotification: INotification) {
            newNotification.id = new Date().getTime()
            state.notifications.push(newNotification)

            setTimeout(()=>{
                state.notifications = state.notifications.filter(notification => notification.id !== newNotification.id)
            },3000)
        }
    }
})

export function useStore(): Store<State> {
    return vuexUseStore(key)
}