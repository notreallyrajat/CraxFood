"use client";

import React, { useState } from "react";
import ChefLoader from "../components/ChefLoader";
import styles from "./page.module.css";

const MENU_ITEMS = [
  { id: "steak", name: "Dragon's Hearth Steak", price: 75.00 },
  { id: "pasta", name: "Forest Truffle Tagliolini", price: 28.00 },
  { id: "salmon", name: "Leviathan's Salmon", price: 32.00 },
  { id: "lobster", name: "Sirens' Buttered Lobster", price: 48.00 },
  { id: "boar", name: "Smoked Wilderness Boar", price: 34.00 },
  { id: "fondant", name: "Volcanic Chocolate Fondant", price: 16.00 },
  { id: "nectar", name: "Saffron & Rosewater Nectar", price: 12.00 },
  { id: "elixir", name: "Elixir of the Sun", price: 10.00 },
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setCart((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const selectedCount = Object.values(cart).filter(Boolean).length;
  const totalPrice = MENU_ITEMS.reduce((sum, item) => {
    return cart[item.id] ? sum + item.price : sum;
  }, 0);

  return (
    <>
      {isLoading ? (
        <ChefLoader onComplete={() => setIsLoading(false)} duration={3500} />
      ) : (
        <div className={styles.mapContainer}>
          {/* Ancient Map Scroll wrapper */}
          <div className={styles.mapScroll}>
            {/* Double Border Detail */}
            <div className={styles.mapBorder}>
              {/* Corner Decorations */}
              <div className={`${styles.cornerDecor} ${styles.topLeft}`} />
              <div className={`${styles.cornerDecor} ${styles.topRight}`} />
              <div className={`${styles.cornerDecor} ${styles.bottomLeft}`} />
              <div className={`${styles.cornerDecor} ${styles.bottomRight}`} />

              {/* Gridlines Watermark */}
              <div className={styles.mapGrid} />

              {/* Compass Rose Watermark SVG */}
              <svg
                viewBox="0 0 100 100"
                className={styles.compassRoseWatermark}
                fill="none"
              >
                <circle cx="50" cy="50" r="45" stroke="#5c3d21" strokeWidth="0.5" strokeDasharray="2 2" />
                <circle cx="50" cy="50" r="38" stroke="#5c3d21" strokeWidth="0.75" />
                <circle cx="50" cy="50" r="3" fill="#5c3d21" />
                <path d="M 50 50 L 50 12 L 47 45 Z" fill="#5c3d21" />
                <path d="M 50 50 L 50 12 L 53 45 Z" stroke="#5c3d21" strokeWidth="0.75" />
                <path d="M 50 50 L 50 88 L 53 55 Z" fill="#5c3d21" />
                <path d="M 50 50 L 50 88 L 47 55 Z" stroke="#5c3d21" strokeWidth="0.75" />
                <path d="M 50 50 L 88 50 L 55 47 Z" fill="#5c3d21" />
                <path d="M 50 50 L 88 50 L 55 53 Z" stroke="#5c3d21" strokeWidth="0.75" />
                <path d="M 50 50 L 12 50 L 45 53 Z" fill="#5c3d21" />
                <path d="M 50 50 L 12 50 L 45 47 Z" stroke="#5c3d21" strokeWidth="0.75" />
                <path d="M 50 50 L 77 23 L 53 43 Z" fill="#5c3d21" opacity="0.6" />
                <path d="M 50 50 L 23 77 L 47 57 Z" fill="#5c3d21" opacity="0.6" />
                <path d="M 50 50 L 23 23 L 43 53 Z" fill="#5c3d21" opacity="0.6" />
                <path d="M 50 50 L 77 77 L 57 47 Z" fill="#5c3d21" opacity="0.6" />
                <text x="48" y="9" fontSize="6" fill="#5c3d21" fontWeight="bold">N</text>
                <text x="48" y="96" fontSize="6" fill="#5c3d21" fontWeight="bold">S</text>
                <text x="91" y="52" fontSize="6" fill="#5c3d21" fontWeight="bold">E</text>
                <text x="5" y="52" fontSize="6" fill="#5c3d21" fontWeight="bold">W</text>
              </svg>

              {/* Header */}
              <div className={styles.mapHeader}>
                <span className={styles.mapSubtitle}>EST. 2026 / CULINARY EXPEDITION</span>
                <br />
                <h1 className={styles.mapTitle}>The Culinary Chart</h1>
                <div className={styles.mapCoordinates}>
                  SELECT ITEMS TO BEGIN YOUR FEAST
                </div>
              </div>

              {/* Menu List */}
              <div className={styles.menuList}>
                {MENU_ITEMS.map((item) => {
                  const isChecked = !!cart[item.id];
                  return (
                    <div
                      key={item.id}
                      className={`${styles.menuListItem} ${
                        isChecked ? styles.selectedItem : ""
                      }`}
                      onClick={() => toggleItem(item.id)}
                    >
                      {/* Checkbox & Name */}
                      <div className={styles.itemLeft}>
                        <div
                          className={`${styles.customCheckbox} ${
                            isChecked ? styles.checked : ""
                          }`}
                        >
                          {isChecked && <span className={styles.checkmark}>✓</span>}
                        </div>
                        <span className={styles.itemName}>{item.name}</span>
                      </div>

                      {/* Leader dots */}
                      <span className={styles.itemConnector} />

                      {/* Price */}
                      <span className={styles.itemPrice}>
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Proceed / Payment Button */}
              <div className={styles.paymentSection}>
                <button
                  className={`${styles.paymentBtn} ${
                    selectedCount > 0 ? styles.activePayment : ""
                  }`}
                  disabled={selectedCount === 0}
                  onClick={() => alert(`Proceeding with payment of $${totalPrice.toFixed(2)}!`)}
                >
                  {selectedCount > 0
                    ? `Proceed with Payment ($${totalPrice.toFixed(2)})`
                    : "Select Items to Proceed"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
