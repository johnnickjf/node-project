import { Content } from "@application/entities/content";
import { Notification } from "@application/entities/notification";
import { InMemoryNotificationRepository } from "../../../test/repositories/in-memory-notification-repository";
import { CancelNotification } from "./cancel-notification";
import { ReadNotification } from "./read-notification";

describe('read notification', () => {
    it('Deve ser possivel read uma notificação', async () => {
        const notificationReposotory = new InMemoryNotificationRepository();
        const readNotification = new ReadNotification(notificationReposotory);

        const notification = new Notification({
            category: 'teste',
            content: new Content("Notificação de teste"),
            recipientId: '123'
        });

        await notificationReposotory.create(notification);

        await readNotification.execute({
            notificationId: notification.id,
        });

        expect(notificationReposotory.notifications[0].readAt).toEqual(expect.any(Date));
    });

    it('Não deve ser possivel read uma notificação que não existe', async () => {
        const notificationReposotory = new InMemoryNotificationRepository();
        const readNotification = new ReadNotification(notificationReposotory);

        expect(() => {
            return readNotification.execute({
                notificationId: '123',
            });
        }).rejects.toThrowError('Notification not found');

    });
});