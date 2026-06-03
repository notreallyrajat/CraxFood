"use client";

import React, { useState, useRef, useEffect } from "react";
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

// Mr. Carter vector SVG component
const MrCarter = () => (
  <svg viewBox="0 0 100 100" className={styles.mrCarterSvg}>
    {/* Body Skin & Ears */}
    <circle cx="50" cy="50" r="22" fill="#fbd38d" stroke="#5c3d21" strokeWidth="2" />
    <circle cx="26" cy="50" r="5" fill="#fbd38d" stroke="#5c3d21" strokeWidth="1.5" />
    <circle cx="74" cy="50" r="5" fill="#fbd38d" stroke="#5c3d21" strokeWidth="1.5" />
    
    {/* Stripes (Sailor Shirt) */}
    <path d="M 32 70 C 32 70 35 90 50 90 C 65 90 68 70 68 70 Z" fill="#ffffff" stroke="#5c3d21" strokeWidth="2" />
    <path d="M 33 77 L 67 77 M 36 84 L 64 84" stroke="#1d4ed8" strokeWidth="3" />
    
    {/* Friendly Beard / Stubble */}
    <path d="M 28 50 C 28 65 50 78 50 78 C 50 78 72 65 72 50 C 72 45 68 45 68 50 C 68 60 50 70 50 70 C 50 70 32 60 32 50 Z" fill="#5c3d21" />
    
    {/* Friendly Smile */}
    <path d="M 43 56 Q 50 62 57 56" stroke="#5c3d21" strokeWidth="2" fill="none" strokeLinecap="round" />
    
    {/* Nose */}
    <path d="M 48 48 Q 50 44 52 48" stroke="#5c3d21" strokeWidth="2" fill="none" strokeLinecap="round" />
    
    {/* Left Eye & Eyebrow */}
    <ellipse cx="42" cy="42" rx="3.5" ry="2.5" fill="#3b2314" />
    <path d="M 37 36 Q 42 33 47 36" stroke="#3b2314" strokeWidth="2" fill="none" strokeLinecap="round" />
    
    {/* Right Eye Patch (Classic Pirate Element) */}
    <line x1="43" y1="36" x2="68" y2="48" stroke="#1e293b" strokeWidth="2.5" />
    <polygon points="53,40 61,43 58,49 50,45" fill="#1e293b" stroke="#1e293b" strokeWidth="1" />
    
    {/* Pirate Hat (Tricorn Hat with gold trim) */}
    <path d="M 20 32 C 30 20 70 20 80 32 C 72 38 60 32 50 38 C 40 32 28 38 20 32 Z" fill="#1e293b" stroke="#5c3d21" strokeWidth="2" />
    <path d="M 20 32 C 30 14 70 14 80 32 C 50 14 50 14 20 32 Z" fill="#f59e0b" opacity="0.8" />
    <circle cx="50" cy="24" r="3.5" fill="#ef4444" />
  </svg>
);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);
  const [cart, setCart] = useState<Record<string, boolean>>({});
  const [showDetails, setShowDetails] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "sailing" | "delivered">("idle");

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

  const selectedItemsList = MENU_DATA.flatMap(page =>
    page.items.filter(item => cart[item.id]).map(item => ({
      ...item,
      category: page.category
    }))
  );

  const TOTAL_PAGES = MENU_DATA.length + 2;

  const handleNextPage = () => {
    if (pageIndex < TOTAL_PAGES - 1) {
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

  // Drag/Swipe Handlers
  const handleDragStart = (clientX: number, clientY: number) => {
    startX.current = clientX;
    startY.current = clientY;
    isDragging.current = false;
  };

  const handleDragMove = (clientX: number, clientY: number) => {
    if (startX.current === 0) return;
    const diffX = clientX - startX.current;
    const diffY = clientY - startY.current;

    if (Math.abs(diffX) > 10 || Math.abs(diffY) > 10) {
      isDragging.current = true;
    }
  };

  const handleDragEnd = (clientX: number, clientY: number) => {
    if (startX.current === 0) return;
    
    const diffX = clientX - startX.current;
    const diffY = clientY - startY.current;

    // Swipe Left -> Next | Swipe Right -> Prev
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      if (diffX < -50) {
        handleNextPage();
      } else if (diffX > 50) {
        handlePrevPage();
      }
    }

    startX.current = 0;
    startY.current = 0;
  };

  const handlePaymentSubmit = () => {
    setShowDetails(false);
    setPaymentStatus("sailing");
  };

  // Autocomplete the mock sailing sequence after 4.5 seconds
  useEffect(() => {
    if (paymentStatus === "sailing") {
      const timer = setTimeout(() => {
        setPaymentStatus("delivered");
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [paymentStatus]);

  const resetAll = () => {
    setCart({});
    setPaymentStatus("idle");
    setPageIndex(0);
  };

  return (
    <>
      {isLoading ? (
        <ChefLoader onComplete={() => setIsLoading(false)} duration={3500} />
      ) : (
        <div className={styles.mapContainer}>
          <div className={styles.bookWrapper}>
            <div
              className={styles.bookContainer}
              onTouchStart={(e) => handleDragStart(e.touches[0].clientX, e.touches[0].clientY)}
              onTouchMove={(e) => handleDragMove(e.touches[0].clientX, e.touches[0].clientY)}
              onTouchEnd={(e) => handleDragEnd(e.changedTouches[0].clientX, e.changedTouches[0].clientY)}
              onMouseDown={(e) => handleDragStart(e.clientX, e.clientY)}
              onMouseMove={(e) => handleDragMove(e.clientX, e.clientY)}
              onMouseUp={(e) => handleDragEnd(e.clientX, e.clientY)}
            >
              {Array.from({ length: TOTAL_PAGES }).map((_, idx) => {
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
                    style={{ zIndex: TOTAL_PAGES - idx }}
                  >
                    {idx === 0 || idx === TOTAL_PAGES - 1 ? (
                      <div className={styles.fullCoverPage}>
                        <div className={styles.vintageShipBg} />
                        <div className={styles.fullCoverContent}>
                          {idx === 0 ? (
                            <div className={styles.swipeHintCover}>
                              [ Swipe Left to Open Menu ]
                            </div>
                          ) : (
                            <>
                              <div className={styles.coverButtonContainer}>
                                <button
                                  className={styles.detailsBtn}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setShowDetails(true);
                                  }}
                                  style={{ background: "rgba(253, 250, 242, 0.95)" }}
                                >
                                  View Order Details ({selectedCount})
                                </button>
                                <button
                                  className={`${styles.paymentBtn} ${
                                    selectedCount > 0 ? styles.activePayment : ""
                                  }`}
                                  disabled={selectedCount === 0}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handlePaymentSubmit();
                                  }}
                                >
                                  {selectedCount > 0
                                    ? `Proceed to Payment ($${totalPrice.toFixed(2)})`
                                    : "Select Items First"}
                                </button>
                              </div>
                              <div className={styles.swipeHintCover}>
                                [ Swipe Right to Go Back ]
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className={styles.mapBorder}>
                        <div className={`${styles.cornerDecor} ${styles.topLeft}`} />
                        <div className={`${styles.cornerDecor} ${styles.topRight}`} />
                        <div className={`${styles.cornerDecor} ${styles.bottomLeft}`} />
                        <div className={`${styles.cornerDecor} ${styles.bottomRight}`} />

                        <div className={styles.pageSpineCrease} />
                          <div className={styles.mapGrid} />
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

                          <div className={styles.mapHeader}>
                            <span className={styles.mapSubtitle}>EST. 2026 / CULINARY EXPEDITION</span>
                            <br />
                            <h1 className={styles.mapTitle}>{MENU_DATA[idx - 1].category}</h1>
                            <div className={styles.mapCoordinates}>
                              REGION: {MENU_DATA[idx - 1].region}
                            </div>
                          </div>

                          <div className={styles.menuList}>
                            {MENU_DATA[idx - 1].items.map((item) => {
                              const isChecked = !!cart[item.id];
                              return (
                                <div
                                  key={item.id}
                                  className={`${styles.menuListItem} ${
                                    isChecked ? styles.selectedItem : ""
                                  }`}
                                  onClick={(e) => {
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

                          <div className={styles.buttonContainer}>
                            <button
                              className={styles.detailsBtn}
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowDetails(true);
                              }}
                            >
                              View Order Details ({selectedCount})
                            </button>
                            
                            <button
                              className={`${styles.paymentBtn} ${
                                selectedCount > 0 ? styles.activePayment : ""
                              }`}
                              disabled={selectedCount === 0}
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePaymentSubmit();
                              }}
                            >
                              {selectedCount > 0
                                ? `Proceed to Payment ($${totalPrice.toFixed(2)})`
                                : "Select Items to Proceed"}
                            </button>
                          </div>

                          <div className={styles.pageNumberWatermark}>
                            Page {idx} of {MENU_DATA.length}
                            <div className={styles.swipeHint}>
                              [ Swipe Left for Next / Swipe Right for Prev ]
                            </div>
                          </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Order Details Parchment Overlay Modal (Mr. Carter's Deck) */}
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
                    
                    {/* Mr. Carter Character Header */}
                    <div className={styles.carterHeader}>
                      <MrCarter />
                      <div className={styles.carterSpeechBubble}>
                        <div className={styles.bubbleArrow} />
                        <p className={styles.bubbleText}>
                          {selectedCount > 0 
                            ? "Ahoy! I'm ready to take your orders, matey!" 
                            : "Ahoy! Ye haven't added any delicacies to me deck yet!"
                          }
                        </p>
                      </div>
                    </div>

                    <h3 className={styles.detailsTitle}>
                      Your Order Details
                    </h3>
                    <div className={styles.detailsCoordinates}>
                      MR. CARTER'S ACTIVE DELIVERIES
                    </div>

                    <div className={styles.detailsList}>
                      {selectedItemsList.length > 0 ? (
                        selectedItemsList.map((item) => (
                          <div key={item.id} className={styles.detailsItem}>
                            <div className={styles.detailsItemHeader}>
                              <span className={styles.detailsItemName}>{item.name}</span>
                              <span className={styles.detailsItemPrice}>${item.price.toFixed(2)}</span>
                            </div>
                            <div style={{ fontSize: "0.65rem", textTransform: "uppercase", color: "#8c6239", marginBottom: "0.2rem" }}>
                              Category: {item.category}
                            </div>
                            <p className={styles.detailsItemDesc}>{item.desc}</p>
                          </div>
                        ))
                      ) : (
                        <div style={{ textAlign: "center", padding: "2rem 0", color: "#8c6239", fontStyle: "italic", fontSize: "0.85rem" }}>
                          No delicacies selected yet.<br/>Swipe pages and tick checkboxes to add.
                        </div>
                      )}
                    </div>

                    {selectedItemsList.length > 0 && (
                      <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "2px double rgba(92, 61, 33, 0.3)", paddingTop: "1rem", marginBottom: "1.5rem" }}>
                        <span style={{ fontWeight: "bold", fontSize: "0.95rem", textTransform: "uppercase", color: "#3b2314" }}>Total Feast Value:</span>
                        <span style={{ fontWeight: "bold", fontSize: "1.1rem", color: "#ba6f1b" }}>${totalPrice.toFixed(2)}</span>
                      </div>
                    )}

                    <div style={{ display: "flex", gap: "1rem", width: "100%" }}>
                      <button 
                        className={styles.closeDetailsBtn}
                        onClick={() => setShowDetails(false)}
                        style={{ flex: 1, background: "transparent", border: "1.5px solid #5c3d21", color: "#5c3d21" }}
                      >
                        Keep Browsing
                      </button>
                      
                      <button 
                        className={styles.closeDetailsBtn}
                        disabled={selectedItemsList.length === 0}
                        onClick={handlePaymentSubmit}
                        style={{ flex: 1 }}
                      >
                        Pay ${totalPrice.toFixed(2)}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Mr. Carter's Sailing Ship Mock Payment Overlay */}
            {paymentStatus === "sailing" && (
              <div className={styles.sailingOverlay}>
                <div className={styles.sailingContent}>
                  {/* Wave Layer Back */}
                  <div className={`${styles.wave} ${styles.waveBack}`}>
                    <svg viewBox="0 0 1200 120" fill="#3a2314" opacity="0.3" width="100%">
                      <path d="M0,60 C150,90 350,30 500,60 C650,90 850,30 1000,60 C1150,90 1200,60 1200,60 L1200,120 L0,120 Z" />
                    </svg>
                  </div>

                  {/* Bobbing and Sailing Ship */}
                  <div className={styles.sailingShipWrapper}>
                    <svg viewBox="0 0 120 120" className={styles.sailingShipSvg}>
                      {/* Ship Hull */}
                      <path d="M25 70 C30 84 85 84 90 70 L85 58 L30 58 Z" fill="#5c3d21" stroke="#3b2314" strokeWidth="2" />
                      <line x1="27" y1="64" x2="88" y2="64" stroke="#ba9a70" strokeWidth="1.5" />
                      
                      {/* Masts */}
                      <line x1="42" y1="58" x2="42" y2="18" stroke="#3b2314" strokeWidth="2.5" />
                      <line x1="60" y1="58" x2="60" y2="12" stroke="#3b2314" strokeWidth="3" />
                      <line x1="78" y1="58" x2="78" y2="18" stroke="#3b2314" strokeWidth="2.5" />
                      
                      {/* Sails */}
                      <path d="M42 22 C50 26 50 48 42 53 C53 48 53 26 42 22 Z" fill="#f4eedb" stroke="#3b2314" strokeWidth="1.5" />
                      <path d="M60 16 C72 22 72 48 60 54 C75 48 75 22 60 16 Z" fill="#f4eedb" stroke="#3b2314" strokeWidth="1.5" />
                      <path d="M78 22 C86 26 86 48 78 53 C89 48 89 26 78 22 Z" fill="#f4eedb" stroke="#3b2314" strokeWidth="1.5" />
                      
                      {/* Jolly Roger Skull detail on middle sail */}
                      <circle cx="66" cy="35" r="2.5" fill="#3b2314" />
                      <line x1="63" y1="39" x2="69" y2="39" stroke="#3b2314" strokeWidth="1" />
                      
                      {/* Red Flags */}
                      <path d="M42 18 L33 22 L42 26 Z" fill="#ef4444" />
                      <path d="M60 12 L50 16 L60 20 Z" fill="#ef4444" />
                      <path d="M78 18 L69 22 L78 26 Z" fill="#ef4444" />
                    </svg>
                  </div>

                  {/* Wave Layer Front */}
                  <div className={`${styles.wave} ${styles.waveFront}`}>
                    <svg viewBox="0 0 1200 120" fill="#5c3d21" opacity="0.9" width="100%">
                      <path d="M0,70 C150,40 300,100 450,70 C600,40 750,100 900,70 C1050,40 1200,70 1200,70 L1200,120 L0,120 Z" />
                    </svg>
                  </div>

                  <div className={styles.sailingInfo}>
                    <h2 className={styles.sailingTitle}>Sailing the High Seas</h2>
                    <p className={styles.sailingSubtitle}>Mr. Carter is sailing your order across the waters...</p>
                    
                    {/* Animated Route Line */}
                    <div className={styles.voyageProgressContainer}>
                      <div className={styles.voyageProgressBar} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Delivery Success State */}
            {paymentStatus === "delivered" && (
              <div className={styles.detailsOverlay}>
                <div className={styles.deliveredModal}>
                  <div className={styles.detailsBorder}>
                    <div className={`${styles.cornerDecor} ${styles.topLeft}`} />
                    <div className={`${styles.cornerDecor} ${styles.topRight}`} />
                    <div className={`${styles.cornerDecor} ${styles.bottomLeft}`} />
                    <div className={`${styles.cornerDecor} ${styles.bottomRight}`} />
                    
                    {/* Golden Wax Seal */}
                    <div className={styles.waxSeal}>
                      <span className={styles.waxSealMark}>C</span>
                    </div>

                    <h2 className={styles.detailsTitle} style={{ marginTop: "1rem" }}>
                      Safe Harbor Reached!
                    </h2>
                    <p style={{ fontFamily: "var(--font-outfit)", fontStyle: "italic", fontSize: "0.85rem", color: "#614d3f", textAlign: "center", margin: "1rem 0 2rem 0", lineHeight: "1.5" }}>
                      "Ahoy, matey! Me ship has safely docked. Yer delicacies have been delivered to yer coordinates. Enjoy the feast, and may fair winds follow ye!"
                      <br/>
                      <strong style={{ color: "#3b2314", display: "block", marginTop: "0.5rem" }}>— Mr. Carter, Cart Captain</strong>
                    </p>

                    <button 
                      className={styles.closeDetailsBtn}
                      onClick={resetAll}
                      style={{ width: "100%" }}
                    >
                      Return to Port
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
