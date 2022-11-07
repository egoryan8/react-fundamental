import React from 'react';
import styles from './MyModal.module.css';

const MyModal = ({ children, visible, setVisible }) => {
  const rootClases = [styles.myModal];
  if (visible) {
    rootClases.push(styles.myModalActive);
  }

  return (
    <div className={rootClases.join(' ')} onClick={() => setVisible(false)}>
      <div className={styles.myModalContent} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default MyModal;
