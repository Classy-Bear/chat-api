const api_fetcher = require('./api/api_fetcher');
const getType = require('jest-get-type');

beforeAll(() => console.log('Testing `/message` API 🔨 ...'));

let uuid_pepito;
let user_pepito;

let uuid_maria;
let user_maria;

const messages_uuid = [];
const messages = [];

describe('Lets create two users (Pepito and Maria) before sending some messages.', () => {
	test('The user created should be Pepito.', async () => {
		const data = await api_fetcher.createUser('Pepito');
		uuid_pepito = data['uuid'];
		user_pepito = data['user'];
		expect(data['user']).toEqual('Pepito');
	});

	test('The user created should be Maria.', async () => {
		const data = await api_fetcher.createUser('Maria');
		uuid_maria = data['uuid'];
		user_maria = data['user'];
		expect(data['user']).toEqual('Maria');
	});
});

describe('Send some meesages between Pepito and Maria.', () => {
	test('Pepito sends "Hola" to Maria.', async () => {
		const data = await api_fetcher.sendMessage('Hola', uuid_pepito, uuid_maria);
		messages_uuid.push(data['uuid']);
		messages.push(data['message']);
		expect(data['message']).toEqual('Hola');
	});

	test('Pepito sends "Como estas?" to Maria.', async () => {
		const data = await api_fetcher.sendMessage('Como estas?', uuid_pepito, uuid_maria);
		messages_uuid.push(data['uuid']);
		messages.push(data['message']);
		expect(data['message']).toEqual('Como estas?');
	});

	test('Maria sends "Muy bien" to Pepito.', async () => {
		const data = await api_fetcher.sendMessage('Muy bien', uuid_maria, uuid_pepito);
		messages_uuid.push(data['uuid']);
		messages.push(data['message']);	
		expect(data['message']).toEqual('Muy bien');
	});
});

describe('GET all messages and confirm if all 3 have been created.', () => {
	test('All messages should be return as type array.', async () => {
		const data = await api_fetcher.getAll('messages');
		expect(getType(data)).toEqual('array');
	});

	test('Confirm messages is being sended.', async () => {
		const message = await api_fetcher.getById('messages/getMessage', messages_uuid[0]);
		expect(messages).toContain(message['message']);
	});
});

describe('Delete all 3 messages that have been created.', () => {
	test('Delete 1st message', async () => {
		const message = await api_fetcher.delete('messages', messages_uuid[0]);
		expect(message['msg']).toEqual('Mensajes eliminados exitosamente.');
	});

	test('Delete 2nd message', async () => {
		const message = await api_fetcher.delete('messages', messages_uuid[1]);
		expect(message['msg']).toEqual('Mensajes eliminados exitosamente.');
	});

	test('Delete 3rd message', async () => {
		const message = await api_fetcher.delete('messages', messages_uuid[2]);
		expect(message['msg']).toEqual('Mensajes eliminados exitosamente.');
	});
}); 

describe('Delete Pepito and Maria from the users database.', () => {
	test('Delete Pepito', async () => {
		const user = await api_fetcher.delete('users', uuid_pepito);
		expect(user['uuid']).toEqual(uuid_pepito);
	});
	test('Delete Pepito', async () => {
		const user = await api_fetcher.delete('users', uuid_maria);
		expect(user['uuid']).toEqual(uuid_maria);
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