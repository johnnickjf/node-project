import { Content } from "@application/entities/content";
import { Notification } from "@application/entities/notification";
import { InMemoryNotificationRepository } from "../../../test/repositories/in-memory-notification-repository";
import { CancelNotification } from "./cancel-notification";
import { CountRecipientNotification } from "./count-notification";

describe('Count notification', () => {
    it('Conta notificação', async () => {
        const notificationReposotory = new InMemoryNotificationRepository();
        const countNotification = new CountRecipientNotification(notificationReposotory);

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

        const { count } = await countNotification.execute({
            recipientId: notification1.recipientId
        });

        expect(count).toEqual(2);
    });
});