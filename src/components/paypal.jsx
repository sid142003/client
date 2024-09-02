import React from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';

const PayPalPayment = ({ amount, onPaymentSuccess, onPaymentFailure }) => {
  return (
    <PayPalButtons
      style={{ layout: "vertical" }}
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: amount
            }
          }]
        });
      }}
      onApprove={(data, actions) => {
        return actions.order.capture().then(details => {
          onPaymentSuccess(details);
        }).catch((error) => {
          onPaymentFailure(error);
        });
      }}
      onError={(error) => {
        onPaymentFailure(error);
      }}
    />
  );
}

export default PayPalPayment;
