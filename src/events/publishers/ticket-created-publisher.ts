import {
	Publisher,
	Subjects,
	TicketCreatedEvent,
} from '@sirmctickets/commontickets';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
	readonly subject = Subjects.TicketCreated;
}
