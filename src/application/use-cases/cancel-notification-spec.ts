import { Content } from "@application/entities/content";
import { Notification } from "@application/entities/notification";
import { InMemoryNotificationRepository } from "../../../test/repositories/in-memory-notification-repository";
import { CancelNotification } from "./cancel-notification";

describe('Cancel notification', () => {
    it('Deve ser possivel cancelar uma notificação', async () => {
        const notificationReposotory = new InMemoryNotificationRepository();
        const cancelNotification = new CancelNotification(notificationReposotory);

        const notification = new Notification({
            category: 'teste',
            content: new Content("Notificação de teste"),
            recipientId: '123'
        });

        await notificationReposotory.create(notification);

        await cancelNotification.execute({
            notificationId: notification.id,
        });

        expect(notificationReposotory.notifications[0].canceledAt).toEqual(expect.any(Date));
    });

    it('Não deve ser possivel cancelar uma notificação que não existe', async () => {
        const notificationReposotory = new InMemoryNotificationRepository();
        const cancelNotification = new CancelNotification(notificationReposotory);

        expect(() => {
            return cancelNotification.execute({
                notificationId: '123',
            });
        }).rejects.toThrowError('Notification not found');

    });
});