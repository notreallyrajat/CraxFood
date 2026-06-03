"use client";

import React, { useState } from "react";
import ChefLoader from "../components/ChefLoader";
import styles from "./page.module.css";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

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
                {/* Points */}
                {/* North */}
                <path d="M 50 50 L 50 12 L 47 45 Z" fill="#5c3d21" />
                <path d="M 50 50 L 50 12 L 53 45 Z" stroke="#5c3d21" strokeWidth="0.75" />
                {/* South */}
                <path d="M 50 50 L 50 88 L 53 55 Z" fill="#5c3d21" />
                <path d="M 50 50 L 50 88 L 47 55 Z" stroke="#5c3d21" strokeWidth="0.75" />
                {/* East */}
                <path d="M 50 50 L 88 50 L 55 47 Z" fill="#5c3d21" />
                <path d="M 50 50 L 88 50 L 55 53 Z" stroke="#5c3d21" strokeWidth="0.75" />
                {/* West */}
                <path d="M 50 50 L 12 50 L 45 53 Z" fill="#5c3d21" />
                <path d="M 50 50 L 12 50 L 45 47 Z" stroke="#5c3d21" strokeWidth="0.75" />
                {/* Diagonals */}
                <path d="M 50 50 L 77 23 L 53 43 Z" fill="#5c3d21" opacity="0.6" />
                <path d="M 50 50 L 23 77 L 47 57 Z" fill="#5c3d21" opacity="0.6" />
                <path d="M 50 50 L 23 23 L 43 53 Z" fill="#5c3d21" opacity="0.6" />
                <path d="M 50 50 L 77 77 L 57 47 Z" fill="#5c3d21" opacity="0.6" />
                {/* Text Labels */}
                <text x="48" y="9" fontSize="6" fill="#5c3d21" fontWeight="bold">N</text>
                <text x="48" y="96" fontSize="6" fill="#5c3d21" fontWeight="bold">S</text>
                <text x="91" y="52" fontSize="6" fill="#5c3d21" fontWeight="bold">E</text>
                <text x="5" y="52" fontSize="6" fill="#5c3d21" fontWeight="bold">W</text>
              </svg>

              {/* Sailing Ship Watermark SVG */}
              <svg
                viewBox="0 0 100 100"
                className={styles.shipWatermark}
              >
                <path
                  d="M20,65 C25,64 35,63 45,64 C55,65 65,68 75,67 C78,63 80,58 82,53 C70,55 50,55 35,53 C30,57 24,61 20,65 Z M35,50 C38,35 48,22 46,12 C42,20 38,32 35,50 Z M52,48 C56,30 64,18 63,8 C58,16 54,29 52,48 Z M22,53 C26,45 30,37 32,28 C28,34 24,42 22,53 Z M42,67 L42,75 M58,67 L58,74 M28,65 L28,78 C35,76 65,76 72,78 L72,66"
                  stroke="#5c3d21"
                  strokeWidth="0.75"
                  fill="none"
                />
              </svg>

              {/* Header */}
              <div className={styles.mapHeader}>
                <span className={styles.mapSubtitle}>EST. 2026 / CULINARY EXPEDITION</span>
                <br />
                <h1 className={styles.mapTitle}>The Culinary Chart</h1>
                <div className={styles.mapCoordinates}>
                  GRID REF: [ 28°15&apos; N / 74°20&apos; E ]
                </div>
              </div>

              {/* Menu Grid Content */}
              <div className={styles.menuGrid}>
                {/* Column 1 */}
                <div className={styles.menuSection}>
                  {/* Section A */}
                  <div>
                    <h2 className={styles.sectionTitle}>
                      <span>I. The Searing Valleys</span>
                      <span className={styles.sectionRegion}>[GRILL & EMBERS]</span>
                    </h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", marginTop: "1rem" }}>
                      <div className={styles.menuItem}>
                        <div className={styles.itemHeader}>
                          <span className={styles.itemName}>Dragon&apos;s Hearth Steak</span>
                          <span className={styles.itemConnector} />
                          <span className={styles.itemPrice}>$75.00</span>
                        </div>
                        <p className={styles.itemDesc}>
                          Premium A5 Wagyu Ribeye cooked over direct charcoal, accompanied by roasted garlic bulb, sea salt flakes, and a sprig of charred rosemary.
                        </p>
                        <span className={styles.itemLabel}>Rare Discovery</span>
                      </div>

                      <div className={styles.menuItem}>
                        <div className={styles.itemHeader}>
                          <span className={styles.itemName}>Smoked Boar Ribs</span>
                          <span className={styles.itemConnector} />
                          <span className={styles.itemPrice}>$34.00</span>
                        </div>
                        <p className={styles.itemDesc}>
                          Glazed in dark wilderness honey, smoked with wild hickory chips, served with rustic root vegetables.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Section B */}
                  <div style={{ marginTop: "1rem" }}>
                    <h2 className={styles.sectionTitle}>
                      <span>II. The Fertile Plains</span>
                      <span className={styles.sectionRegion}>[PASTAS & GRAINS]</span>
                    </h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", marginTop: "1rem" }}>
                      <div className={styles.menuItem}>
                        <div className={styles.itemHeader}>
                          <span className={styles.itemName}>Forest Truffle Tagliolini</span>
                          <span className={styles.itemConnector} />
                          <span className={styles.itemPrice}>$28.00</span>
                        </div>
                        <p className={styles.itemDesc}>
                          Hand-rolled pasta, tossed in rich mountain butter, mountain sage, and freshly shaved black truffles gathered at dawn.
                        </p>
                        <span className={styles.itemLabel}>House Specialty</span>
                      </div>

                      <div className={styles.menuItem}>
                        <div className={styles.itemHeader}>
                          <span className={styles.itemName}>Highland Herbs Risotto</span>
                          <span className={styles.itemConnector} />
                          <span className={styles.itemPrice}>$22.00</span>
                        </div>
                        <p className={styles.itemDesc}>
                          Slow-simmered arborio rice with wild thyme, rosemary oil, and aged parmigiano rind.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column 2 */}
                <div className={styles.menuSection}>
                  {/* Section C */}
                  <div>
                    <h2 className={styles.sectionTitle}>
                      <span>III. The Ocean Depths</span>
                      <span className={styles.sectionRegion}>[COASTAL SEAFOOD]</span>
                    </h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", marginTop: "1rem" }}>
                      <div className={styles.menuItem}>
                        <div className={styles.itemHeader}>
                          <span className={styles.itemName}>Leviathan&apos;s Salmon</span>
                          <span className={styles.itemConnector} />
                          <span className={styles.itemPrice}>$32.00</span>
                        </div>
                        <p className={styles.itemDesc}>
                          Pan-seared Atlantic salmon over saffron-infused risotto, crowned with a light sea-citrus foam and charred asparagus.
                        </p>
                      </div>

                      <div className={styles.menuItem}>
                        <div className={styles.itemHeader}>
                          <span className={styles.itemName}>Sirens&apos; Buttered Lobster</span>
                          <span className={styles.itemConnector} />
                          <span className={styles.itemPrice}>$48.00</span>
                        </div>
                        <p className={styles.itemDesc}>
                          Butter-poached lobster tail served on toasted brioche with wild sea kelp salad.
                        </p>
                        <span className={styles.itemLabel}>Limited Bounty</span>
                      </div>
                    </div>
                  </div>

                  {/* Section D */}
                  <div style={{ marginTop: "1rem" }}>
                    <h2 className={styles.sectionTitle}>
                      <span>IV. The Sweet Oasis</span>
                      <span className={styles.sectionRegion}>[CONFECTION & ELIXIRS]</span>
                    </h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", marginTop: "1rem" }}>
                      <div className={styles.menuItem}>
                        <div className={styles.itemHeader}>
                          <span className={styles.itemName}>Volcanic Chocolate Fondant</span>
                          <span className={styles.itemConnector} />
                          <span className={styles.itemPrice}>$16.00</span>
                        </div>
                        <p className={styles.itemDesc}>
                          Decadent dark chocolate shell with a liquid lava espresso center, finished with gold leaf.
                        </p>
                      </div>

                      <div className={styles.menuItem}>
                        <div className={styles.itemHeader}>
                          <span className={styles.itemName}>Saffron & Rosewater Nectar</span>
                          <span className={styles.itemConnector} />
                          <span className={styles.itemPrice}>$12.00</span>
                        </div>
                        <p className={styles.itemDesc}>
                          A refreshing cold infusion of Kashmiri saffron, cardamom pods, and organic rosewater.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className={styles.mapFooter}>
                Safe travels through the flavors. Your adventure awaits.
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
