import React from "react";
import styles from './Balance.module.css';

const Balance: React.FC = () => {
    // Fake balance value
    const balance = 1000;

    return (
        <div className={styles.balanceContainer}>
            <span>Balance: ${balance.toFixed(2)}</span>
        </div>
    );
};

export default Balance;