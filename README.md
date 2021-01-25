# NextJS Server Side Web Application +  ReactJS Microservices
This project is a proof of concept containing a SSR web client and a couple of back-end microservices all written using the ReactJS and TypeScript. This project is mainly used for learning purposes only.

## Functionalities
A <b>user</b> can:
 Functionality      | REST API | 
| :---        |    :----:   | 
| create a ticket that he wants to sell      | POST /api/tickets/new     | 
| see a list of all available tickets   | GET /api/tickets | 
| select a ticket to view more details | GET /api/tickets/:id |
| create an order to buy the ticket | POST /api/orders |
| pay for the ticket | POST /api/payments |
| see a list of orders completed(payed)/ cancelled | GET /api/orders |
---
# Diagrams

Below are presented some c4 diagrams.

## System diagram

```mermaid
graph TD
    User([User])-.-uses-.->MySystem(Ticketing application)
    MySystem-.->PaymentSystem(Payment System)
    PaymentSystem-.- gets[gets ticket]-.->User
```

# Container diagram (of Ticketing application)

```mermaid
flowchart TD
    Client-->AuthService
    Client-->TicketService
    Client-->OrdersService
    Client-->PaymentService

    TicketService<-.->NatsStreamingService
    OrdersService<-.->NatsStreamingService
    PaymentService<-.->NatsStreamingService

    ExpirationService<-.->NatsStreamingService
```

# Component diagram (of Client)

```mermaid
graph TD
    Client-->AuthController
    Client-->TicketsController
    Client-->OrdersController
    Client-->PaymentsController
    subgraph web
    AuthController
    TicketsController
    OrdersController
    PaymentsController
    end
    subgraph auth
    AuthService
    end
    subgraph tickets
    TicketsService
    end
    subgraph orders
    OrdersService
    end
    subgraph payments
    PaymentsService
    end
    AuthController-->AuthService
    TicketsController-->TicketsService
    OrdersController-->OrdersService
    PaymentsController-->PaymentsService
```

# Component diagram (of AuthService)

```mermaid
graph TD
    Client-->AuthService
    AuthService-->MongoDB
```

# Component diagram (of TicketService)

```mermaid
graph TD
    Client-->TicketService
    TicketService-->MongoDB
```

# Component diagram (of OrdersService)

```mermaid
graph TD
    Client-->OrdersService
    OrdersService-->MongoDB
```

# Component diagram (of PaymentsService)

```mermaid
graph TD
    Client-->PaymentsService
    PaymentsService-->MongoDB
```

# Code diagram for tickets

```mermaid
classDiagram

    Publisher<|--TicketCreatedPublisher
    Publisher<|--TicketUpdatedPublisher
    Publisher : subject
    Publisher : client
    Publisher : publish()

    TicketCreatedPublisher : subject
    TicketCreatedPublisher : client
    TicketCreatedPublisher : publish()

    TicketUpdatedPublisher : subject
    TicketUpdatedPublisher : client
    TicketUpdatedPublisher : publish()

    Listener<|--OrderCreatedListener
    Listener<|--OrderCancelledListener
    Listener : subject
    Listener : queueGroupName
    Listener : onMessage()
    Listener : client
    Listener : ackWait
    Listener : listen()

    OrderCreatedListener : subject
    OrderCreatedListener : queueGroupName
    OrderCreatedListener : onMessage()
    OrderCreatedListener : client
    OrderCreatedListener : ackWait
    OrderCreatedListener : listen()

    OrderCancelledListener : subject
    OrderCancelledListener : queueGroupName
    OrderCancelledListener : onMessage()
    OrderCancelledListener : client
    OrderCancelledListener : ackWait
    OrderCancelledListener : listen()

    class Ticket 
    {
        id
        title
        price
        version
        userId
        orderId
    }

    Ticket <-- Index
    Ticket <-- New
    Ticket <-- Show
    Ticket <-- Update

    TicketCreatedPublisher <-- New
    TIcketUpdatedPublisher <-- Update    

```