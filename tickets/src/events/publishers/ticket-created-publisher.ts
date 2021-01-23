import { Publisher, Subjects, TicketCreatedEvent } from '@radix-soft/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
