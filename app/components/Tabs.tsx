import React, { useState } from 'react';
import RouletteWheel from './RouletteWheel';
import styles from './Tabs.module.css';

const Tabs: React.FC = () => {
    const [activeTab, setActiveTab] = useState(1);
    const [keys, setKeys] = useState([`tab-1-${Date.now()}`, `tab-2-${Date.now()}`, `tab-3-${Date.now()}`]);

    const handleTabClick = (tab: number) => {
        // Update the key of the tabs to force re-render and reset the state of wheels
        const newKeys = keys.map((key, index) =>
            (index + 1) === tab ? `tab-${index + 1}-${Date.now()}` : key
        );
        setKeys(newKeys);
        setActiveTab(tab);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 1:
                return <RouletteWheel key={keys[0]} color="blue" />;
            case 2:
                return <RouletteWheel key={keys[1]} color="green" />;
            case 3:
                return <RouletteWheel key={keys[2]} color="white" />;
            default:
                return null;
        }
    };

    return (
        <div>
            <div className={styles.tabButtons}>
                <button
                    onClick={() => handleTabClick(1)}
                    className={activeTab === 1 ? styles.active : ''}
                >
                    Normal
                </button>
                <button
                    onClick={() => handleTabClick(2)}
                    className={activeTab === 2 ? styles.active : ''}
                >
                    Degen
                </button>
                <button
                    onClick={() => handleTabClick(3)}
                    className={activeTab === 3 ? styles.active : ''}
                >
                    Retardio
                </button>
            </div>
            <div className={styles.tabContent}>{renderContent()}</div>
        </div>
    );
};

export default Tabs;