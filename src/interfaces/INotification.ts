export enum TypeNotification {
    SUCESS,
    FAIL,
    ATTENTION
}

export interface INotification {
    title: string,
    text: string,
    type: TypeNotification,
    id: number
}