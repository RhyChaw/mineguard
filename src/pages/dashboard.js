import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import styles from '../styling/dashboard.module.css'; // Import the CSS module for styling

function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <Link to="/health" className={styles.column1}>
        <h2 className={styles.text_above}>Miner Health</h2>
      </Link>
      <Link to="/air" className={styles.column2}>
        <h2 className={styles.text_above}>AIR Index</h2>
        <h2>Load analysis</h2>
      </Link>
      <Link to="/soil" className={styles.column3}>
        <h2 className={styles.text_above}>Soil Composition</h2>
        <button className={styles.text_above}>View Map</button>
      </Link>
      <Link to="/waste" className={styles.column4}>
        <h2 className={styles.text_above}>Waste Segregation</h2>
      </Link>
    </div>
  );
}

export default Dashboard;
