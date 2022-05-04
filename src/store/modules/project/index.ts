import http from "@/http";
import IProject from "@/interfaces/IProject";
import { State } from "@/store";
import { GET_PROJECTS, CREATE_PROJECT, CHANGE_PROJECT, DESTROY_PROJECT } from "@/store/actions";
import { ADD_PROJECT, EDIT_PROJECT, DELETE_PROJECT, DEFINE_PROJECTS } from "@/store/mutations";
import { Module } from "vuex";

export interface StateProject {
    projects: IProject[]
}

export const project: Module<StateProject, State> = {
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
    },
    actions: {
        [GET_PROJECTS]({ commit }) {
            http.get('projects')
                .then(res => commit(DEFINE_PROJECTS, res.data))
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
}