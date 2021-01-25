import Queue from 'bull';
import { ExpirationCompletePublisher } from '../events/publishers/expiration-complete-publisher';
import { natsWrapper } from '../nats-wrapper';

interface Payload {
  orderId: string;
}

const expirationQueue = new Queue<Payload>(
  'order:expiration', // name used by the bucket in Redis
  {
    redis: {
      host: process.env.REDIS_HOST, // define Redis host
  },
});

// after Redis server sends the job back to us
// handling job
expirationQueue.process(async (job) => {
  new ExpirationCompletePublisher(natsWrapper.client).publish({
    orderId: job.data.orderId
  });
});

export { expirationQueue };
