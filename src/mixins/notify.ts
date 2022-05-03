import { NotificationType } from "@/interfaces/INotification";
import { NOTIFY } from "@/store/mutations";
import { store } from "@/store";

export const NotifyMixin = {
    methods: {
        notify(type: NotificationType, title: string, text: string): void {
            store.commit(NOTIFY, {
                title,
                text,
                type
            })
        }
    },
}