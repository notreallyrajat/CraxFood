"use client";

import React, { useState, useRef } from "react";
import ChefLoader from "../components/ChefLoader";
import styles from "./page.module.css";

const MENU_DATA = [
  {
    category: "Sweets & Confections",
    region: "THE SWEET OASIS",
    items: [
      { id: "fondant", name: "Volcanic Chocolate Fondant", price: 16.00, desc: "Decadent dark chocolate shell with a liquid lava espresso center, finished with gold leaf." },
      { id: "nectar", name: "Saffron & Rosewater Nectar", price: 12.00, desc: "A refreshing cold infusion of Kashmiri saffron, cardamom pods, and organic rosewater." },
      { id: "jamun", name: "Golden Cardamom Gulab Jamun", price: 10.00, desc: "Deep-fried milk dumplings soaked in a warm syrup of rosewater, saffron, and cardamom." },
      { id: "kulfi", name: "Pistachio Kulfi Scroll", price: 14.00, desc: "Traditional frozen cardamom-pistachio slow-churned milk, garnished with toasted pistachios." },
    ]
  },
  {
    category: "South Indian Treasures",
    region: "THE SOUTHERN TEMPLE",
    items: [
      { id: "dosa", name: "Gilded Ghee Roast Dosa", price: 18.00, desc: "Paper-thin, crispy fermented rice crepe roasted with pure cow ghee, served with coconut and tomato chutneys." },
      { id: "idli", name: "Imperial Steamed Idli", price: 12.00, desc: "Fluffy, steamed fermented rice and lentil cakes served with a rich lentil sambar broth." },
      { id: "curry", name: "Malabar Coastal Curry", price: 24.00, desc: "Fresh fish fillets simmered in coconut milk, green chilies, and sour kokum berries." },
      { id: "vada", name: "Spiced Gunpowder Vada", price: 10.00, desc: "Crispy, savory lentil fritters spiced with black pepper and ginger, coated in red chili gunpowder." },
    ]
  },
  {
    category: "North Indian Feasts",
    region: "THE ROYAL KITCHENS",
    items: [
      { id: "biryani", name: "Royal Mutton Biryani", price: 32.00, desc: "Fragrant basmati rice layered with tender lamb, slow-cooked in a sealed clay pot (dum) with saffron threads." },
      { id: "butterchicken", name: "Emperor's Butter Chicken", price: 26.00, desc: "Tandoori-roasted chicken pieces simmered in a velvet-smooth gravy of tomatoes, cream, and dried fenugreek leaves." },
      { id: "paneer", name: "Smoked Paneer Tikka", price: 22.00, desc: "Skewered blocks of cottage cheese marinated in spiced yogurt, smoked in a clay tandoor." },
      { id: "naan", name: "Charred Garlic Naan", price: 8.00, desc: "Fresh leavened flatbread baked against the tandoor walls, brushed with garlic and butter." },
    ]
  },
  {
    category: "Continental Discoveries",
    region: "THE COASTAL CLIFFS",
    items: [
      { id: "steak", name: "Dragon's Hearth Steak", price: 75.00, desc: "Premium A5 Wagyu Ribeye cooked over direct charcoal, accompanied by roasted garlic bulb, sea salt flakes, and a sprig of charred rosemary." },
      { id: "pasta", name: "Forest Truffle Tagliolini", price: 28.00, desc: "Hand-rolled pasta tossed in rich mountain butter, sage, and freshly shaved black truffles gathered at dawn." },
      { id: "salmon", name: "Leviathan's Salmon", price: 32.00, desc: "Pan-seared salmon fillet over saffron risotto, crowned with a citrus foam and grilled asparagus." },
      { id: "lobster", name: "Sirens' Buttered Lobster", price: 48.00, desc: "Butter-poached lobster tail served on toasted brioche with a wild sea kelp salad." },
    ]
  }
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);
  const [cart, setCart] = useState<Record<string, boolean>>({});
  const [showDetails, setShowDetails] = useState(false);

  // Drag/Swipe coordinates refs
  const startX = useRef(0);
  const startY = useRef(0);
  const isDragging = useRef(false);

  const toggleItem = (id: string) => {
    setCart((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const selectedCount = Object.values(cart).filter(Boolean).length;

  const totalPrice = MENU_DATA.reduce((sum, page) => {
    return sum + page.items.reduce((pageSum, item) => {
      return cart[item.id] ? pageSum + item.price : pageSum;
    }, 0);
  }, 0);

  const handleNextPage = () => {
    if (pageIndex < MENU_DATA.length - 1) {
      setPageIndex(pageIndex + 1);
      setShowDetails(false);
    }
  };

  const handlePrevPage = () => {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
      setShowDetails(false);
    }
  };

  // Drag Gesture Handlers (supporting both touch and mouse)
  const handleDragStart = (clientX: number, clientY: number) => {
    startX.current = clientX;
    startY.current = clientY;
    isDragging.current = false;
  };

  const handleDragMove = (clientX: number, clientY: number) => {
    if (startX.current === 0) return;
    const diffX = clientX - startX.current;
    const diffY = clientY - startY.current;

    // If movement is significant, flag as dragging
    if (Math.abs(diffX) > 10 || Math.abs(diffY) > 10) {
      isDragging.current = true;
    }
  };

  const handleDragEnd = (clientX: number, clientY: number) => {
    if (startX.current === 0) return;
    
    const diffX = clientX - startX.current;
    const diffY = clientY - startY.current;

    // Swipe validation: primary horizontal movement and > 50px distance
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      if (diffX > 50) {
        // Drag to the right -> Go to NEXT page
        handleNextPage();
      } else if (diffX < -50) {
        // Drag to the left -> Go to PREVIOUS page
        handlePrevPage();
      }
    }

    startX.current = 0;
    startY.current = 0;
  };

  return (
    <>
      {isLoading ? (
        <ChefLoader onComplete={() => setIsLoading(false)} duration={3500} />
      ) : (
        <div className={styles.mapContainer}>
          <div className={styles.bookWrapper}>
            {/* Book Container with perspective */}
            <div
              className={styles.bookContainer}
              onTouchStart={(e) => handleDragStart(e.touches[0].clientX, e.touches[0].clientY)}
              onTouchMove={(e) => handleDragMove(e.touches[0].clientX, e.touches[0].clientY)}
              onTouchEnd={(e) => handleDragEnd(e.changedTouches[0].clientX, e.changedTouches[0].clientY)}
              onMouseDown={(e) => handleDragStart(e.clientX, e.clientY)}
              onMouseMove={(e) => handleDragMove(e.clientX, e.clientY)}
              onMouseUp={(e) => handleDragEnd(e.clientX, e.clientY)}
            >
              {MENU_DATA.map((page, idx) => {
                const isCurrent = idx === pageIndex;
                const isPast = idx < pageIndex;
                
                let pageClass = styles.pageFuture;
                if (isCurrent) {
                  pageClass = styles.pageCurrent;
                } else if (isPast) {
                  pageClass = styles.pagePast;
                }

                return (
                  <div
                    key={idx}
                    className={`${styles.bookPage} ${pageClass}`}
                    style={{ zIndex: MENU_DATA.length - idx }}
                  >
                    {/* Double Border Detail */}
                    <div className={styles.mapBorder}>
                      {/* Corner Decorations */}
                      <div className={`${styles.cornerDecor} ${styles.topLeft}`} />
                      <div className={`${styles.cornerDecor} ${styles.topRight}`} />
                      <div className={`${styles.cornerDecor} ${styles.bottomLeft}`} />
                      <div className={`${styles.cornerDecor} ${styles.bottomRight}`} />

                      {/* Paper Spine crease */}
                      <div className={styles.pageSpineCrease} />

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
                        <h1 className={styles.mapTitle}>{page.category}</h1>
                        <div className={styles.mapCoordinates}>
                          REGION: {page.region}
                        </div>
                      </div>

                      {/* Menu List */}
                      <div className={styles.menuList}>
                        {page.items.map((item) => {
                          const isChecked = !!cart[item.id];
                          return (
                            <div
                              key={item.id}
                              className={`${styles.menuListItem} ${
                                isChecked ? styles.selectedItem : ""
                              }`}
                              onClick={(e) => {
                                // Ignore selection if dragging/swiping
                                if (isDragging.current) return;
                                toggleItem(item.id);
                              }}
                            >
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
                              <span className={styles.itemConnector} />
                              <span className={styles.itemPrice}>
                                ${item.price.toFixed(2)}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Separated Two Buttons at the Bottom of Every Page */}
                      <div className={styles.buttonContainer}>
                        <button
                          className={styles.detailsBtn}
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowDetails(true);
                          }}
                        >
                          View Item Details
                        </button>
                        
                        <button
                          className={`${styles.paymentBtn} ${
                            selectedCount > 0 ? styles.activePayment : ""
                          }`}
                          disabled={selectedCount === 0}
                          onClick={(e) => {
                            e.stopPropagation();
                            alert(`Proceeding with payment of $${totalPrice.toFixed(2)}!`);
                          }}
                        >
                          {selectedCount > 0
                            ? `Proceed to Payment ($${totalPrice.toFixed(2)})`
                            : "Select Items to Proceed"}
                        </button>
                      </div>

                      {/* Page Info & Swipe Instruction helper */}
                      <div className={styles.pageNumberWatermark}>
                        Page {idx + 1} of {MENU_DATA.length}
                        <div className={styles.swipeHint}>
                          [ Slide Screen: Right for Next / Left for Prev ]
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Item Details Parchment Overlay Modal */}
            {showDetails && (
              <div 
                className={`${styles.detailsOverlay} fade-in`}
                onClick={() => setShowDetails(false)}
              >
                <div 
                  className={styles.detailsModal}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className={styles.detailsBorder}>
                    <div className={`${styles.cornerDecor} ${styles.topLeft}`} />
                    <div className={`${styles.cornerDecor} ${styles.topRight}`} />
                    <div className={`${styles.cornerDecor} ${styles.bottomLeft}`} />
                    <div className={`${styles.cornerDecor} ${styles.bottomRight}`} />
                    
                    <h3 className={styles.detailsTitle}>
                      {MENU_DATA[pageIndex].category} Details
                    </h3>
                    <div className={styles.detailsCoordinates}>
                      SECRET LORE & DESCRIPTIONS
                    </div>

                    <div className={styles.detailsList}>
                      {MENU_DATA[pageIndex].items.map((item) => (
                        <div key={item.id} className={styles.detailsItem}>
                          <div className={styles.detailsItemHeader}>
                            <span className={styles.detailsItemName}>{item.name}</span>
                            <span className={styles.detailsItemPrice}>${item.price.toFixed(2)}</span>
                          </div>
                          <p className={styles.detailsItemDesc}>{item.desc}</p>
                        </div>
                      ))}
                    </div>

                    <button 
                      className={styles.closeDetailsBtn}
                      onClick={() => setShowDetails(false)}
                    >
                      Return to Map
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
