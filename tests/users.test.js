const apiFetcher = require('./api/api_fetcher');

describe('testing `/users` endpoint 🔨 ...', () => {
  let id;
  let user;
  describe('testing POST request...', () => {
    it('the user created should be Pepito.', async () => {
      expect.hasAssertions();
      const data = await apiFetcher.createUser('Pepito');
      id = data.id;
      user = data.user;
      expect(data.user).toBe('Pepito');
    });
  });
  describe('testing GET requests...', () => {
    it('all users should be return as type array.', async () => {
      expect.hasAssertions();
      const data = await apiFetcher.getAll('users');
      expect(Array.isArray(data)).toStrictEqual(true);
    });
    it('user should return "Pepito".', async () => {
      expect.hasAssertions();
      const data = await apiFetcher.getById('users', id);
      expect(data.user).toStrictEqual(user);
    });
  });
  describe('testing PUT requests...', () => {
    it('the user created should be renamed to Jose.', async () => {
      expect.hasAssertions();
      const data = await apiFetcher.updateUser(id, 'Jose');
      id = data.id;
      user = data.newUser;
      expect(data.newUser).toStrictEqual(user);
    });
  });
  describe('testing DELETE requests...', () => {
    it('the user deleted should be Jose', async () => {
      expect.hasAssertions();
      const data = await apiFetcher.delete('users', id);
      expect(data.id).toStrictEqual(id);
    });
  });
});
