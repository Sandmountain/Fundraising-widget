import React, { useState } from 'react';
import styles from './pledgeForm.module.css';

export default function PledgeForm({ handlePledge, handleError, currency, closeNotification }) {
  const [pledgeAmount, setPledgeAmount] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [validInput, setValidInput] = useState(true);

  // Handles the submission from the form input
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validInput) return false;

    if (pledgeAmount) {
      setInputValue('');
      setPledgeAmount(0);
      handlePledge(pledgeAmount);
    } else {
      setValidInput(false);
      handleError();
    }
  };

  // Handles the changes for the input field.
  const handleChange = (event) => {
    const input = event.target.value;
    setInputValue(input);

    if (isValidInput(input) || input === '') {
      setValidInput(true);
      setPledgeAmount(Number(input));
      closeNotification();
    } else {
      setValidInput(false);
      handleError();
    }
  };

  // Uses Regex to checks wether the input is a number
  const isValidInput = (input) => {
    return /^\d+$/.test(input);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder={`Enter your donation in ${currency}`}
        type="text"
        value={inputValue}
        className={validInput ? styles['input--valid'] : styles['input--error']}
        onChange={handleChange}
      />
      {validInput && <input aria-label="Submit" type="submit" value="Pledge" />}
    </form>
  );
}
