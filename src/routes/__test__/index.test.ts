import request from 'supertest';
import { app } from '../../app';

const createTicket = (title: string, price: number) => {
	return request(app).post('/api/tickets').set('Cookie', global.signin()).send({
		title,
		price,
	});
};

it('can fetch a list of tickets', async () => {
	await createTicket('Title 1', 10);
	await createTicket('Title 2', 20);
	await createTicket('Title 3', 30);

	const response = await request(app).get('/api/tickets').send().expect(200);

	expect(response.body.length).toEqual(3);
});
