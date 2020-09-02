import React from 'react';
import styles from './progressBar.module.css';

export default function ProgressBar({ progress }) {
  return (
    <div className={styles['progress-bar__container']}>
      <div
        className={`${styles['progress-bar__bar']} 
          ${progress < 100 ? styles['progress-bar--in-progress'] : styles['progress-bar--finished']} `}
        style={{ width: progress + '%' }}
      />
    </div>
  );
}
