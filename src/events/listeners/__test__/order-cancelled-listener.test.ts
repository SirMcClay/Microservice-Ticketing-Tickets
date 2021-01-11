import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { OrderCancelledEvent } from '@sirmctickets/commontickets';
import { natsWrapper } from '../../../nats-wrapper';
import { OrderCancelledListener } from '../order-cancelled-listener';
import { Ticket } from '../../../models/ticket';

const setup = async () => {
	const listener = new OrderCancelledListener(natsWrapper.client);

	const orderId = mongoose.Types.ObjectId().toHexString();
	const ticket = Ticket.build({
		title: 'Concert',
		price: 20,
		userId: 'no-matter-id',
	});
	ticket.set({ orderId });
	await ticket.save();

	const data: OrderCancelledEvent['data'] = {
		id: orderId,
		version: 0,
		ticket: {
			id: ticket.id,
		},
	};

	// @ts-ignore
	const msg: Message = {
		ack: jest.fn(),
	};

	return { listener, ticket, data, msg, orderId };
};
