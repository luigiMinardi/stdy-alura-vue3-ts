import IProject from "./IProject";

export default interface ITask {
    timeInSecconds: number,
    description: string,
    project: IProject
}