const apiFetcher = require('./api/api_fetcher');

describe('testing `/message` endpoint 🔨 ....', () => {
  let pepitoID;
  let mariaID;
  const idOfMessages = [];
  const messages = [];
  describe('lets create two users (Pepito and Maria) before sending some messages.', () => {
    it('the user created should be Pepito.', async () => {
      expect.hasAssertions();
      const data = await apiFetcher.createUser('Pepito');
      pepitoID = data.id;
      expect(data.user).toStrictEqual('Pepito');
    });
    it('the user created should be Maria.', async () => {
      expect.hasAssertions();
      const data = await apiFetcher.createUser('Maria');
      mariaID = data.id;
      expect(data.user).toStrictEqual('Maria');
    });
  });
  describe('send some meesages between Pepito and Maria.', () => {
    it('pepito sends "Hola" to Maria.', async () => {
      expect.hasAssertions();
      const data = await apiFetcher.sendMessage('Hola', pepitoID, mariaID);
      idOfMessages.push(data.id);
      messages.push(data.message);
      expect(data.message).toStrictEqual('Hola');
    });
    it('pepito sends "Como estas?" to Maria.', async () => {
      expect.hasAssertions();
      const data = await apiFetcher.sendMessage(
        'Como estas?',
        pepitoID,
        mariaID,
      );
      idOfMessages.push(data.id);
      messages.push(data.message);
      expect(data.message).toStrictEqual('Como estas?');
    });
    it('maria sends "Muy bien" to Pepito.', async () => {
      expect.hasAssertions();
      const data = await apiFetcher.sendMessage(
        'Muy bien',
        mariaID,
        pepitoID,
      );
      idOfMessages.push(data.id);
      messages.push(data.message);
      expect(data.message).toStrictEqual('Muy bien');
    });
  });
  describe('get all messages and confirm if all 3 have been created.', () => {
    it('all messages should be return as type array.', async () => {
      expect.hasAssertions();
      const data = await apiFetcher.getAll('messages');
      expect(Array.isArray(data)).toStrictEqual(true);
    });
    it('confirm messages is being sended.', async () => {
      expect.hasAssertions();
      const message = await apiFetcher.getById(
        'messages',
        idOfMessages[0],
      );
      expect(messages).toContain(message.message);
    });
  });
  describe('delete all 3 messages that have been created.', () => {
    it('delete all 3 message', async () => {
      expect.hasAssertions();
      const message0 = await apiFetcher.delete('messages', idOfMessages[0]);
      expect(message0.msg).toStrictEqual('Mensaje eliminado exitosamente.');
      const message1 = await apiFetcher.delete('messages', idOfMessages[1]);
      expect(message1.msg).toStrictEqual('Mensaje eliminado exitosamente.');
      const message2 = await apiFetcher.delete('messages', idOfMessages[2]);
      expect(message2.msg).toStrictEqual('Mensaje eliminado exitosamente.');
    });
  });
  describe('delete Pepito and Maria from the users database.', () => {
    it('delete Pepito', async () => {
      expect.hasAssertions();
      const user = await apiFetcher.delete('users', pepitoID);
      expect(user.id).toStrictEqual(pepitoID);
    });
    it('delete Maria', async () => {
      expect.hasAssertions();
      const user = await apiFetcher.delete('users', mariaID);
      expect(user.id).toStrictEqual(mariaID);
    });
  });
});
