"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./ShipLoader.module.css";

const SAILING_MESSAGES = [
  "Hoisting the mainsail...",
  "Tiny savages loading the cannons...",
  "Navigating the Serpent's Deep...",
  "Plundering the secret spices...",
  "Scrubbing the pixelated deck...",
  "Catching the digital trade winds...",
  "Preparing the 16-bit feast...",
  "Almost at the harbor..."
];

interface ShipLoaderProps {
  onComplete?: () => void;
  duration?: number; // In milliseconds
}

export default function ShipLoader({ onComplete, duration = 4000 }: ShipLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [textOpacity, setTextOpacity] = useState(1);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      
      const currentProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(currentProgress);

      const messageCycleTime = 1000;
      const currentMessageIdx = Math.floor(elapsed / messageCycleTime) % SAILING_MESSAGES.length;
      setMessageIndex(currentMessageIdx);

      const phase = elapsed % messageCycleTime;
      let opacity = 1;
      if (phase < 150) {
        opacity = phase / 150;
      } else if (phase > 850) {
        opacity = (messageCycleTime - phase) / 150;
      }
      setTextOpacity(opacity);

      if (elapsed >= duration) {
        clearInterval(interval);
        if (onComplete) {
          onComplete();
        }
      }
    }, 30);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loaderContent}>
        <div className={styles.imageWrapper}>
          <Image 
            src="/90s_pirate_ship.png" 
            alt="90s Pixel Art Pirate Ship" 
            width={512} 
            height={512} 
            priority
          />
        </div>

        <div className={styles.loadingTextContainer}>
          <h1 className={styles.title}>LOADING...</h1>
          <p 
            className={styles.subtitle} 
            style={{ 
              opacity: textOpacity, 
              transition: "opacity 0.15s ease-in-out" 
            }}
          >
            {SAILING_MESSAGES[messageIndex]}
          </p>
          <div className={styles.progressBarContainer}>
            <div
              className={styles.progressBar}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
