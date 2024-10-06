import React, { useEffect, useState, useRef } from 'react';
import RecordRTC from 'recordrtc';
import Navbar from '../components/Navbar';
import styles from '../styling/health.module.css';
import h1 from "../images/happyminer1.jpg";
import h2 from "../images/happyminer2.jpg";
import h3 from "../images/happyminer3.jpg";

function Health() {
  const [timeWorked, setTimeWorked] = useState(0); // Timer in seconds
  const [isSessionActive, setIsSessionActive] = useState(false); // To track if session is active
  const [isPaused, setIsPaused] = useState(false); // To track if timer is paused
  const [isStopped, setIsStopped] = useState(false); // To track if session is stopped
  const [minerDetails, setMinerDetails] = useState({
    name: 'Rhythm Chawla',
    bloodReport: 'link to sample report...',
    otherInfo: 'Miner allergies and details if any'
  });

  const visualizerRef = useRef(null); // Ref for the canvas visualizer
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
        // eslint-disable-next-line
        recordAudio = RecordRTC(stream, {
          type: 'audio',
          bufferSize: 16384,
          sampleRate: 44100,
          ondataavailable: function () {}, // No need to handle data for real-time visualizer
        });

        // Start recording
        recordAudio.startRecording();

        // Attach visualizer
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256; // Size of the FFT
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        source.connect(analyser);
        analyser.connect(audioContext.destination); // Connect to output

        const canvas = visualizerRef.current;
        const canvasContext = canvas.getContext('2d');

        const draw = () => {
          requestAnimationFrame(draw);
          analyser.getByteFrequencyData(dataArray);
          canvasContext.fillStyle = 'rgba(255, 255, 255, 0.1)';
          canvasContext.fillRect(0, 0, canvas.width, canvas.height);
          const barWidth = (canvas.width / bufferLength) * 2.5;
          let barHeight;
          let x = 0;

          for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i] / 2; // Scale down for better visualization
            canvasContext.fillStyle = `rgb(${barHeight + 100}, 50, 50)`;
            canvasContext.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight);
            x += barWidth + 1;
          }
        };

        draw();
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

  console.log(handleSubmit);
  console.log(handleInputChange);

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

  // SOS button handler
  const handleSOS = () => {
    alert('The nearest available help has been notified.');
  };

  return (
    <div className={styles.main}>
      <Navbar />

      <div className="composition">
        <img src={h1} alt="Happy Miner 1" className="composition__photo composition__photo--p1" height={400} />
        <img src={h2} alt="Happy Miner 2" className="composition__photo composition__photo--p2" height={400} />
        <img src={h3} alt="Happy Miner 3" className="composition__photo composition__photo--p3" height={400} />
      </div>

      {/* Health meter section */}
      <div className={styles.healthSection}>
        <h2>Work Timer: {Math.floor(timeWorked / 60)} minutes {timeWorked % 60} seconds</h2>
        {/* Session Control Buttons */}
        <div className={styles.sessionControls}>
          <button onClick={handleStartSession} disabled={isSessionActive && !isPaused}>Start Session</button>
          <button onClick={handlePauseSession} disabled={isPaused || !isSessionActive}>Pause</button>
          <button onClick={handleStopSession}>Stop</button>
        </div>
      </div>

      {/* Audio detection visualizer */}
      <div className={styles.audioSection}>
        <h2>Noise Level</h2>
        <canvas ref={visualizerRef} width="400" height="100" style={{ border: '1px solid #ccc' }}></canvas>
      </div>

      {/* SOS Button */}
      <button 
          className={styles.sosButton} 
          onClick={handleSOS} 
        >
          SOS
        </button>

      {/* Miner data section */}
      <div className={styles.minerDataSection}>
        <h2>Miner Details</h2>
        <p>Name: {minerDetails.name}</p>
        <p>Blood Report: {minerDetails.bloodReport}</p>
        <p>Other Info: {minerDetails.otherInfo}</p>
      </div>
    </div>
  );
}

export default Health;
