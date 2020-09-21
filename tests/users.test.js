const api_fetcher = require('./api/api_fetcher');
const getType = require('jest-get-type');

beforeAll(() => console.log('Testing `/users` API 🔨 ...'));

let uuid;
let user;

describe('POST request', () => {
	test('The user created should be Pepito.', async () => {
		const data = await api_fetcher.createUser('Pepito');
		uuid = data['uuid'];
		user = data['user'];
		expect(data['user']).toBe('Pepito');
	});
});

describe('GET request', () => {
	test('All users should be return as type array.', async () => {
		const data = await api_fetcher.getAll('users');
		expect(getType(data)).toEqual('array');
	});

	test('User should return "Pepito".', async () => {
		const data = await api_fetcher.getById('users', uuid);
		expect(data['user']).toEqual('Pepito');
	});
});

describe('PUT request', () => {
	test('The user created should be renamed to Jose.', async () => {
		const data = await api_fetcher.updateUser(uuid, 'Jose');
		expect(data['newUser']).toEqual('Jose');
	});
});

describe('DELETE request', () => {
	test('The user deleted should be Jose', async () => {
		const data = await api_fetcher.delete('users', uuid);
		expect(data['uuid']).toEqual(uuid);
	});
}); 

afterAll(() => console.log('All tests has finished 🙌 ...'));


// TODOS
// [ ] 1. Add assertions, async tests may fail.
//				If you expect a promise to be rejected, use the `.catch` method.
//				Make sure to add `expect.assertions`` to verify that a certain number of 
//				assertions are called. Otherwise a fulfilled promise would not fail the test.
//				url => https://jestjs.io/docs/en/asynchronous
// [ ] 2. Make sure the user is properly deleted. 
//				After deleting Jose, check for Jose again in the database. This API call should fail,
// 				so complete the first step after doing this one.