import { Notification } from "../../src/application/entities/notification";
import { NotificationRepository } from "../../src/application/repositories/notification-repository";

export class InMemoryNotificationRepository implements NotificationRepository {
    async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
        return this.notifications.filter((notification) => notification.recipientId === recipientId);
    }
    async countManyByRecipientId(recipientId: string): Promise<number> {
        return this.notifications.filter((notification) => notification.recipientId === recipientId).length;
    }
    public notifications: Notification[] = [];
    async findById(notificationId: string): Promise<Notification | null> {
        const notification = this.notifications.find((notification) => notification.id === notificationId);

        if (!notification) {
            return null;
        }

        return notification;
    }
    async save(notification: Notification): Promise<void> {
        const index = this.notifications.findIndex((notification) => notification.id === notification.id);

        if (index >= 0) {
            this.notifications[index] = notification;
        }
        
    }
    async create(notification: Notification) {
        this.notifications.push(notification);
    }
}