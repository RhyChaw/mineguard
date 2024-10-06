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
        <div className={styles.feature_box}>
          <div className={styles.feature_box_inner}>
            <div className={styles.feature_box_front}>
              <h2>Protect the Miners</h2>
            </div>
            <div className={styles.feature_box_back}>
              <p>MineGuard ensures that miners are safeguarded by continuously monitoring real-time pollution levels. Alerts are triggered when hazardous conditions such as toxic gases or high noise levels are detected, helping to prevent overexposure. We also track miners' working hours to optimize safety and well-being.</p>
            </div>
          </div>
        </div>

        <div className={styles.feature_box}>
          <div className={styles.feature_box_inner}>
            <div className={styles.feature_box_front}>
              <h2>Efficient Waste Disposal</h2>
            </div>
            <div className={styles.feature_box_back}>
              <p>MineGuard enables efficient waste management by helping segregate materials on-site. It analyzes soil composition to minimize environmental degradation and suggests restoration strategies like reforestation, ensuring the land is revitalized after mining activities.</p>
            </div>
          </div>
        </div>

        <div className={styles.feature_box}>
          <div className={styles.feature_box_inner}>
            <div className={styles.feature_box_front}>
              <h2>Ecosystem and Demographic Support</h2>
            </div>
            <div className={styles.feature_box_back}>
              <p>MineGuard supports not only the ecosystem but also nearby communities. It tracks the environmental impact and provides restoration suggestions, fostering sustainability in the surrounding areas. This includes offering demographic insights for safer and healthier surroundings.</p>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}

export default Home;
