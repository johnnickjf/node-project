import { Notification } from './notification';
import { Content } from './content';
describe('Notification tests', () => {

    it('Deve ser possivel criar uma notificações', () => {
        const notification = new Notification({
            recipientId: '123',
            content: new Content('Notificação de teste'),
            category: 'teste'
        });
        expect(notification).toBeTruthy();
    });
});
