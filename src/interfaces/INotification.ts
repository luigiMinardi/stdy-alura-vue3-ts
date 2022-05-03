export enum NotificationType {
    SUCESS,
    FAIL,
    ATTENTION
}

export interface INotification {
    title: string,
    text: string,
    type: NotificationType,
    id: number
}