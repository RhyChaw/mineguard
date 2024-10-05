import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import styles from '../styling/navbar.module.css'; // Import the CSS module for styling
import Logo from "../images/Logo.png"

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">
          <img src={Logo} height={80} width={200} alt="MineGuard Logo" />
        </Link>
      </div>
      <div className={styles.login}>
        <Link to="/dashboard">
          <button className={styles.loginBtn}>Login</button>
        </Link>
      </div>
    </nav>
  );
}
