import { Message } from 'node-nats-streaming';
import {
	Listener,
	OrderCreatedEvent,
	Subjects,
} from '@sirmctickets/commontickets';
import { queueGroupName } from './queueGroupName';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
	readonly subject = Subjects.OrderCreated;
	queueGroupName = queueGroupName;

	async onMessage(data: OrderCreatedEvent['data'], msg: Message) {}
}
