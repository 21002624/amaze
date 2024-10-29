import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const Pay = () => {
  const [pinCode, setPinCode] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [inputPin, setInputPin] = useState('');

  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);

  const handlePinChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,6}$/.test(value)) {
      setInputPin(value);
    }
  };

  const handleSubmitPin = () => {
    if (inputPin.length === 6) {
      setPinCode(inputPin);
      handleClosePopup();
    } else {
      alert("Please enter a 6-digit pin code.");
    }
  };

  return (
    <div>
      <Button 
        className='pinBtn' 
        variant="outlined" 
        color="error" 
        onClick={handleOpenPopup}
      >
        {pinCode ? `PIN: ${pinCode}` : "ENTER PIN CODE"}
      </Button>

      <Dialog open={isPopupOpen} onClose={handleClosePopup}>
        <DialogTitle>Enter Pin Code</DialogTitle>
        <DialogContent>
          <TextField
            label="Pin Code"
            type="text"
            variant="outlined"
            value={inputPin}
            onChange={handlePinChange}
            inputProps={{ maxLength: 6 }}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopup} color="error">
            Close
          </Button>
          <Button onClick={handleSubmitPin} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Pay;
