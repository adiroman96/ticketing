import { Subjects, Publisher, OrderCancelledEvent } from '@radix-soft/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
