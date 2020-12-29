import {
	Publisher,
	Subjects,
	TicketUpdatedEvent,
} from '@sirmctickets/commontickets';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
	readonly subject = Subjects.TicketUpdated;
}
