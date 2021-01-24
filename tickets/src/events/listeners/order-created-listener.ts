import { Message } from 'node-nats-streaming';
import { Listener, OrderCreatedEvent, Subjects } from '@radix-soft/common';
import { queueGroupName } from './queue-group-name';
import { Ticket } from '../../models/ticket';
import { TicketUpdatedPublisher } from '../publishers/ticket-updated-publisher';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    // Find the ticket that the order is reserving
    const ticket = await Ticket.findById(data.ticket.id);

    // If no ticket, throw error
    if(!ticket){
      throw new Error("Ticket not found");
    }

    // Mark ticket as RESERVED by setting orderId
    ticket.set({orderId: data.id});

    // Save ticket
    await ticket.save();

    // Emit event
    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      price: ticket.price,
      title: ticket.title,
      userId: ticket.userId,
      orderId: ticket.orderId,
      version: ticket.version
    });

    // ack message
    msg.ack();
    
  }
}
