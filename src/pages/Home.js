import React from 'react'
import styles from "../styling/home.module.css"
import Navbar from "../components/Navbar"

function Home() {
  return (
    <div className={styles.main}>
        <Navbar />
        Welcome to MineGuard,the one that protects your miner!
        
    </div>
  )
}

export default Home