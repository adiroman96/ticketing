import { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';

const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft(); // display time left as you enter the page
    const timerId = setInterval(findTimeLeft, 1000);//ms <- displays only 1 second after the comp was rendered

    return () => {
      clearInterval(timerId);
    };
  }, [order]);

  if(timeLeft < 0){
    return <div>Order expired.</div>
  }

  return <div>Time left to pay: {timeLeft} seconds
  <StripeCheckout
    token={(token) => console.log(token)}
    stripeKey="pk_test_51IDTLZE3PN5usw17AuerHFJmvFvm6jlW8bXcKXOrZ3WimyCeTciIN3eyJJtbUyUhXhjlFRiQgjcguggLkl3gwVx500HkXZUxdV"
    amount={order.ticket.price * 100}
    email={currentUser.email}
    currency='ron'
  />
  </div>;
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default OrderShow;
