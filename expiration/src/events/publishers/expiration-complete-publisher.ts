import { Publisher, Subjects, ExpirationCompleteEvent } from '@radix-soft/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
