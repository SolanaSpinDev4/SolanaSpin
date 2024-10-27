import React from 'react';
import styles from './Header.module.css'; // Import the styles
import {ConnectBtn} from './connectButton'; // Import your ConnectBtn component

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <div className={styles.leftButtons}>
                <button className={styles.button}>Deposit</button>
                <button className={styles.button}>Withdraw</button>
            </div>
            <div className={styles.title}>Roulette</div>
            {/*<div className={styles.rightButtons}>*/}
            {/*    <button className={styles.button}>Roadmap</button>*/}
            {/*    <button className={styles.button}>Raffle</button>*/}
            {/*</div>*/}
            <div className={`z-10 ${styles.connectBtnContainer}`}>
                <ConnectBtn/>
            </div>
        </header>
    );
};

export default Header;
