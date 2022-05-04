import IProject from "./IProject";

export default interface ITask {
    id: number,
    timeInSecconds: number,
    description: string,
    project: IProject
}