import { Publisher, Subjects, TicketUpdatedEvent } from '@radix-soft/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
