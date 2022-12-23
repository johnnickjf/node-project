import { Content } from "@application/entities/content";
import { Notification } from "@application/entities/notification";
import { InMemoryNotificationRepository } from "../../../test/repositories/in-memory-notification-repository";
import { GetRecipientNotification } from "./get-recipient-notification";

describe('get recipent', () => {
    it('get recipent', async () => {
        const notificationReposotory = new InMemoryNotificationRepository();
        const getRecipient = new GetRecipientNotification(notificationReposotory);

        const notification = new Notification({
            category: 'teste',
            content: new Content("Notificação de teste"),
            recipientId: '123'
        });

        await notificationReposotory.create(notification);

        const notification1 = new Notification({
            category: 'teste',
            content: new Content("Notificação de teste"),
            recipientId: '123'
        });

        const { notifications } = await getRecipient.execute({
            recipientId: notification1.recipientId
        });

        expect(notifications).toHaveLength(2);
    });
});