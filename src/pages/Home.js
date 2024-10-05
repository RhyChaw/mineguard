import React from 'react';
import styles from '../styling/home.module.css';
import Navbar from '../components/Navbar';

function Home() {
  return (
    <div className={styles.main}>
      <Navbar />
      
      {/* Background section */}
      <div className={styles.hero}>
        <div className={styles.overlay}>
          <h1 className={styles.heroText}>
            MineGuard! <br /> Protect the Ecosystem and Our Miners
          </h1>
        </div>
      </div>

      {/* Info section */}
      <div className={styles.infoSection}>
        <div className={styles.infoBox}>
          <h2>Feature 1</h2>
          <p>Mining is a critical industry, but it produces large amounts of waste,
            endangers wildlife, and exposes miners to hazardous conditions. MineGuard 
            is here to balance productivity with environmental and human safety.</p>
        </div>
        <div className={styles.infoBox}>
          <h2>Feature 2</h2>
          <p>Minimize waste by segregating materials on-site.
            Analyze soil composition post-mining and suggest restoration strategies like reforestation.
            Monitor pollution levels in real-time and alert miners to hazardous conditions.
            Protect miners’ health by tracking their working hours and alerting them when they’ve been exposed to 
            high noise or pollution for too long.</p>
        </div>
        <div className={styles.infoBox}>
          <h2>Feature 3</h2>
          <p>Some information about feature 3.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
