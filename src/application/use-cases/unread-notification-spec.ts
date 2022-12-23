import { Content } from "@application/entities/content";
import { Notification } from "@application/entities/notification";
import { InMemoryNotificationRepository } from "../../../test/repositories/in-memory-notification-repository";
import { CancelNotification } from "./cancel-notification";
import { ReadNotification } from "./read-notification";
import { UnreadNotification } from "./unread-notification";

describe('Unread notification', () => {
    it('Deve ser possivel Unread uma notificação', async () => {
        const notificationReposotory = new InMemoryNotificationRepository();
        const unReadNotification = new UnreadNotification(notificationReposotory);

        const notification = new Notification({
            category: 'teste',
            content: new Content("Notificação de teste"),
            recipientId: '123',
            readAt: new Date()
        });

        await notificationReposotory.create(notification);

        await unReadNotification.execute({
            notificationId: notification.id,
        });

        expect(notificationReposotory.notifications[0].readAt).toBeNull();
    });

    it('Não deve ser possivel Unread uma notificação que não existe', async () => {
        const notificationReposotory = new InMemoryNotificationRepository();
        const unReadNotification = new UnreadNotification(notificationReposotory);

        expect(() => {
            return unReadNotification.execute({
                notificationId: '123',
            });
        }).rejects.toThrowError('Notification not found');

    });
});