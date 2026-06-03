"use client";

import React, { useEffect, useState } from "react";
import styles from "./ChefLoader.module.css";

const RUSH_MESSAGES = [
  "Chef is rushing with your order...",
  "Slicing fresh veggies at sonic speed...",
  "Pan-searing the steak in mid-air...",
  "Plating the sauce with absolute urgency...",
  "Running like the kitchen is on fire...",
  "Dodging waiters in the hallway...",
  "Garnishing with hyper-speed precision...",
  "Catching falling ingredients in style..."
];

interface ChefLoaderProps {
  onComplete?: () => void;
  duration?: number; // In milliseconds
}

export default function ChefLoader({ onComplete, duration = 3500 }: ChefLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [textOpacity, setTextOpacity] = useState(1);

  useEffect(() => {
    let animationFrameId: number;
    const startTime = Date.now();

    const updateLoader = () => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(currentProgress);

      const messageCycleTime = 900;
      const currentMessageIdx = Math.floor(elapsed / messageCycleTime) % RUSH_MESSAGES.length;
      
      if (currentMessageIdx !== messageIndex) {
        setMessageIndex(currentMessageIdx);
      }

      const phase = elapsed % messageCycleTime;
      let opacity = 1;
      if (phase < 150) {
        opacity = phase / 150;
      } else if (phase > 750) {
        opacity = (messageCycleTime - phase) / 150;
      }
      setTextOpacity(opacity);

      if (elapsed < duration) {
        animationFrameId = requestAnimationFrame(updateLoader);
      } else {
        setProgress(100);
        if (onComplete) {
          // slight delay to let the progress bar hit 100% visually
          setTimeout(onComplete, 100);
        }
      }
    };

    animationFrameId = requestAnimationFrame(updateLoader);

    return () => cancelAnimationFrame(animationFrameId);
  }, [duration, onComplete, messageIndex]);

  return (
    <div className={styles.loaderContainer}>
      <div className={styles.glowAmbient} />
      
      <div className={styles.loaderContent}>
        {/* Chef Running Animation SVG */}
        <div className={styles.svgWrapper}>
          <svg
            viewBox="0 0 400 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Speed Lines (Background) */}
            <line x1="50" y1="90" x2="190" y2="90" className={`${styles.speedLine} ${styles.speedLine1}`} />
            <line x1="30" y1="160" x2="150" y2="160" className={`${styles.speedLine} ${styles.speedLine2}`} />
            <line x1="60" y1="230" x2="200" y2="230" className={`${styles.speedLine} ${styles.speedLine3}`} />

            {/* Chef Group */}
            <g className={styles.chefGroup}>
              {/* Back Arm */}
              <g className={styles.armBack}>
                <path d="M 175 160 L 140 185 L 125 175" stroke="#cbd5e1" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="125" cy="175" r="8" fill="#fbd38d" />
              </g>

              {/* Left Leg */}
              <g className={styles.leftLeg}>
                <path d="M 185 200 L 160 235 L 135 245" stroke="#1e293b" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 135 245 L 120 252 L 125 260 L 145 255 Z" fill="#0f172a" />
              </g>

              {/* Right Leg */}
              <g className={styles.rightLeg}>
                <path d="M 210 200 L 235 230 L 265 220" stroke="#334155" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 265 220 L 280 215 L 286 223 L 271 230 Z" fill="#0f172a" />
              </g>

              {/* Chef Body */}
              <path d="M 175 145 C 175 145 190 142 215 145 C 225 170 228 190 222 205 C 190 210 180 208 172 200 C 170 190 172 165 175 145 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
              <path d="M 200 205 L 202 225 M 208 205 L 206 220" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
              <circle cx="205" cy="155" r="3" fill="#475569" />
              <circle cx="213" cy="165" r="3" fill="#475569" />
              <circle cx="203" cy="175" r="3" fill="#475569" />
              <circle cx="211" cy="185" r="3" fill="#475569" />

              {/* Red Scarf */}
              <g className={styles.scarf}>
                <circle cx="185" cy="144" r="6" fill="#ef4444" />
                <path d="M 183 144 C 170 138 155 148 140 142 C 150 152 168 152 181 146 Z" fill="#dc2626" />
              </g>

              {/* Head & Face */}
              <g className={styles.head}>
                <path d="M 188 143 L 195 133 L 203 138 L 194 145 Z" fill="#fbd38d" />
                <circle cx="187" cy="128" r="4.5" fill="#fbd38d" />
                <path d="M 188 128 C 188 118 198 112 210 118 C 220 123 222 135 214 141 C 205 145 188 140 188 128 Z" fill="#fbd38d" />
                
                {/* Eyes */}
                <ellipse cx="210" cy="123" rx="4" ry="6" fill="#ffffff" />
                <circle cx="212" cy="123" r="2.2" fill="#0f172a" />
                <path d="M 204 115 C 208 112 214 113 216 116" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
                
                {/* Mouth */}
                <ellipse cx="213" cy="135" rx="3.5" ry="5" fill="#1e293b" />
                <path d="M 211 137 C 212 135 214 135 215 137 Z" fill="#f43f5e" />

                {/* Mustache */}
                <path d="M 206 130 C 210 130 216 128 219 131 C 221 133 219 135 216 134 C 213 133 209 133 206 132 Z" fill="#1e293b" className={styles.mustache} />

                {/* Sweat Drops */}
                <path d="M 202 120 C 203 120 205 117 205 115 C 205 113 203 113 202 113 C 201 113 199 113 199 115 C 199 117 201 120 202 120 Z" className={`${styles.sweatDrop} ${styles.sweat1}`} />
                <path d="M 197 125 C 198 125 200 122 200 120 C 200 118 198 118 197 118 C 196 118 194 118 194 120 C 194 122 196 125 197 125 Z" className={`${styles.sweatDrop} ${styles.sweat2}`} />
              </g>

              {/* Chef Hat */}
              <g className={styles.hat}>
                <path d="M 188 113 L 208 108 L 209 113 L 189 118 Z" fill="#ef4444" />
                <path d="M 188 110 C 172 100 178 75 195 72 C 198 62 212 62 215 75 C 230 78 226 98 208 105 Z" fill="#ffffff" stroke="#f1f5f9" strokeWidth="1.5" />
              </g>

              {/* Front Arm */}
              <g className={styles.armFront}>
                <path d="M 218 158 L 245 158 L 260 142" stroke="#ffffff" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 218 163 L 243 163" stroke="#cbd5e1" strokeWidth="2" />
                <circle cx="260" cy="142" r="7" fill="#fbd38d" />

                {/* Serving Plate */}
                <ellipse cx="265" cy="132" rx="30" ry="5" fill="#f59e0b" />
                <ellipse cx="265" cy="133" rx="27" ry="3.5" fill="#ecc94b" />
                
                {/* Food */}
                <path d="M 245 130 C 245 115 285 115 285 130 Z" fill="#ea580c" />
                <circle cx="258" cy="124" r="3" fill="#ef4444" />
                <circle cx="272" cy="126" r="2.5" fill="#ef4444" />
                <path d="M 262 121 C 265 123 268 123 270 121" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />

                {/* Steam */}
                <path d="M 252 110 Q 248 95 240 90" className={`${styles.steamLine} ${styles.steam1}`} />
                <path d="M 265 112 Q 260 90 252 85" className={`${styles.steamLine} ${styles.steam2}`} />
                <path d="M 278 114 Q 275 98 268 92" className={`${styles.steamLine} ${styles.steam3}`} />

                {/* Flying Food Particles */}
                <g className={styles.foodParticle}>
                  <circle cx="230" cy="105" r="4.5" className={`${styles.food1}`} />
                  <path d="M 224 118 Q 220 114 216 117 Q 219 122 224 118 Z" className={`${styles.food2}`} />
                </g>
              </g>
            </g>
          </svg>
        </div>

        {/* Loading Progress & Animated Cycle Messages */}
        <div className={styles.loadingTextContainer}>
          <h1 className={styles.title}>CraxFood</h1>
          <p 
            className={styles.subtitle} 
            style={{ 
              opacity: textOpacity, 
              transition: "opacity 0.15s ease-in-out" 
            }}
          >
            {RUSH_MESSAGES[messageIndex]}
          </p>
          <div className={styles.progressBarContainer}>
            <div
              className={styles.progressBar}
              style={{ 
                width: `${progress}%`
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
