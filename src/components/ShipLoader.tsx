"use client";

import React, { useEffect, useState } from "react";
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
        
        {/* Animated 90s SVG Ship Container */}
        <div className={styles.svgWrapper}>
          <svg
            viewBox="0 0 400 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            shapeRendering="crispEdges"
            className={styles.retroSvg}
          >
            {/* Night Sky Background */}
            <rect width="400" height="300" fill="#050a1a" />
            
            {/* Pixel Stars */}
            <g className={styles.stars}>
              <rect x="50" y="40" width="4" height="4" fill="#fff" />
              <rect x="120" y="20" width="4" height="4" fill="#ffd700" />
              <rect x="250" y="60" width="4" height="4" fill="#fff" />
              <rect x="340" y="30" width="4" height="4" fill="#fff" />
              <rect x="80" y="90" width="4" height="4" fill="#fff" />
              <rect x="300" y="100" width="4" height="4" fill="#ffd700" />
            </g>

            {/* Pixel Moon */}
            <path d="M 320 40 h 10 v 10 h 10 v 20 h -10 v 10 h -10 v -10 h -10 v -20 h 10 z" fill="#e2e8f0" />

            {/* Background Waves (Animated) */}
            <g className={`${styles.waves} ${styles.wavesBack}`}>
              {/* Draw a repeating pattern of blocky waves */}
              {[...Array(3)].map((_, i) => (
                <path
                  key={`wave-back-${i}`}
                  d={`M ${i * 400} 220 h 40 v -10 h 40 v 10 h 40 v -10 h 40 v 10 h 40 v -10 h 40 v 10 h 40 v -10 h 40 v 10 h 40 v -10 h 40 v 10 v 80 h -400 z`}
                  fill="#1e3a8a"
                />
              ))}
            </g>

            {/* Pirate Ship Group (Bobbing Animation) */}
            <g className={styles.shipGroup}>
              {/* Ship Masts */}
              <rect x="150" y="80" width="8" height="120" fill="#451a03" />
              <rect x="230" y="60" width="8" height="140" fill="#451a03" />
              
              {/* Crow's Nest */}
              <rect x="220" y="80" width="28" height="10" fill="#78350f" />
              
              {/* Jolly Roger Flag */}
              <g className={styles.flag}>
                <rect x="238" y="60" width="30" height="20" fill="#000" />
                <rect x="248" y="65" width="4" height="4" fill="#fff" />
                <rect x="254" y="65" width="4" height="4" fill="#fff" />
                <rect x="246" y="73" width="14" height="4" fill="#fff" />
              </g>

              {/* Sails (Flapping Animation) */}
              <g className={styles.sails}>
                {/* Back Sail */}
                <path d="M 154 90 h -50 v 50 h 50 z" fill="#f8fafc" />
                <path d="M 154 90 h 40 v 50 h -40 z" fill="#e2e8f0" />
                {/* Main Sail */}
                <path d="M 234 100 h -70 v 70 h 70 z" fill="#f8fafc" />
                <path d="M 234 100 h 60 v 70 h -60 z" fill="#e2e8f0" />
              </g>

              {/* Ship Hull */}
              <path d="M 80 180 h 220 l 40 40 h -280 z" fill="#78350f" />
              <path d="M 90 180 h 200 l 30 30 h -240 z" fill="#92400e" />
              
              {/* Hull details / Planks */}
              <rect x="100" y="190" width="180" height="4" fill="#451a03" />
              <rect x="110" y="200" width="160" height="4" fill="#451a03" />

              {/* Windows */}
              <rect x="120" y="195" width="10" height="10" fill="#fbbf24" className={styles.windowGlow} />
              <rect x="150" y="195" width="10" height="10" fill="#fbbf24" className={styles.windowGlow} />
              <rect x="180" y="195" width="10" height="10" fill="#fbbf24" className={styles.windowGlow} />
              
              {/* Cannons sticking out */}
              <rect x="120" y="210" width="16" height="6" fill="#171717" />
              <rect x="160" y="210" width="16" height="6" fill="#171717" />
              <rect x="200" y="210" width="16" height="6" fill="#171717" />

              {/* Tiny Savage Characters (Animated) */}
              {/* Captain on the back */}
              <g className={styles.characterIdle}>
                <rect x="100" y="160" width="12" height="20" fill="#dc2626" />
                <rect x="102" y="150" width="8" height="10" fill="#fcd34d" />
                <rect x="100" y="146" width="12" height="4" fill="#000" /> {/* Pirate hat */}
              </g>

              {/* Savage in the crow's nest */}
              <g className={styles.characterLook}>
                <rect x="228" y="70" width="12" height="10" fill="#16a34a" />
                <rect x="230" y="60" width="8" height="10" fill="#fcd34d" />
                <rect x="228" y="56" width="12" height="4" fill="#dc2626" /> {/* Bandana */}
              </g>

              {/* Savage on the deck charging */}
              <g className={styles.characterRun}>
                <rect x="260" y="160" width="12" height="20" fill="#2563eb" />
                <rect x="262" y="150" width="8" height="10" fill="#fcd34d" />
                <rect x="260" y="146" width="12" height="4" fill="#dc2626" /> {/* Bandana */}
                {/* Pixel Sword */}
                <rect x="272" y="164" width="16" height="4" fill="#94a3b8" />
              </g>
            </g>

            {/* Foreground Waves (Animated faster for parallax) */}
            <g className={`${styles.waves} ${styles.wavesFront}`}>
              {[...Array(3)].map((_, i) => (
                <path
                  key={`wave-front-${i}`}
                  d={`M ${i * 400} 240 h 30 v -15 h 30 v 15 h 30 v -15 h 30 v 15 h 30 v -15 h 30 v 15 h 30 v -15 h 30 v 15 h 30 v -15 h 30 v 15 h 30 v -15 h 30 v 15 v 60 h -400 z`}
                  fill="#2563eb"
                  opacity="0.9"
                />
              ))}
            </g>
            
            {/* Spray particles */}
            <g className={styles.spray}>
              <rect x="320" y="230" width="6" height="6" fill="#fff" />
              <rect x="340" y="220" width="6" height="6" fill="#fff" />
              <rect x="360" y="240" width="6" height="6" fill="#fff" />
            </g>
          </svg>
        </div>

        <div className={styles.loadingTextContainer}>
          <h1 className={styles.title}>STAGE 1: LOADING</h1>
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
