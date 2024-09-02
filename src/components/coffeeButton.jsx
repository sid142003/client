import React, { useState } from 'react';
import { Fab, Tooltip, Dialog, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

import { DialogActions } from '@mui/material';

function CoffeeButton() {
    const [open, setOpen] = useState(false);
    const [amount, setAmount] = useState('');

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleAmountChange = (e) => setAmount(e.target.value);

    return (
        <>
            <Tooltip title="Support us by buying a coffee!" placement="left">
                <Fab color="primary" aria-label="buy coffee" onClick={handleClickOpen} style={{ position: 'fixed', right: 20, bottom: 20 }}>
                    <LocalCafeIcon />
                </Fab>
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Buy Us a Coffee</DialogTitle>
    <DialogContent>
        <TextField
            autoFocus
            margin="dense"
            id="amount"
            label="Donation Amount ($)"
            type="number"
            fullWidth
            value={amount}
            onChange={handleAmountChange}
        />
       <PayPalButtons
  createOrder={(data, actions) => {
    return actions.order.create({
      purchase_units: [{
        amount: {
          value: `${amount}` // Ensure this is a string and correctly formatted
        }
      }]
    });
  }}
  onApprove={(data, actions) => {
    return actions.order.capture().then(details => {
      alert('Transaction completed by ' + details.payment_source.bancontact.name);
    });
  }}
  onError={(err) => {
    console.error('Error from PayPal', err);
  }}
/>

    </DialogContent>
    <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
    </DialogActions>
</Dialog>

        </>
    );
}

export default CoffeeButton;
