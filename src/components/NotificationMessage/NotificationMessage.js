import React from 'react';

import styles from './notificationMessage.module.css';

export default function NotificationMessage({ message, type, closeNotification }) {
  return (
    <div
      className={`${styles.notification} 
       ${type === 'success' ? styles['notification--success'] : styles['notification--error']}`}>
      {message}{' '}
      <span className={styles['notification__close-text']} onClick={closeNotification}>
        Close
      </span>
    </div>
  );
}
