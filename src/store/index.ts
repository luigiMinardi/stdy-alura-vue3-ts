import http from "@/http";
import { INotification } from "@/interfaces/INotification";
import ITask from "@/interfaces/ITask";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from 'vuex';
import { CHANGE_TASK, CREATE_TASK, GET_TASKS } from "./actions";
import { project, StateProject } from "./modules/project";
import { NOTIFY, DEFINE_TASKS, ADD_TASKS, EDIT_TASK } from "./mutations";

export interface State {
    tasks: ITask[],
    notifications: INotification[],
    project: StateProject
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state: {
        tasks: [],
        notifications: [],
        project: {
            projects: []
        }
    },
    mutations: {
        [DEFINE_TASKS](state, tasks: ITask[]) {
            state.tasks = tasks
        },
        [ADD_TASKS](state, task: ITask) {
            state.tasks.push(task)
        },
        [EDIT_TASK](state, task: ITask) {
            const index = state.tasks.findIndex(task => task.id == task.id)
            state.tasks[index] = task
        },

        [NOTIFY](state, newNotification: INotification): void {
            newNotification.id = new Date().getTime()
            state.notifications.push(newNotification)

            setTimeout(() => {
                state.notifications = state.notifications.filter(notification => notification.id !== newNotification.id)
            }, 3000)
        }
    },
    actions: {
        [GET_TASKS]({ commit }) {
            http.get('tasks')
                .then(res => commit(DEFINE_TASKS, res.data))
                .catch(err => console.log(err))
        },
        async [CREATE_TASK]({ commit }, task: ITask) {
            return http.post('/tasks', task)
                .then(res => commit(ADD_TASKS, res.data))
        },
        async [CHANGE_TASK]({ commit }, task: ITask) {
            return http.put(`/tasks/${task.id}`, task)
                .then(res => commit(EDIT_TASK, res.data))
        },
    },
    modules: {
        project
    }
})

export function useStore(): Store<State> {
    return vuexUseStore(key)
}