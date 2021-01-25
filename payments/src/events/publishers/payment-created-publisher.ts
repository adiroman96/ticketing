import { Subjects, Publisher, PaymentCreatedEvent } from '@radix-soft/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
