import React, { useState, useEffect } from 'react';

/* Components */
import Tooltip from '../Tooltip/Tooltip.js';
import ProgressBar from '../ProgressBar/ProgressBar.js';
import PledgeForm from '../PledgeForm/PledgeForm.js';
import NotificationMessage from '../NotificationMessage/NotificationMessage.js';

import styles from './fundraiserWidget.module.css';

export default function FundraiserWidget() {
  const [currentFundingValue, setCurrentFundingValue] = useState(0);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [notificationOption, setNotificationOption] = useState({
    message: '',
    type: '',
    show: false,
  });

  const daysLeft = 3;
  const goalFundingValue = 1000;
  const currency = '$';

  const handlePledge = (pledgeAmount) => {
    setCurrentFundingValue(currentFundingValue + pledgeAmount);
    setNotificationOption({
      message: 'Thank you for your pledge!',
      type: 'success',
      show: true,
    });
  };

  const handleError = () => {
    setNotificationOption({
      message: `Please enter a correct sum of ${currency}!`,
      type: 'error',
      show: true,
    });
  };

  //Changes the current progress if pledge is done
  useEffect(() => {
    const progressPercentage = (currentFundingValue / goalFundingValue) * 100;
    //Rounds to 1 decimals
    setCurrentProgress(Math.round(progressPercentage * 10) / 10);
  }, [currentFundingValue]);

  const closeNotification = () => {
    setNotificationOption({ show: false });
  };

  return (
    <div className={styles['widget__container']}>
      <h2>The fundraising widget</h2>
      <Tooltip progress={currentProgress} />
      <div className={styles['box-frame']}>
        <ProgressBar progress={currentProgress} />
        <div className={styles['box-frame__content']}>
          <p>
            Only <strong>{daysLeft}</strong> days left to fund this project,{' '}
            <strong>{currentFundingValue + currency}</strong> has been raised towards the goal to raise{' '}
            <strong>{goalFundingValue + currency}</strong>.
          </p>
          <p>
            Pledge money by entering the sum in the field below and press pledge, we already know your credit card
            details.
          </p>
          {notificationOption.type !== 'success' && (
            <PledgeForm
              handlePledge={handlePledge}
              currency={currency}
              handleError={handleError}
              closeNotification={closeNotification}
            />
          )}
          {notificationOption.show && (
            <NotificationMessage
              message={notificationOption.message}
              type={notificationOption.type}
              closeNotification={closeNotification}
            />
          )}
        </div>
      </div>
    </div>
  );
}
