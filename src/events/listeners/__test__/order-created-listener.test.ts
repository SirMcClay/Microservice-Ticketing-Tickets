import { Message } from 'node-nats-streaming';
import mongoose, { mongo } from 'mongoose';
import { OrderCreatedEvent, OrderStatus } from '@sirmctickets/commontickets';
import { OrderCreatedListener } from '../order-created-listener';
import { natsWrapper } from '../../../nats-wrapper';
import { Ticket } from '../../../models/ticket';

const setup = async () => {
	// Create an instance of the listener
	const listener = new OrderCreatedListener(natsWrapper.client);

	// Create and save a ticket
	const ticket = Ticket.build({
		userId: 'no-matter-id',
		title: 'Concert',
		price: 20,
	});
	await ticket.save();

	// Create the fake data event
	const data: OrderCreatedEvent['data'] = {
		id: mongoose.Types.ObjectId().toHexString(),
		version: 0,
		status: OrderStatus.Created,
		userId: 'no-matter-id',
		expiresAt: 'no-matter-timestamp',
		ticket: {
			id: ticket.id,
			price: ticket.price,
		},
	};

	// Create the fake message object
	// @ts-ignore
	const msg: Message = {
		ack: jest.fn(),
	};

	return { listener, ticket, data, msg };
};
