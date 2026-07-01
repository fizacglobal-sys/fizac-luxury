"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation"; // 👈 ENSURE THIS LINE IS AT THE TOP OF YOUR FILE


interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SubSubCategory {
  name: string;
  slug: string;
}

interface SubCategory {
  subCategoryName: string;
  slug: string;
  subSubCategories: SubSubCategory[];
}

interface NavigationTreePillar {
  title: string;
  sections: SubCategory[];
}

const NAVIGATION_TREE: Record<string, NavigationTreePillar> = {
  "new-arrival": {
    title: "NEW ARRIVAL",
    sections: [
      {
        subCategoryName: "FOR HER",
        slug: "for-her",
        subSubCategories: [
          { name: "Women's New Arrival", slug: "womens-new-arrival" },
          { name: "Fizac Gallaria", slug: "fizac-gallaria" }
        ]
      },
      {
        subCategoryName: "FOR HIM",
        slug: "for-him",
        subSubCategories: [
          { name: "Men's New Arrival", slug: "mens-new-arrival" }
        ]
      }
    ]
  },
  "gifts-dept": {
    title: "GIFTS & PERSONALIZATION",
    sections: [
      {
        subCategoryName: "HOUSE CURATIONS",
        slug: "house-curations",
        subSubCategories: [
          { name: "Gifts for Her", slug: "gifts-for-her" },
          { name: "Gifts for Him", slug: "gifts-for-him" },
          { name: "Gifts for Children", slug: "gifts-for-children" },
          { name: "Personalized Gifts", slug: "personalized-gifts" }
        ]
      },
      {
        subCategoryName: "SEASONAL & SPECIAL SELECTIONS",
        slug: "seasonal-selections",
        subSubCategories: [
          { name: "Graduation Gifts", slug: "graduation-gifts" },
          { name: "Father's Day Gifts", slug: "fathers-day-gifts" },
          { name: "Mother's Day Gifts", slug: "mothers-day-gifts" }
        ]
      },
      {
        subCategoryName: "COLLECTION SELECTIONS",
        slug: "collection-gifts",
        subSubCategories: [
          { name: "Fragrance & Make-up Gifts", slug: "fragrance-makeup-gifts" },
          { name: "Jewelry Gifts", slug: "jewelry-gifts" },
          { name: "Handbag Gifts", slug: "handbag-gifts" }
        ]
      }
    ]
  },
  "women": {
    title: "WOMEN'S SELECTION", 
    sections: [
      {
        subCategoryName: "NEW IN WOMEN",
        slug: "new-in-women",
        subSubCategories: [
          { name: "View All", slug: "new-in-women-view-all" },
          { name: "Women's Summer styles", slug: "womens-summer-styles" },
          { name: "Denim Selection", slug: "denim-selection" },
          { name: "Summer Shoes", slug: "summer-shoes" },
          { name: "Fizac Women Generation", slug: "fizac-women-generation" }
        ]
      },
      {
        subCategoryName: "BAGS",
        slug: "bags",
        subSubCategories: [
          { name: "View All", slug: "bags-view-all" },
          { name: "Shoulder Bags", slug: "shoulder-bags" },
          { name: "Totes Bags", slug: "totes-bags" },
          { name: "Top Handles Bags", slug: "top-handles-bags" },
          { name: "Crossbody Bags", slug: "crossbody-bags" },
          { name: "Summer Handbags", slug: "summer-handbags" },
          { name: "Backpacks Bags", slug: "backpacks-bags" },
          { name: "Belt Bags", slug: "belt-bags" },
          { name: "Clutches & Evening Bags", slug: "clutches-evening-bags" },
          { name: "Personalized Bags", slug: "personalized-bags" }
        ]
      },
      {
        subCategoryName: "READY TO WEAR",
        slug: "ready-to-wear",
        subSubCategories: [
          { name: "View All", slug: "ready-to-wear-view-all" },
          { name: "Knitwear", slug: "knitwear" },
          { name: "Tops & Shirts", slug: "tops-shirts" },
          { name: "Dresses", slug: "dresses" },
          { name: "T-Shirts & Sweatshirts", slug: "t-shirts-sweatshirts" },
          { name: "Skirts", slug: "skirts" },
          { name: "Outerwear", slug: "outerwear" },
          { name: "Trousers & Shorts", slug: "trousers-shorts" },
          { name: "Jackets & Coats", slug: "jackets-coats" },
          { name: "Denim", slug: "denim-clothing" },
          { name: "Leather Clothing", slug: "leather-clothing" },
          { name: "Swimwear", slug: "swimwear" },
          { name: "Pajamas & Underwear", slug: "pajamas-underwear" }
        ]
      },
      {
        subCategoryName: "SHOES",
        slug: "shoes",
        subSubCategories: [
          { name: "View All", slug: "shoes-view-all" },
          { name: "Sandals & Mules", slug: "sandals-mules" },
          { name: "Pumps", slug: "pumps" },
          { name: "Summer shoes", slug: "shoes-summer" },
          { name: "Sneakers", slug: "sneakers" },
          { name: "Loafers", slug: "loafers" },
          { name: "Slides", slug: "slides" },
          { name: "Boots & Ankle Boots", slug: "boots-ankle-boots" },
          { name: "Evening Shoes", slug: "evening-shoes" }
        ]
      },
      {
        subCategoryName: "SMALL LEATHER GOODS",
        slug: "small-leather-goods",
        subSubCategories: [
          { name: "View All", slug: "slg-view-all" },
          { name: "Card holders", slug: "card-holders" },
          { name: "Small Wallets", slug: "small-wallets" },
          { name: "Long wallets", slug: "long-wallets" },
          { name: "Pouches", slug: "pouches" },
          { name: "Tech Accessories", slug: "tech-accessories" }
        ]
      },
      {
        subCategoryName: "TRAVEL",
        slug: "travel",
        subSubCategories: [
          { name: "View All", slug: "travel-view-all" },
          { name: "Travel Bags", slug: "travel-bags" },
          { name: "Luggage & Carry on", slug: "luggage-carry-on" },
          { name: "Travel Accessories", slug: "travel-items-accessories" }
        ]
      },
      {
        subCategoryName: "ACCESSORIES",
        slug: "accessories",
        subSubCategories: [
          { name: "View All", slug: "accessories-view-all" },
          { name: "Eyewear", slug: "eyewear" },
          { name: "Hats & Gloves", slug: "hats-gloves" },
          { name: "Silk & Scarves", slug: "silk-scarves" },
          { name: "Jewels", slug: "costume-jewels" },
          { name: "Headbands & Hair Accessories", slug: "headbands-hair-accessories" },
          { name: "Belt", slug: "belts" },
          { name: "Bag Charms & Keychains", slug: "bag-charms-keychains" },
          { name: "Socks & Tights", slug: "socks-tights" }
        ]
      },
      {
        subCategoryName: "JEWELRY & WATCHES",
        slug: "jewelry-watches",
        subSubCategories: [
          { name: "View All Jewelry", slug: "view-all-jewelry" },
          { name: "Rings", slug: "rings" },
          { name: "Necklaces", slug: "necklaces" },
          { name: "Bracelets", slug: "bracelets" },
          { name: "Earrings", slug: "earrings" },
          { name: "Watches", slug: "watches" }
        ]
      },
      {
        subCategoryName: "GIFTS",
        slug: "gifts",
        subSubCategories: [
          { name: "Petite Gifts", slug: "petite-gifts" },
          { name: "Special Gifts", slug: "special-gifts" },
          { name: "Personalized Gifts", slug: "women-personalized-gifts" },
          { name: "Beauty Gifts", slug: "beauty-gifts" },
          { name: "Jewelry Gifts", slug: "women-jewelry-gifts" },
          { name: "Handbag Gifts", slug: "women-handbag-gifts" },
          { name: "Gifts for Children", slug: "women-gifts-for-children" }
        ]
      }
    ]
  }, // Separating comma balanced correctly here
  "men": {
    title: "MEN'S SELECTION",
    sections: [
      {
        subCategoryName: "NEW IN MEN",
        slug: "men-new-in",
        subSubCategories: [
          { name: "View All", slug: "men-new-in-view-all" },
          { name: "Men's Summer styles", slug: "men-summer-styles" },
          { name: "Denim Selection", slug: "men-denim-selection" },
          { name: "Men Summer Shoes", slug: "men-summer-shoes-leaf" },
          { name: "Fizac Men Generation", slug: "fizac-men-generation" }
        ]
      },
      {
        subCategoryName: "BAGS",
        slug: "men-bags",
        subSubCategories: [
          { name: "View All", slug: "men-bags-view-all" },
          { name: "Shoulder Bags", slug: "men-shoulder-bags" },
          { name: "Totes Bags", slug: "men-totes-bags" },
          { name: "Top Handles Bags", slug: "men-top-handles-bags" },
          { name: "Crossbody Bags", slug: "men-crossbody-bags" },
          { name: "Summer Handbags", slug: "men-summer-handbags" },
          { name: "Backpacks Bags", slug: "men-backpacks-bags" },
          { name: "Belt Bags", slug: "men-belt-bags-leaf" },
          { name: "Clutches & Evening Bags", slug: "men-clutches-evening-bags" },
          { name: "Personalized Bags", slug: "men-personalized-bags" }
        ]
      },
      {
        subCategoryName: "READY TO WEAR",
        slug: "men-ready-to-wear",
        subSubCategories: [
          { name: "View All", slug: "men-ready-to-wear-view-all" },
          { name: "Knitwear", slug: "men-knitwear" },
          { name: "Tops & Shirts", slug: "men-tops-shirts" },
          { name: "Dresses", slug: "men-dresses" },
          { name: "T-Shirts & Sweatshirts", slug: "men-t-shirts-sweatshirts" },
          { name: "Skirts", slug: "men-skirts" },
          { name: "Outerwear", slug: "men-outerwear" },
          { name: "Trousers & Shorts", slug: "men-trousers-shorts" },
          { name: "Jackets & Coats", slug: "men-jackets-coats" },
          { name: "Denim", slug: "men-denim-clothing" },
          { name: "Leather Clothing", slug: "men-leather-clothing" },
          { name: "Swimwear", slug: "men-swimwear" },
          { name: "Pajamas & Underwear", slug: "men-pajamas-underwear" }
        ]
      },
      {
        subCategoryName: "SHOES",
        slug: "men-shoes",
        subSubCategories: [
          { name: "View All", slug: "men-shoes-view-all" },
          { name: "Sandals & Mules", slug: "men-sandals-mules" },
          { name: "Pumps", slug: "men-pumps" },
          { name: "Summer shoes", slug: "men-shoes-summer" },
          { name: "Sneakers", slug: "men-sneakers" },
          { name: "Loafers", slug: "men-loafers" },
          { name: "Slides", slug: "men-slides" },
          { name: "Boots & Ankle Boots", slug: "men-boots-ankle-boots" },
          { name: "Evening Shoes", slug: "men-evening-shoes" }
        ]
      },
            {
        subCategoryName: "SMALL LEATHER GOODS",
        slug: "men-small-leather-goods",
        subSubCategories: [
          { name: "View All", slug: "men-slg-view-all" },
          { name: "Card holders", slug: "men-card-holders" },
          { name: "Small Wallets", slug: "men-small-wallets" },
          { name: "Long wallets", slug: "men-long-wallets" },
          { name: "Pouches", slug: "men-pouches" },
          { name: "Tech Accessories", slug: "men-tech-accessories" }
        ]
      },
      {
        subCategoryName: "TRAVEL",
        slug: "men-travel",
        subSubCategories: [
          { name: "View All", slug: "men-travel-view-all" },
          { name: "Travel Bags", slug: "men-travel-bags" },
          { name: "Luggage & Carry on", slug: "men-luggage-carry-on" },
          { name: "Travel Accessories", slug: "men-travel-items-accessories" }
        ]
      },
      {
        subCategoryName: "ACCESSORIES",
        slug: "men-accessories",
        subSubCategories: [
          { name: "View All", slug: "men-accessories-view-all" },
          { name: "Eyewear", slug: "men-eyewear" },
          { name: "Hats & Gloves", slug: "men-hats-gloves" },
          { name: "Silk & Scarves", slug: "men-silk-scarves" },
          { name: "Jewels", slug: "men-costume-jewels" },
          { name: "Headbands & Hair Accessories", slug: "men-headbands-hair-accessories" },
          { name: "Belt", slug: "men-belts" },
          { name: "Bag Charms & Keychains", slug: "men-bag-charms-keychains" },
          { name: "Socks & Tights", slug: "men-socks-tights" }
        ]
      },
      {
        subCategoryName: "JEWELRY & WATCHES",
        slug: "men-jewelry-watches",
        subSubCategories: [
          { name: "View All Jewelry", slug: "men-view-all-jewelry" },
          { name: "Rings", slug: "men-rings" },
          { name: "Necklaces", slug: "men-necklaces" },
          { name: "Bracelets", slug: "men-bracelets" },
          { name: "Earrings", slug: "men-earrings" },
          { name: "Watches", slug: "men-watches" }
        ]
      },
      {
        subCategoryName: "GIFTS",
        slug: "men-gifts",
        subSubCategories: [
          { name: "Petite Gifts", slug: "men-petite-gifts" },
          { name: "Special Gifts", slug: "men-special-gifts" },
          { name: "Personalized Gifts", slug: "men-personalized-gifts-leaf" },
          { name: "Beauty Gifts", slug: "men-beauty-gifts" },
          { name: "Jewelry Gifts", slug: "men-jewelry-gifts-leaf" },
          { name: "Handbag Gifts", slug: "men-handbag-gifts-leaf" },
          { name: "Gifts for Children", slug: "men-gifts-for-children-leaf" }
        ]
      }
    ]
  },
    "bags-dept": {
    title: "BAGS SELECTION",
    sections: [
      {
        subCategoryName: "COLLECTIONS",
        slug: "bags-collections-group",
        subSubCategories: [
          { name: "View All", slug: "bags-pillar-all" },
          { name: "Summer Bags", slug: "bags-pillar-summer" },
          { name: "Totes Bags", slug: "bags-pillar-totes" },
          { name: "Shoulder Bags", slug: "bags-pillar-shoulder" },
          { name: "Top Handle Bags", slug: "bags-pillar-top-handle" },
          { name: "Crossbody Bags", slug: "bags-pillar-crossbody" },
          { name: "Mini Bags", slug: "bags-pillar-mini" },
          { name: "Backpacks Bags", slug: "bags-pillar-backpacks" },
          { name: "Belt Bags", slug: "bags-pillar-belt" },
          { name: "Evening Bags", slug: "bags-pillar-evening" },
          { name: "Clutches", slug: "bags-pillar-clutches" },
          { name: "Personalized Bags", slug: "bags-pillar-personalized" }
        ]
      }
    ]
  },
    "children-dept": {
    title: "CHILDREN SELECTION",
    sections: [
      {
        subCategoryName: "BABY",
        slug: "child-group-baby",
        subSubCategories: [
          { name: "View All", slug: "child-baby-view-all" },
          { name: "New Born", slug: "child-baby-new-born" },
          { name: "Baby Girls", slug: "child-baby-girls" },
          { name: "Baby Boys", slug: "child-baby-boys" },
          { name: "Baby Shoes", slug: "child-baby-shoes" },
          { name: "Toddler Shoes", slug: "child-baby-toddler-shoes" },
          { name: "Diaper Bags", slug: "child-baby-diaper-bags" },
          { name: "Accessories", slug: "child-baby-accessories" }
        ]
      },
      {
        subCategoryName: "GIRLS",
        slug: "child-group-girls",
        subSubCategories: [
          { name: "View All", slug: "child-girls-view-all" },
          { name: "Clothing", slug: "child-girls-clothing" },
          { name: "Shoes", slug: "child-girls-shoes" },
          { name: "Bags", slug: "child-girls-bags" },
          { name: "Backpacks", slug: "child-girls-backpacks" },
          { name: "Belts", slug: "child-girls-belts" },
          { name: "Soft Accessories", slug: "child-girls-soft-accessories" }
        ]
      },
      {
        subCategoryName: "BOYS",
        slug: "child-group-boys",
        subSubCategories: [
          { name: "View All", slug: "child-boys-view-all" },
          { name: "Clothing", slug: "child-boys-clothing" },
          { name: "Shoes", slug: "child-boys-shoes" },
          { name: "Bags", slug: "child-boys-bags" },
          { name: "Backpacks", slug: "child-boys-backpacks" },
          { name: "Belts", slug: "child-boys-belts" },
          { name: "Soft Accessories", slug: "child-boys-soft-accessories" }
        ]
      },
      {
        subCategoryName: "GIFTS",
        slug: "child-group-gifts",
        subSubCategories: [
          { name: "View All", slug: "child-gifts-view-all" },
          { name: "Baby Girl", slug: "child-gifts-baby-girl" },
          { name: "Baby Boy", slug: "child-gifts-baby-boy" },
          { name: "Junior Girl", slug: "child-gifts-junior-girl" },
          { name: "Junior Boy", slug: "child-gifts-junior-boy" }
        ]
      }
    ]
  },
    "travel-dept": {
    title: "TRAVEL SELECTION",
    sections: [
      {
        subCategoryName: "TRAVEL FOR WOMEN",
        slug: "travel-group-women",
        subSubCategories: [
          { name: "View All", slug: "travel-women-view-all" },
          { name: "Luggage & Carry On", slug: "travel-women-luggage" },
          { name: "Travel Bags", slug: "travel-women-bags" },
          { name: "Travel Accessories", slug: "travel-women-accessories" }
        ]
      },
      {
        subCategoryName: "TRAVEL FOR MEN",
        slug: "travel-group-men",
        subSubCategories: [
          { name: "View All", slug: "travel-men-view-all" },
          { name: "Luggage & Carry On", slug: "travel-men-luggage" },
          { name: "Travel Bags", slug: "travel-men-bags" },
          { name: "Travel Accessories", slug: "travel-men-accessories" }
        ]
      }
    ]
  },
    "jewelry-watches-dept": {
    title: "JEWELRY & WATCHES",
    sections: [
      {
        subCategoryName: "JEWELRY CATEGORIES",
        slug: "jw-group-categories",
        subSubCategories: [
          { name: "View All Jewelry", slug: "jw-leaf-view-all" },
          { name: "Rings", slug: "jw-leaf-rings" },
          { name: "Necklaces", slug: "jw-leaf-necklaces" },
          { name: "Bracelets", slug: "jw-leaf-bracelets" },
          { name: "Earrings", slug: "jw-leaf-earrings" }
        ]
      },
      {
        subCategoryName: "GOLD JEWELRY",
        slug: "jw-group-gold",
        subSubCategories: []
      },
      {
        subCategoryName: "SILVER JEWELRY",
        slug: "jw-group-silver",
        subSubCategories: []
      },
      {
        subCategoryName: "FASHION JEWELRY",
        slug: "jw-group-fashion",
        subSubCategories: []
      },
      {
        subCategoryName: "WATCHES",
        slug: "jw-group-watches",
        subSubCategories: [
          { name: "For Women", slug: "jw-leaf-watches-women" },
          { name: "For Men", slug: "jw-leaf-watches-men" }
        ]
      },
      {
        subCategoryName: "COLLECTIONS",
        slug: "jw-group-collections",
        subSubCategories: []
      },
      {
        subCategoryName: "FIZAC HIGH JEWELRY",
        slug: "jw-group-high-jewelry",
        subSubCategories: []
      },
      {
        subCategoryName: "FIZAC HIGH WATCHMAKING",
        slug: "jw-group-high-watchmaking",
        subSubCategories: []
      }
    ]
  },
    "perfumes-dept": {
    title: "PERFUMES & BEAUTY",
    sections: [
      {
        subCategoryName: "FRAGRANCES",
        slug: "pb-group-fragrances",
        subSubCategories: [
          { name: "View All", slug: "haute-parfumerie" },
          { name: "New Arrivals", slug: "pb-frag-new-arrivals" },
          { name: "Women's Fragrance", slug: "pb-frag-womens" },
          { name: "Men's Fragrance", slug: "pb-frag-mens" },
          { name: "Universal Perfumes", slug: "pb-frag-universal" },
          { name: "Diffusers", slug: "pb-frag-diffusers" },
          { name: "Scented Candles", slug: "pb-frag-candles" },
          { name: "Humidifiers", slug: "pb-frag-humidifiers" }
        ]
      },
      {
        subCategoryName: "BEAUTY",
        slug: "pb-group-beauty",
        subSubCategories: [
          { name: "View All", slug: "pb-beauty-view-all" },
          { name: "Lipsticks", slug: "pb-beauty-lipsticks" },
          { name: "Lip Balms", slug: "pb-beauty-balms" },
          { name: "Face", slug: "pb-beauty-face" },
          { name: "Cosmetics", slug: "pb-beauty-cosmetics" },
          { name: "Skincare", slug: "pb-beauty-skincare" },
          { name: "Eyes", slug: "pb-beauty-eyes" },
          { name: "Brushes & Accessories", slug: "pb-beauty-brushes" }
        ]
      }
    ]
  },
    "home-lifestyle-dept": {
    title: "HOME DECOR & LIFESTYLE",
    sections: [
      {
        subCategoryName: "HOME DECOR",
        slug: "hdl-group-decor",
        subSubCategories: [
          { name: "View All", slug: "hdl-decor-view-all" },
          { name: "Tableware", slug: "hdl-decor-tableware" },
          { name: "Home Accessories", slug: "hdl-decor-accessories" },
          { name: "Textiles", slug: "hdl-decor-textiles" },
          { name: "Wallpaper", slug: "hdl-decor-wallpaper" },
          { name: "Furniture", slug: "hdl-decor-furniture" }
        ]
      },
      {
        subCategoryName: "LIFESTYLE",
        slug: "hdl-group-lifestyle",
        subSubCategories: [
          { name: "View All", slug: "hdl-life-view-all" },
          { name: "Books And Stationary", slug: "hdl-life-books" },
          { name: "Leisure Pieces", slug: "hdl-life-leisure" },
          { name: "Sporting Goods", slug: "hdl-life-sporting" }
        ]
      },
      {
        subCategoryName: "FIZAC PET COLLECTIONS",
        slug: "hdl-group-pets",
        subSubCategories: [
          { name: "View All", slug: "hdl-pet-view-all" },
          { name: "Pet Accessories", slug: "hdl-pet-accessories" },
          { name: "Pet Clothes", slug: "hdl-pet-clothes" },
          { name: "Pet Homeware", slug: "hdl-pet-homeware" }
        ]
      }
    ]
  },
    "services": {
    title: "FIZAC SERVICES",
    sections: [
      {
        subCategoryName: "OUR SERVICES",
        slug: "srv-main-container",
        subSubCategories: [
          { name: "View All Fizac Services", slug: "srv-group-all" },
          { name: "Complimentary Shipping And Return", slug: "srv-group-shipping" },
          { name: "Collect In Store", slug: "srv-group-collect" },
          { name: "Book An In Store Appointment", slug: "srv-group-appointment" },
          { name: "Packaging", slug: "srv-group-packaging" },
          { name: "Personalization", slug: "srv-group-personalization" }
        ]
      }
    ]
  },
  "world-of-fizac": {
    title: "WORLD OF FIZAC",
    sections: [
      {
        subCategoryName: "EXPLORE THE HOUSE",
        slug: "wrd-main-container",
        subSubCategories: [
          { name: "Fashion Shows", slug: "wrd-group-shows" },
          { name: "Digital Experiences", slug: "wrd-group-digital" },
          { name: "Fizac Stories", slug: "wrd-group-stories" },
          { name: "History Of Fizac", slug: "wrd-group-history" },
          { name: "House Of Fizac", slug: "wrd-group-house" },
          { name: "Our Commitment", slug: "wrd-group-commitment" }
        ]
      }
    ]
  },
};

const TABS_LIST = [
  { id: "new-arrival", label: "NEW ARRIVAL" },
  { id: "gifts-dept", label: "GIFTS" },
  { id: "women", label: "WOMEN" },
  { id: "men", label: "MEN" },
  { id: "bags-dept", label: "BAGS" },
  { id: "children-dept", label: "CHILDREN" },
  { id: "travel-dept", label: "TRAVEL" },
  { id: "jewelry-watches-dept", label: "JEWELRY & WATCHES" },
  { id: "perfumes-dept", label: "PERFUMES & BEAUTY" },
  { id: "home-lifestyle-dept", label: "HOME & LIFESTYLE" }
];

const SECONDARY_LINKS_LIST = [
  { id: "services", label: "FIZAC SERVICES" },
  { id: "world-of-fizac", label: "WORLD OF FIZAC" },
  { id: "store-locator", label: "STORE LOCATOR", href: "/stores" }
];

export default function MenuDrawer({ isOpen, onClose }: MenuDrawerProps) {
  const [activePillar, setActivePillar] = useState<string>("new-arrival");

  // 🛠️ ADDED: Fetches your dynamic active route subdirectory parameters
  const params = useParams();
  const currentLocale = typeof params?.locale === "string" ? params.locale.toLowerCase() : "ng";

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const currentPillarData = NAVIGATION_TREE[activePillar] || { title: "", sections: [] };

  const renderedProductButtons = TABS_LIST.map((tab) => {
    const isSelected = activePillar === tab.id;
    return (
      <button
        key={tab.id}
        onClick={() => setActivePillar(tab.id)}
        className={`text-[11px] tracking-[0.2em] text-left font-normal whitespace-nowrap transition-all duration-200 hover:text-black ${
          isSelected ? "text-black font-medium md:translate-x-2" : "text-neutral-400"
        }`}
      >
        {tab.label}
      </button>
    );
  });


  // ====================================================================
  // 🎨 GROTESQUE SANS-SERIF CORE STYLING MATRIX RENDERING LOOPS
  // ====================================================================
  const renderedSecondaryLinks = SECONDARY_LINKS_LIST.map((link) => {
    if (link.href) {
      return (
        <Link
          key={link.id}
          href={`/${currentLocale}${link.href}`}
          onClick={onClose}
          className="text-[11px] tracking-[0.22em] font-normal text-neutral-400 hover:text-black transition-colors block uppercase"
        >
          {link.label}
        </Link>
      );
    }

    const isSelected = activePillar === link.id;
    return (
      <button
        key={link.id}
        onClick={() => setActivePillar(link.id)}
        className={`text-[11px] tracking-[0.22em] text-left font-normal whitespace-nowrap transition-all duration-200 hover:text-black uppercase cursor-pointer ${
          isSelected ? "text-black font-medium" : "text-neutral-400"
        }`}
      >
        {link.label}
      </button>
    );
  });

  return (
    <div 
      style={{ fontFamily: "'Helvetica Neue', Arial, 'Helvetica', sans-serif" }} 
      className="fixed inset-0 z-50 flex"
    >
      {/* Background dimmer mask overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-xs" onClick={onClose} />

      {/* Main Slide-out Panel Frame Box */}
      <div className="relative w-full max-w-[900px] bg-white h-screen shadow-2xl flex flex-col md:flex-row transition-transform duration-300 text-black overflow-hidden">
        
        {/* LEFT COMPARTMENT: Side Navigation Controls Column */}
        {/* 📱 Mobile Optimization: Changed h-full to h-auto md:h-full so this navigation bar scales gracefully onto small phone viewports */}
        <div className="w-full md:w-[320px] bg-neutral-50 border-b md:border-b-0 md:border-r border-neutral-200 p-8 pt-24 flex flex-col justify-between overflow-y-auto scrollbar-none h-auto md:h-full">
          
          {/* Section A: Core Luxury Products Nav List */}
          <div className="flex flex-row md:flex-col space-x-5 md:space-x-0 md:space-y-7 overflow-x-auto md:overflow-x-visible scrollbar-none pb-6 md:pb-0">
            {TABS_LIST.map((tab) => {
              const isSelected = activePillar === tab.id;
              const hasSubMenus = (NAVIGATION_TREE[tab.id]?.sections?.length ?? 0) > 0;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActivePillar(tab.id)}
                  className={`text-[12px] tracking-[0.2em] text-left uppercase flex justify-between items-center w-auto md:w-full transition-all duration-200 hover:text-black group cursor-pointer whitespace-nowrap md:whitespace-normal ${
                    isSelected ? "text-black font-medium md:translate-x-1" : "text-neutral-500 font-normal"
                  }`}
                >
                  <span>{tab.label}</span>
                  {hasSubMenus && (
                    <span className={`text-[10px] tracking-normal font-normal text-neutral-400 transition-transform md:block hidden group-hover:translate-x-1 ${
                      isSelected ? "text-black scale-110" : ""
                    }`}>
                      &gt;
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Section B: Secondary Brand Utility Links Block */}
          <div className="mt-14 pt-8 border-t border-neutral-200 flex flex-col space-y-6 hidden md:flex">
            {SECONDARY_LINKS_LIST.map((link) => {
              const isSelected = activePillar === link.id;

              if (link.href) {
                return (
                  <Link
                    key={link.id}
                    href={`/${currentLocale}${link.href}`}
                    onClick={onClose}
                    className="text-[11px] tracking-[0.25em] font-normal text-neutral-500 hover:text-black transition-colors block uppercase"
                  >
                    {link.label}
                  </Link>
                );
              }

              const hasSubMenus = (NAVIGATION_TREE[link.id]?.sections?.length ?? 0) > 0;

              return (
                <button
                  key={link.id}
                  onClick={() => setActivePillar(link.id)}
                  className={`text-[11px] tracking-[0.25em] text-left uppercase flex justify-between items-center w-full transition-all duration-200 hover:text-black group cursor-pointer ${
                    isSelected ? "text-black font-medium" : "text-neutral-500 font-normal"
                  }`}
                >
                  <span>{link.label}</span>
                  {hasSubMenus && (
                    <span className="text-[9px] tracking-normal font-normal text-neutral-400 group-hover:translate-x-1 transition-transform">
                      &gt;
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* MOBILE FOOTER UTILITY COMPARTMENT */}
        <div className="w-full bg-neutral-50 p-6 border-t border-neutral-200 flex flex-col space-y-4 md:hidden">
          {SECONDARY_LINKS_LIST.map((link) => {
            if (link.href) {
              return (
                <Link
                  key={link.id}
                  href={`/${currentLocale}${link.href}`}
                  onClick={onClose}
                  className="text-[11px] tracking-[0.25em] font-normal text-neutral-500 hover:text-black transition-colors block uppercase"
                >
                  {link.label}
                </Link>
              );
            }
            return (
              <button
                key={link.id}
                onClick={() => {
                  setActivePillar(link.id);
                  const el = document.getElementById("right-compartment-view");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className={`text-[11px] tracking-[0.25em] text-left uppercase cursor-pointer ${
                  activePillar === link.id ? "text-black font-medium" : "text-neutral-500 font-normal"
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>

        {/* RIGHT COMPARTMENT PANEL: Dynamic Grid Rendering Section */}
        {/* 📱 Mobile Optimization: Changed flex-1 to md:flex-1 and added max-h-[50vh] md:max-h-screen to ensure the contents scroll beautifully inside mobile viewports instead of breaking your outer drawer container elements */}
        <div id="right-compartment-view" className="w-full md:flex-1 p-8 md:p-14 pt-16 md:pt-24 overflow-y-auto bg-white relative max-h-[50vh] md:max-h-screen">
          {/* Main Close Interface Button */}
          <button onClick={onClose} className="absolute top-6 md:top-8 right-6 md:right-8 text-neutral-400 hover:text-black transition-colors p-1 cursor-pointer">
            <svg className="w-6 h-6 stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <h2 className="text-[11px] tracking-[0.3em] font-medium text-neutral-400 mb-8 md:mb-10 uppercase border-b border-neutral-100 pb-3">
            {currentPillarData.title}
          </h2>

          {/* 📱 Mobile Optimization: Kept your grid-cols-1 sm:grid-cols-2 matrix layout perfectly intact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10 md:gap-y-12">
            {currentPillarData.sections.map((subCat) => (
              <div key={subCat.slug} className="flex flex-col space-y-4 md:space-y-5">
                
                {/* Level 2 Subcategory Title Block: Clickable Localized Heading */}
                <div className="flex justify-between items-center border-b border-neutral-100 pb-2">
                  <Link
                    href={`/${currentLocale}/shop/${subCat.slug}`}
                    onClick={onClose}
                    className="text-[12px] tracking-[0.2em] font-medium text-neutral-900 uppercase hover:text-neutral-500 transition-colors"
                  >
                    {subCat.subCategoryName}
                  </Link>
                  <span className="text-[10px] font-normal text-neutral-400 select-none">
                    &gt;
                  </span>
                </div>
                
                {/* Level 3 Sub-subcategories Leaf list nodes */}
                <ul className="flex flex-col space-y-3.5 pl-1">
                  {subCat.subSubCategories.map((leaf) => (
                    <li key={leaf.slug}>
                      <Link 
                        href={`/${currentLocale}/shop/${leaf.slug}`} 
                        onClick={onClose}
                        className="text-[11px] tracking-[0.18em] font-normal text-neutral-600 hover:text-black hover:font-medium transition-all block uppercase"
                      >
                        {leaf.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
