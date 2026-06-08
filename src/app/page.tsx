"use client";

import React, { useState, useRef, useEffect } from "react";
import ChefLoader from "../components/ChefLoader";
import { supabase } from "../supabase";
import styles from "./page.module.css";

const FALLBACK_MENU_DATA = [
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
  const [menuData, setMenuData] = useState<any[]>([]);
  const [inventoryMap, setInventoryMap] = useState<Record<string, number>>({});
  const [pageIndex, setPageIndex] = useState(0);
  const [cart, setCart] = useState<Record<string, { quantity: number, extras: string[] }>>({});
  const [selectedItemForModal, setSelectedItemForModal] = useState<any | null>(null);
  const [modalQuantity, setModalQuantity] = useState(1);
  const [modalExtras, setModalExtras] = useState<string[]>([]);
  const [showDetails, setShowDetails] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "generating" | "waiting_approval" | "cooking_timeline" | "sailing" | "delivered">("idle");
  const [cookingStage, setCookingStage] = useState(0);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [treasuryCodeInput, setTreasuryCodeInput] = useState("");
  const [availablePoints, setAvailablePoints] = useState<number | null>(null);
  const [pointsUsed, setPointsUsed] = useState<number>(0);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [show3DModel, setShow3DModel] = useState<boolean>(false);

  useEffect(() => {
    async function fetchMenu() {
      // Fetch and subscribe to inventory
      const { data: invData } = await supabase.from('inventory').select('id, quantity');
      const iMap: Record<string, number> = {};
      if (invData) {
        invData.forEach((i: any) => iMap[i.id] = i.quantity);
      }
      setInventoryMap(iMap);

      supabase.channel('public:inventory').on('postgres_changes', { event: '*', schema: 'public', table: 'inventory' }, (payload: any) => {
         if (payload.eventType === 'UPDATE' || payload.eventType === 'INSERT') {
            setInventoryMap(prev => ({ ...prev, [payload.new.id]: payload.new.quantity }));
         }
      }).subscribe();

      // In a real multi-tenant app, you would read the restaurant ID from the URL (e.g. /menu/[restaurant_id])
      // For this demo, we just fetch all available dishes from the database.
      const { data } = await supabase.from('dishes').select('*').eq('is_available', true);
      
      if (data && data.length > 0) {
        // Group items by category
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const grouped = data.reduce((acc: Record<string, any[]>, dish: any) => {
          if (dish.category === 'Extras (Add-ons)') return acc;
          const cat = dish.category || 'Chef Specials';
          if (!acc[cat]) acc[cat] = [];
          acc[cat].push({
            id: dish.id,
            name: dish.name,
            price: dish.price,
            desc: dish.description || 'A delicious culinary creation.',
            image_url: dish.image_url,
            restaurant_id: dish.restaurant_id,
            ingredients: dish.ingredients || [],
            extras: dish.extras || []
          });
          return acc;
        }, {});
        
        const formattedMenu = Object.keys(grouped).map(cat => ({
          category: cat,
          region: "THE ROYAL KITCHENS",
          items: grouped[cat]
        }));
        
        setMenuData(formattedMenu);
      } else {
        // Use fallback if database is empty
        setMenuData(FALLBACK_MENU_DATA);
      }
      setIsLoading(false);
    }
    fetchMenu();
  }, []);

  // Drag/Swipe coordinates refs
  const startX = useRef(0);
  const startY = useRef(0);
  const isDragging = useRef(false);

  const openItemModal = (item: any) => {
    if (cart[item.id]) {
      const newCart = { ...cart };
      delete newCart[item.id];
      setCart(newCart);
    } else {
      setSelectedItemForModal(item);
      setModalQuantity(1);
      setModalExtras([]);
    }
  };

  const selectedCount = Object.keys(cart).length;

  const selectedItemsList = Object.keys(cart).map((id) => {
    let foundItem: any = null;
    for (const cat of menuData) {
      const match = cat.items.find((i) => i.id === id);
      if (match) foundItem = match;
    }
    if (!foundItem) return null;

    const cartData = cart[id];
    let itemPrice = foundItem.price;
    const itemIngredients = [...(foundItem.ingredients || [])];

    const multipliedIngredients = itemIngredients.map(ing => ({
       ...ing,
       quantity: ing.quantity * cartData.quantity
    }));

    cartData.extras.forEach(extraName => {
       const extraObj = (foundItem.extras || []).find((e: any) => e.name === extraName);
       if (extraObj) {
           itemPrice += extraObj.price;
           if (extraObj.inventory_id) {
               multipliedIngredients.push({
                   inventory_id: extraObj.inventory_id,
                   name: extraObj.name,
                   quantity: (extraObj.quantity || 1) * cartData.quantity,
                   unit: extraObj.unit || ''
               });
           }
           if (extraObj.ingredients && Array.isArray(extraObj.ingredients)) {
               extraObj.ingredients.forEach((ing: any) => {
                   multipliedIngredients.push({
                       ...ing,
                       quantity: ing.quantity * cartData.quantity
                   });
               });
           }
       }
    });

    return {
      id: foundItem.id,
      name: foundItem.name,
      price: itemPrice * cartData.quantity,
      quantity: cartData.quantity,
      restaurant_id: foundItem.restaurant_id,
      ingredients: multipliedIngredients,
      selected_extras: cartData.extras
    };
  }).filter(Boolean);

  const totalPrice = selectedItemsList.reduce((sum, item: any) => sum + item.price, 0);

  const TOTAL_PAGES = menuData.length > 0 ? menuData.length + 2 : 2;

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

  const handlePaymentSubmit = async () => {
    setShowDetails(false);
    setPaymentStatus("generating");

    const restaurantId = selectedItemsList[0]?.restaurant_id;
    if (!restaurantId) {
      alert("Error: No restaurant ID found for these items. Please recreate the dish in the Admin menu.");
      setPaymentStatus("idle");
      return;
    }

    const finalCode = treasuryCodeInput || Array.from({length: 16}, () => Math.floor(Math.random() * 10)).join('');
    setGeneratedCode(finalCode);

    const finalTotal = Math.max(0, totalPrice - pointsUsed);

    try {
      // 1. Insert Order to DB
      const { data, error } = await supabase.from('orders').insert({
        restaurant_id: restaurantId,
        items: selectedItemsList,
        total_amount: finalTotal,
        treasury_code: finalCode,
        points_used: pointsUsed,
        points_earned: 0,
        status: 'pending'
      }).select().single();

      if (error) throw error;
      
      // Order generated, now wait for admin
      setPaymentStatus("waiting_approval");

      // 2. Subscribe to real-time updates for this specific order
      const channel = supabase.channel(`order-updates-${data.id}`)
        .on(
          'postgres_changes',
          { event: 'UPDATE', schema: 'public', table: 'orders', filter: `id=eq.${data.id}` },
          (payload) => {
            if (payload.new.status === 'accepted') {
              setPaymentStatus("cooking_timeline");
              setCookingStage(0);
              supabase.removeChannel(channel);
            } else if (payload.new.status === 'rejected') {
              setPaymentStatus("idle");
              alert("Sorry, your order was rejected by the kitchen.");
              supabase.removeChannel(channel);
            }
          }
        )
        .subscribe();

    } catch (err: any) {
      console.error("Order creation failed:", err);
      alert("Order creation failed: " + (err.message || JSON.stringify(err)));
      setPaymentStatus("idle");
    }
  };

  const resetAll = () => {
    setCart({});
    setPaymentStatus("idle");
    setCookingStage(0);
    setPageIndex(0);
  };

  useEffect(() => {
    if (paymentStatus === "cooking_timeline") {
      const stages = [
        { timeout: 0, stage: 0 }, // Preparing Ingredients
        { timeout: 2500, stage: 1 }, // Cooking in the Galley
        { timeout: 5000, stage: 2 }, // Plating the Feast
        { timeout: 7500, stage: 3 }, // Waiter on its way
        { timeout: 10000, stage: 4 } // Delivered
      ];
      
      const timers = stages.map(({ timeout, stage }) => 
        setTimeout(() => {
          if (stage === 4) {
            setPaymentStatus("delivered");
          } else {
            setCookingStage(stage);
          }
        }, timeout)
      );

      return () => timers.forEach(clearTimeout);
    }
  }, [paymentStatus]);

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
                        <div className={idx === 0 ? styles.vintageShipBg : styles.vintageShipBgBack} />
                        <div className={styles.fullCoverContent}>
                          {idx === 0 ? (
                            <div className={styles.swipeHintCover}>
                              [ Swipe Left to Open Menu ]
                            </div>
                          ) : (
                            <>
                              <div className={styles.coverButtonContainer}>
                                <button
                                  className={`${styles.paymentBtn} ${
                                    selectedCount > 0 ? styles.activePayment : ""
                                  }`}
                                  disabled={selectedCount === 0}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setShowDetails(true);
                                  }}
                                >
                                  {selectedCount > 0
                                    ? `Proceed to Checkout ($${totalPrice.toFixed(2)})`
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
                            <h1 className={styles.mapTitle}>{menuData[idx - 1].category}</h1>
                            <div className={styles.mapCoordinates}>
                              REGION: {menuData[idx - 1].region}
                            </div>
                          </div>

                          <div className={styles.menuList}>
                            {menuData[idx - 1].items.map((item: any) => {
                              const isChecked = !!cart[item.id];
                              const isOutOfStock = item.ingredients && item.ingredients.some((ing: any) => Number(inventoryMap[ing.inventory_id] || 0) < Number(ing.quantity));

                              return (
                                <div
                                  key={item.id}
                                  className={`${styles.menuListItem} ${
                                    isChecked ? styles.selectedItem : ""
                                  }`}
                                  style={{ opacity: isOutOfStock ? 0.4 : 1, filter: isOutOfStock ? 'grayscale(100%)' : 'none' }}
                                  onClick={() => {
                                    if (isDragging.current) return;
                                    if (isOutOfStock) {
                                      alert("Sorry, out of stock :(");
                                      return;
                                    }
                                    openItemModal(item);
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
                                    {item.image_url && (
                                      <button 
                                        className={styles.eyeIconBtn} 
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setPreviewImage(item.image_url);
                                        }}
                                        title="View dish image"
                                      >
                                        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                          <circle cx="12" cy="12" r="3"></circle>
                                        </svg>
                                      </button>
                                    )}
                                    <button 
                                      className={styles.eyeIconBtn} 
                                      style={{ marginLeft: "8px" }}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setShow3DModel(true);
                                      }}
                                      title="View 3D Model"
                                    >
                                      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 7h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z"></path>
                                        <circle cx="12" cy="13" r="3"></circle>
                                        <path d="M15 4h-6"></path>
                                      </svg>
                                    </button>
                                  </div>
                                  <span className={styles.itemConnector} />
                                  <span className={styles.itemPrice}>
                                    ${item.price.toFixed(2)} {isChecked && <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>(x{cart[item.id].quantity})</span>}
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
                                setShowDetails(true);
                              }}
                            >
                              {selectedCount > 0
                                ? `Proceed to Checkout ($${totalPrice.toFixed(2)})`
                                : "Select Items to Proceed"}
                            </button>
                          </div>

                          <div className={styles.pageNumberWatermark}>
                            Page {idx} of {menuData.length}
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
                            ? "Ahoy! I&apos;m ready to take your orders, matey!" 
                            : "Ahoy! Ye haven&apos;t added any delicacies to me deck yet!"
                          }
                        </p>
                      </div>
                    </div>

                    <h3 className={styles.detailsTitle}>
                      Your Order Details
                    </h3>
                    <div className={styles.detailsCoordinates}>
                      MR. CARTER&apos;S ACTIVE DELIVERIES
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
                      <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "2px double rgba(92, 61, 33, 0.3)", paddingTop: "1rem" }}>
                        <span style={{ fontWeight: "bold", fontSize: "0.95rem", textTransform: "uppercase", color: "#3b2314" }}>Total Feast Value:</span>
                        <span style={{ fontWeight: "bold", fontSize: "1.1rem", color: "#ba6f1b" }}>${totalPrice.toFixed(2)}</span>
                      </div>
                    )}

                    {/* Treasury Passcode Section */}
                    {selectedItemsList.length > 0 && (
                      <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem', width: '100%', background: 'rgba(92, 61, 33, 0.05)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(92, 61, 33, 0.2)' }}>
                        <h4 style={{ color: '#5c3d21', margin: '0 0 0.5rem 0', fontFamily: 'serif' }}>💎 Loyalty Treasury</h4>
                        {availablePoints === null ? (
                          <div>
                            <p style={{ margin: '0 0 0.8rem 0', fontSize: '0.85rem', color: '#614d3f' }}>Got a 16-digit Treasury Passcode? Check your balance!</p>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                              <input 
                                type="text" 
                                placeholder="Enter 16-digit Passcode" 
                                value={treasuryCodeInput}
                                onChange={(e) => setTreasuryCodeInput(e.target.value.replace(/[^0-9]/g, '').slice(0, 16))}
                                style={{ flex: 1, padding: '0.6rem', borderRadius: '4px', border: '1px solid rgba(92, 61, 33, 0.3)', background: '#fff', fontSize: '1rem', letterSpacing: '1px', width: '100%' }}
                              />
                              <button 
                                onClick={async () => {
                                  if (!treasuryCodeInput || treasuryCodeInput.length < 16) {
                                    alert("Please enter a valid 16-digit passcode.");
                                    return;
                                  }
                                  const { data } = await supabase.from('orders').select('points_earned, points_used').eq('treasury_code', treasuryCodeInput).eq('status', 'accepted');
                                  if (data) {
                                    const bal = data.reduce((acc, o) => acc + (Number(o.points_earned) || 0) - (Number(o.points_used) || 0), 0);
                                    setAvailablePoints(Math.max(0, bal));
                                  } else {
                                    setAvailablePoints(0);
                                  }
                                }}
                                style={{ padding: '0.6rem 1rem', background: '#5c3d21', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                              >Check</button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <p style={{ margin: '0 0 0.5rem 0', color: '#3b2314', fontSize: '1rem' }}>Available Balance: <strong>${availablePoints.toFixed(2)}</strong></p>
                            {availablePoints > 0 && pointsUsed === 0 && (
                              <button 
                                onClick={() => {
                                  const maxUse = Math.min(availablePoints, totalPrice);
                                  setPointsUsed(maxUse);
                                }}
                                style={{ width: '100%', padding: '0.6rem', background: '#ba6f1b', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}
                              >Apply Points (Use ${Math.min(availablePoints, totalPrice).toFixed(2)})</button>
                            )}
                            {pointsUsed > 0 && (
                              <p style={{ color: 'green', margin: 0, fontWeight: 'bold', fontSize: '0.9rem' }}>Applied ${pointsUsed.toFixed(2)} discount to your order!</p>
                            )}
                          </div>
                        )}
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
                        Pay ${Math.max(0, totalPrice - pointsUsed).toFixed(2)}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Generating Request Animation */}
            {paymentStatus === "generating" && (
              <div className={styles.waitingOverlay}>
                <div className={styles.waitingContent}>
                  <div className={styles.pulseRing}></div>
                  <h2 style={{ color: '#5c3d21', marginTop: '1.5rem', fontFamily: 'serif', fontSize: '1.8rem' }}>Generating Order...</h2>
                  <p style={{ color: '#3b2314', opacity: 0.8, fontSize: '1.1rem', marginTop: '0.5rem' }}>Securing your items in the ledger.</p>
                </div>
              </div>
            )}

            {/* Waiting for Kitchen Mock Overlay */}
            {paymentStatus === "waiting_approval" && (
              <div className={styles.waitingOverlay}>
                <div className={styles.waitingContent}>
                  <div className={styles.compassWrapper}>
                    <svg viewBox="0 0 100 100" className={styles.spinningCompass}>
                      <circle cx="50" cy="50" r="45" fill="#fdfaf2" stroke="#5c3d21" strokeWidth="4" />
                      <circle cx="50" cy="50" r="38" fill="none" stroke="#ba6f1b" strokeWidth="1" strokeDasharray="4 4" />
                      {/* Star marks */}
                      <path d="M50 15 L53 45 L85 50 L53 55 L50 85 L47 55 L15 50 L47 45 Z" fill="#5c3d21" />
                      <path d="M50 15 L50 85 M15 50 L85 50" stroke="#ba6f1b" strokeWidth="1" />
                      <circle cx="50" cy="50" r="4" fill="#ba6f1b" />
                    </svg>
                  </div>
                  <h2 style={{ color: '#5c3d21', marginTop: '1.5rem', fontFamily: 'serif', fontSize: '1.8rem' }}>Awaiting Approval...</h2>
                  <p style={{ color: '#3b2314', opacity: 0.8, fontSize: '1.1rem', marginTop: '0.5rem' }}>Waiting for the kitchen to accept your order.</p>
                </div>
              </div>
            )}

            {/* Chef Cooking Timeline Overlay */}
            {paymentStatus === "cooking_timeline" && (
              <div className={styles.waitingOverlay}>
                <div className={styles.cookingContent}>
                  
                  {/* Animated Chef Hat SVG */}
                  <div className={styles.chefHatWrapper}>
                    <svg viewBox="0 0 100 100" className={styles.chefHatSvg}>
                      <path d="M20 60 C10 60 10 40 25 40 C25 20 45 10 60 20 C75 10 90 25 85 45 C100 50 95 70 80 65 L75 85 L25 85 L20 60 Z" fill="#fdfaf2" stroke="#5c3d21" strokeWidth="4" />
                      <line x1="35" y1="85" x2="35" y2="70" stroke="#5c3d21" strokeWidth="3" />
                      <line x1="50" y1="85" x2="50" y2="65" stroke="#5c3d21" strokeWidth="3" />
                      <line x1="65" y1="85" x2="65" y2="70" stroke="#5c3d21" strokeWidth="3" />
                    </svg>
                  </div>

                  <h2 className={styles.cookingTitle}>Order Approved!</h2>
                  <p className={styles.cookingSubtitle}>The chef has started working on your feast.</p>

                  {/* Timeline Bar */}
                  <div className={styles.timelineContainer}>
                    <div className={styles.timelineTrack}>
                      <div 
                        className={styles.timelineFill} 
                        style={{ width: `${(cookingStage / 3) * 100}%` }}
                      />
                    </div>
                    
                    <div className={styles.timelineStages}>
                      <div className={`${styles.stage} ${cookingStage >= 0 ? styles.activeStage : ''}`}>
                        <div className={styles.stageDot}></div>
                        <span>Preparing</span>
                      </div>
                      <div className={`${styles.stage} ${cookingStage >= 1 ? styles.activeStage : ''}`}>
                        <div className={styles.stageDot}></div>
                        <span>Cooking</span>
                      </div>
                      <div className={`${styles.stage} ${cookingStage >= 2 ? styles.activeStage : ''}`}>
                        <div className={styles.stageDot}></div>
                        <span>Plating</span>
                      </div>
                      <div className={`${styles.stage} ${cookingStage >= 3 ? styles.activeStage : ''}`}>
                        <div className={styles.stageDot}></div>
                        <span>Serving</span>
                      </div>
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
                    <p style={{ fontFamily: "var(--font-outfit)", fontStyle: "italic", fontSize: "0.85rem", color: "#614d3f", textAlign: "center", margin: "1rem 0 1rem 0", lineHeight: "1.5" }}>
                      &quot;Ahoy, matey! Me ship has safely docked. Yer delicacies have been delivered to yer coordinates. Enjoy the feast, and may fair winds follow ye!&quot;
                      <br/>
                      <strong style={{ color: "#3b2314", display: "block", marginTop: "0.5rem" }}>— Mr. Carter, Cart Captain</strong>
                    </p>

                    {generatedCode && (
                       <div style={{ width: '100%', background: 'rgba(92, 61, 33, 0.08)', padding: '1.2rem', borderRadius: '8px', border: '1px dashed #5c3d21', textAlign: 'center', marginBottom: '1.5rem' }}>
                         <h4 style={{ margin: '0 0 0.5rem 0', color: '#ba6f1b', fontFamily: 'serif', fontSize: '1.2rem' }}>💎 Your Loyalty Treasury Passcode</h4>
                         <p style={{ margin: '0 0 0.8rem 0', fontSize: '0.9rem', color: '#5c3d21' }}>You earned points on this order! Save this code to redeem them next time.</p>
                         <div style={{ background: '#fff', padding: '0.8rem', borderRadius: '4px', border: '1px solid rgba(92, 61, 33, 0.3)' }}>
                           <span style={{ fontSize: '1.4rem', letterSpacing: '2px', fontFamily: 'monospace', color: '#3b2314', fontWeight: 'bold' }}>
                             {generatedCode.match(/.{1,4}/g)?.join('-')}
                           </span>
                         </div>
                       </div>
                    )}

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

            {/* Image Preview Overlay Modal */}
            {previewImage && (
              <div 
                className={`${styles.detailsOverlay} fade-in`}
                onClick={() => setPreviewImage(null)}
                style={{ zIndex: 1000 }}
              >
                <div 
                  className={styles.imageModal}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className={styles.detailsBorder} style={{ padding: "1rem", display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
                    <div className={`${styles.cornerDecor} ${styles.topLeft}`} />
                    <div className={`${styles.cornerDecor} ${styles.topRight}`} />
                    <div className={`${styles.cornerDecor} ${styles.bottomLeft}`} />
                    <div className={`${styles.cornerDecor} ${styles.bottomRight}`} />
                    
                    <button 
                      className={styles.closeImageBtn}
                      onClick={() => setPreviewImage(null)}
                    >
                      <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                    
                    <div className={styles.imagePreviewContainer}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={previewImage} alt="Dish preview" className={styles.dishPreviewImg} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Item Modal (Quantity & Extras) */}
            {selectedItemForModal && (
              <div className={styles.waitingOverlay} onClick={() => setSelectedItemForModal(null)}>
                <div className={styles.waitingContent} style={{ textAlign: 'left', minWidth: '320px' }} onClick={e => e.stopPropagation()}>
                  <h2 style={{ color: '#5c3d21', marginBottom: '1.5rem', fontFamily: 'serif', fontSize: '1.8rem' }}>{selectedItemForModal.name}</h2>
                  
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#5c3d21' }}>Quantity</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: '#e6d6b8', padding: '0.5rem', borderRadius: '8px', width: 'fit-content' }}>
                      <button onClick={() => setModalQuantity(Math.max(1, modalQuantity - 1))} style={{ padding: '0.5rem 1rem', background: '#5c3d21', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>-</button>
                      <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#3b2314', width: '2rem', textAlign: 'center' }}>{modalQuantity}</span>
                      <button onClick={() => setModalQuantity(modalQuantity + 1)} style={{ padding: '0.5rem 1rem', background: '#5c3d21', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>+</button>
                    </div>
                  </div>

                  {selectedItemForModal.extras && selectedItemForModal.extras.length > 0 && (
                    <div style={{ marginBottom: '2rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 'bold', color: '#5c3d21' }}>Extras & Add-ons</label>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        {selectedItemForModal.extras.map((extra: any) => {
                          const extraOutOfStock = 
                            (extra.inventory_id && Number(inventoryMap[extra.inventory_id] || 0) < Number(extra.quantity || 1)) || 
                            (extra.ingredients && extra.ingredients.some((ing: any) => Number(inventoryMap[ing.inventory_id] || 0) < Number(ing.quantity)));

                          return (
                          <label key={extra.name} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: extraOutOfStock ? 'not-allowed' : 'pointer', background: 'rgba(92, 61, 33, 0.05)', padding: '0.8rem', borderRadius: '8px', border: '1px solid rgba(92, 61, 33, 0.2)', opacity: extraOutOfStock ? 0.5 : 1, filter: extraOutOfStock ? 'grayscale(100%)' : 'none' }}>
                            <input 
                              type="checkbox" 
                              disabled={extraOutOfStock}
                              checked={modalExtras.includes(extra.name)}
                              onChange={(e) => {
                                if (extraOutOfStock) {
                                  alert("Sorry, this extra is out of stock :(");
                                  return;
                                }
                                if (e.target.checked) setModalExtras([...modalExtras, extra.name]);
                                else setModalExtras(modalExtras.filter(n => n !== extra.name));
                              }}
                              style={{ width: '18px', height: '18px', accentColor: '#ba6f1b' }}
                            />
                            <span style={{ flex: 1, color: '#3b2314', fontWeight: 500 }}>{extra.name} {extraOutOfStock && "(Out of Stock)"}</span>
                            <span style={{ color: '#ba6f1b', fontWeight: 'bold' }}>+${extra.price.toFixed(2)}</span>
                          </label>
                        )})}
                      </div>
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button 
                      onClick={() => setSelectedItemForModal(null)}
                      style={{ flex: 1, padding: '0.8rem', background: 'transparent', border: '2px solid #5c3d21', borderRadius: '4px', color: '#5c3d21', fontWeight: 'bold', cursor: 'pointer' }}
                    >Cancel</button>
                    <button 
                      onClick={() => {
                        setCart({ ...cart, [selectedItemForModal.id]: { quantity: modalQuantity, extras: modalExtras } });
                        setSelectedItemForModal(null);
                      }}
                      style={{ flex: 1, padding: '0.8rem', background: '#ba6f1b', border: 'none', borderRadius: '4px', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}
                    >Add to Order</button>
                  </div>
                </div>
              </div>
            )}

            {show3DModel && (
              <div 
                className={`${styles.detailsOverlay} fade-in`}
                onClick={() => setShow3DModel(false)}
                style={{ zIndex: 1000 }}
              >
                <div 
                  className={styles.imageModal}
                  style={{ width: '90%', maxWidth: '600px' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className={styles.detailsBorder} style={{ padding: "1rem", display: "flex", flexDirection: "column", alignItems: "center", position: "relative", width: "100%", height: "100%", minHeight: "400px" }}>
                    <div className={`${styles.cornerDecor} ${styles.topLeft}`} />
                    <div className={`${styles.cornerDecor} ${styles.topRight}`} />
                    <div className={`${styles.cornerDecor} ${styles.bottomLeft}`} />
                    <div className={`${styles.cornerDecor} ${styles.bottomRight}`} />
                    
                    <button 
                      className={styles.closeImageBtn}
                      onClick={() => setShow3DModel(false)}
                    >
                      <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                    
                    <div className={styles.imagePreviewContainer} style={{ flex: 1, width: "100%", display: "flex", justifyContent: "center" }}>
                      <model-viewer
                        src="/Untitled.glb"
                        camera-controls
                        auto-rotate
                        style={{ width: "100%", height: "100%", minHeight: "350px", outline: "none", backgroundColor: "transparent" }}
                      ></model-viewer>
                    </div>
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
