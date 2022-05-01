import IProject from "@/interfaces/IProject";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from 'vuex';

interface State {
    projects: IProject[]
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state: {
        projects: []
    },
    mutations: {
        'ADD_PROJECT'(state, nameOfTheProject: string) {
            const project = {
                id: new Date().toISOString(),
                name: nameOfTheProject
            } as IProject
            state.projects.push(project)
        }
    }
})

export function useStore(): Store<State> {
    return vuexUseStore(key)
}