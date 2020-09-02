import React from 'react';

import styles from './toolTip.module.css';

export default function Tooltip({ progress }) {
  return (
    <div className={styles.tooltip}>
      <strong>{progress}%</strong> of the goal funded
    </div>
  );
}
