import { Content } from './content';

describe('Notification content tests', () => {
    //O expect dessa função espera que o valor retornado seja valido
    it('Deve ser possivel criar uma notificações', () => {
        const content = new Content('Notificação de teste');
        expect(content).toBeTruthy();
    });

    //O expect dessa função espera que um erro seja lançado
    it('Espero que não deva ser possivel criar essa notificação com menos de 3 char', () => {
        expect(() => new Content('aaa')).toThrow();
    });

    //O expect dessa função espera que um erro seja lançado
    it('Espero que não deva ser possivel criar essa notificação com mais de 255 char', () => {
        expect(() =>  new Content('a'.repeat(256))).toThrow();
    });
});