import { Publisher, OrderCreatedEvent, Subjects } from '@radix-soft/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
