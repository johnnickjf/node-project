import { SendNotification } from "./send-notification";
import { Notification } from "../entities/notification";
import { InMemoryNotificationRepository } from "../../../test/repositories/in-memory-notification-repository";

describe('Send notification', () => {
    it('Deve ser possivel enviar uma notificação', async () => {
        const notificationReposotory = new InMemoryNotificationRepository();
        const sendNotification = new SendNotification(notificationReposotory);

        const { notification } = await sendNotification.execute({
            recipientId: '123',
            content: 'Notificação de teste',
            category: 'teste'
        });

        console.log(notificationReposotory.notifications);
        expect(notificationReposotory.notifications).toHaveLength(1);
        expect(notificationReposotory.notifications[0]).toEqual(notification);

    });
});