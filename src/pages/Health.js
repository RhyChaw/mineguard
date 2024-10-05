import React, { useEffect, useState, useRef } from 'react';
import RecordRTC from 'recordrtc';
import Navbar from '../components/Navbar';
import styles from '../styling/health.module.css';

function Health() {
  const [timeWorked, setTimeWorked] = useState(0); // Timer in seconds
  const [isSessionActive, setIsSessionActive] = useState(false); // To track if session is active
  const [isPaused, setIsPaused] = useState(false); // To track if timer is paused
  const [isStopped, setIsStopped] = useState(false); // To track if session is stopped
  const [minerDetails, setMinerDetails] = useState({
    name: '',
    bloodReport: '',
    otherInfo: ''
  });

  const [noiseDuration, setNoiseDuration] = useState(0); // Timer for prolonged noise
  const visualizerRef = useRef(null); // Ref for RecordRTC visualizer
  let recordAudio;

  // Timer effect for work time
  useEffect(() => {
    let timer;
    if (isSessionActive && !isPaused && !isStopped) {
      timer = setInterval(() => {
        setTimeWorked(prevTime => prevTime + 1); // Increase time by 1 second
      }, 1000);
    }

    if (timeWorked >= 3600) { // 1 hour
      alert("Warning: Working for too long!");
      clearInterval(timer); // Stop timer if necessary
    }

    return () => clearInterval(timer); // Clean up timer
  }, [timeWorked, isSessionActive, isPaused, isStopped]);

  // Audio detection and visualizer using RecordRTC
  useEffect(() => {
    async function initAudio() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
        recordAudio = RecordRTC(stream, {
          type: 'audio',
          bufferSize: 16384,
          sampleRate: 44100,
          ondataavailable: function () {}, // No need to handle data for real-time visualizer
        });

        // Start recording
        recordAudio.startRecording();

        // Attach visualizer
        recordAudio.getInternalRecorder().getVisualizer(visualizerRef.current, {
          width: 400, // Customize visualizer width
          height: 100, // Customize visualizer height
        });
      } catch (error) {
        console.error('Error accessing the microphone', error);
      }
    }

    initAudio();

    return () => {
      // Stop recording and clean up when component unmounts
      if (recordAudio) {
        recordAudio.stopRecording();
      }
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMinerDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., save miner details to database)
    alert('Miner details saved!');
    console.log(minerDetails);
  };

  // Event handlers for session controls
  const handleStartSession = () => {
    setIsSessionActive(true);
    setIsPaused(false);
    setIsStopped(false);
  };

  const handlePauseSession = () => {
    setIsPaused(true);
  };

  const handleStopSession = () => {
    setIsStopped(true);
    setIsSessionActive(false);
    setTimeWorked(0); // Reset time
  };

  return (
    <div className={styles.main}>
      <Navbar />

      {/* Health meter section */}
      <div className={styles.healthSection}>
        <h2>Work Timer: {Math.floor(timeWorked / 60)} minutes {timeWorked % 60} seconds</h2>
        {/* Session Control Buttons */}
        <div className={styles.sessionControls}>
          <button onClick={handleStartSession} disabled={isSessionActive && !isPaused}>Start Session</button>
          <button onClick={handlePauseSession} disabled={isPaused || !isSessionActive}>Pause</button>
          <button onClick={handleStopSession}>Stop</button>
        </div>
        <div className={styles.meter}>
          <span
            className={styles.progress}
            style={{ width: `${(timeWorked / 3600) * 100}%` }}
          ></span>
        </div>
      </div>

      {/* Audio detection visualizer */}
      <div className={styles.audioSection}>
        <h2>Noise Level</h2>
        <canvas ref={visualizerRef} width="400" height="100" style={{ border: '1px solid #ccc' }}></canvas>
      </div>

      {/* Miner details form */}
      <div className={styles.formSection}>
        <h2>Enter Miner Details</h2>

        

        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={minerDetails.name}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Blood Report:
            <input
              type="text"
              name="bloodReport"
              value={minerDetails.bloodReport}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Other Info:
            <textarea
              name="otherInfo"
              value={minerDetails.otherInfo}
              onChange={handleInputChange}
              required
            />
          </label>
          <button type="submit">Save Details</button>
        </form>
      </div>
    </div>
  );
}

export default Health;
