import {
  CookingPot,
  ChefHat,
  UtensilsCrossed,
  Coffee,
  Shirt,
  Gem,
  Baby,
  Glasses,
  Blocks,
  Sparkles,
  Bike,
  Gift,
  Truck,
  MapPin,
  PackageCheck,
  Headset,
  type LucideIcon,
} from "lucide-react";

export type MegaMenuLink = {
  name: string;
  href: string;
};

export type MegaMenuColumn = {
  title: string;
  icon?: LucideIcon;
  thumb?: string;
  links: MegaMenuLink[];
};

export type FeaturedProduct = {
  name: string;
  image?: string;
  price: number;
  oldPrice?: number;
  rating?: number;
};

export type ServiceItem = {
  icon: LucideIcon;
  title: string;
  subtitle: string;
};

export type MegaMenuSide =
  | { type: "promo"; icon: LucideIcon; label: string; cta: string }
  | { type: "products"; title: string; products: FeaturedProduct[] }
  | { type: "editorial"; image: string; heading: string; cta: string }
  | { type: "featured"; product: FeaturedProduct }
  | { type: "photo"; image: string };

export type MegaMenuFooter =
  | { type: "brands"; brands: string[] }
  | { type: "services"; services: ServiceItem[] };

export type MegaMenuBackgroundImage = {
  src: string;
  /** Tailwind width class, e.g. "w-[65%]" */
  width?: string;
  /** Tailwind height class, e.g. "h-[80%]" */
  height?: string;
  /** Tailwind position classes, e.g. "-bottom-4 right-0" */
  position?: string;
  /** Tailwind object-fit/position classes, e.g. "object-contain object-bottom" */
  fit?: string;
};

export type MegaMenu = {
  columns: MegaMenuColumn[];
  side: MegaMenuSide;
  footer?: MegaMenuFooter;
  dark?: boolean;
  backgroundImage?: string | MegaMenuBackgroundImage;
};

export type NavLink = {
  name: string;
  href: string;
  megaMenu?: MegaMenu;
};

export const defaultNavLinks: NavLink[] = [
  {
    name: "Furniture",
    href: "#",
    megaMenu: {
      backgroundImage: {
        src: "https://images.shadcnspace.com/assets/backgrounds/navbar-12-furniture-bg.webp",
        width: "w-full",
        height: "h-[60%]",
        position: "-bottom-10 right-4 xl:right-16",
        fit: "object-contain object-bottom",
      },
      side: {
        type: "editorial",
        image:
          "https://images.shadcnspace.com/assets/backgrounds/navbar-12-furniture-lounge.webp",
        heading: "NEW SEASON\nLOUNGE COLLECTION",
        cta: "Shop the Edit",
      },
      columns: [
        {
          title: "Sofas & Armchairs",
          links: [
            { name: "Sofas", href: "#" },
            { name: "Armchairs", href: "#" },
            { name: "Recliners", href: "#" },
            { name: "Chaise Lounges", href: "#" },
          ],
        },
        {
          title: "Tables & Chairs",
          links: [
            { name: "Coffee Tables", href: "#" },
            { name: "Dining Tables", href: "#" },
            { name: "Console Tables", href: "#" },
            { name: "Bar Stools", href: "#" },
          ],
        },
        {
          title: "Storage Systems",
          links: [
            { name: "Wardrobes", href: "#" },
            { name: "Bookshelves", href: "#" },
            { name: "TV Units", href: "#" },
            { name: "Shoe Cabinets", href: "#" },
          ],
        },
        {
          title: "Kids Furniture",
          links: [
            { name: "Kids Beds", href: "#" },
            { name: "Study Desks", href: "#" },
            { name: "Toy Storage", href: "#" },
            { name: "Bunk Beds", href: "#" },
          ],
        },
      ],
    },
  },
  {
    name: "Cooking",
    href: "#",
    megaMenu: {
      side: {
        type: "editorial",
        image:
          "https://images.shadcnspace.com/assets/backgrounds/navbar-12-cooking-kitchen.webp",
        heading: "SEASONAL\nRECIPE KITS",
        cta: "Explore Kits",
      },
      footer: {
        type: "brands",
        brands: ["NORDIC HOME", "Lumen", "STUDIO OSLO", "KASA"],
      },
      columns: [
        {
          title: "Cookware",
          icon: CookingPot,
          links: [
            { name: "Pots & Pans", href: "#" },
            { name: "Woks", href: "#" },
            { name: "Grill Pans", href: "#" },
            { name: "Pressure Cookers", href: "#" },
          ],
        },
        {
          title: "Bakeware",
          icon: ChefHat,
          links: [
            { name: "Baking Trays", href: "#" },
            { name: "Cake Tins", href: "#" },
            { name: "Muffin Pans", href: "#" },
            { name: "Cooling Racks", href: "#" },
          ],
        },
        {
          title: "Kitchen Tools",
          icon: UtensilsCrossed,
          links: [
            { name: "Knife Sets", href: "#" },
            { name: "Chopping Boards", href: "#" },
            { name: "Utensil Sets", href: "#" },
            { name: "Graters", href: "#" },
          ],
        },
        {
          title: "Tableware",
          icon: Coffee,
          links: [
            { name: "Dinner Sets", href: "#" },
            { name: "Mugs & Cups", href: "#" },
            { name: "Glassware", href: "#" },
            { name: "Serving Bowls", href: "#" },
          ],
        },
      ],
    },
  },
  {
    name: "Accessories",
    href: "#",
    megaMenu: {
      backgroundImage: {
        src: "https://images.shadcnspace.com/assets/backgrounds/navbar-12-accessories-bg.webp",
        width: "w-fit",
        height: "h-[60%]",
        position: "-bottom-4 -left-4",
        fit: "object-contain object-bottom",
      },
      side: {
        type: "editorial",
        image:
          "https://images.shadcnspace.com/assets/ecommerce/product-overview/product-overview-02-img-1.webp",
        heading: "NEW IN\nACCESSORIES",
        cta: "Shop Now",
      },
      columns: [
        {
          title: "Bags",
          links: [
            { name: "Totes", href: "#" },
            { name: "Crossbody", href: "#" },
            { name: "Backpacks", href: "#" },
            { name: "Clutches", href: "#" },
          ],
        },
        {
          title: "Watches",
          links: [
            { name: "Analog", href: "#" },
            { name: "Smart Watches", href: "#" },
            { name: "Chronographs", href: "#" },
            { name: "Leather Straps", href: "#" },
          ],
        },
        {
          title: "Eyewear",
          links: [
            { name: "Sunglasses", href: "#" },
            { name: "Reading Glasses", href: "#" },
            { name: "Blue Light", href: "#" },
            { name: "Cases", href: "#" },
          ],
        },
        {
          title: "Bath & Body",
          links: [
            { name: "Fragrances", href: "#" },
            { name: "Grooming Kits", href: "#" },
            { name: "Skincare", href: "#" },
            { name: "Gift Sets", href: "#" },
          ],
        },
      ],
    },
  },
  {
    name: "Fashion",
    href: "#",
    megaMenu: {
      side: {
        type: "editorial",
        image:
          "https://images.shadcnspace.com/assets/ecommerce/product-overview/product-overview-01-img-1.webp",
        heading: "MEN'S CASUAL\nCOLLECTION",
        cta: "Shop Now",
      },
      columns: [
        {
          title: "Men",
          icon: Shirt,
          links: [
            { name: "Outerwear", href: "#" },
            { name: "Jackets", href: "#" },
            { name: "Jumpsuits", href: "#" },
          ],
        },
        {
          title: "Women",
          icon: Gem,
          links: [
            { name: "Knitwear", href: "#" },
            { name: "Skirts", href: "#" },
            { name: "Sweatshirts", href: "#" },
          ],
        },
        {
          title: "Kids",
          icon: Baby,
          links: [
            { name: "T-Shirts", href: "#" },
            { name: "Dungarees", href: "#" },
            { name: "Shorts", href: "#" },
          ],
        },
        {
          title: "Accessories",
          icon: Glasses,
          links: [
            { name: "Scarves", href: "#" },
            { name: "Hats", href: "#" },
            { name: "Sunglasses", href: "#" },
            { name: "Backpacks", href: "#" },
            { name: "Sneakers", href: "#" },
          ],
        },
      ],
    },
  },
  {
    name: "Electronics",
    href: "#",
    megaMenu: {
      side: {
        type: "products",
        title: "Best Sellers",
        products: [
          {
            name: "Space WH-1000XM5",
            image:
              "https://images.shadcnspace.com/assets/ecommerce/product-category/product-category-03-4.webp",
            price: 279,
            oldPrice: 349,
            rating: 4.5,
          },
          {
            name: "Apple Watch S9",
            image:
              "https://images.shadcnspace.com/assets/ecommerce/product-category/product-category-03-1.webp",
            price: 684,
            oldPrice: 855,
            rating: 4.5,
          },
        ],
      },
      footer: {
        type: "brands",
        brands: ["VOLTEK", "PIXA", "SONIQ", "NOVA TECH"],
      },
      columns: [
        {
          title: "Audio",
          thumb:
            "https://images.shadcnspace.com/assets/ecommerce/product-category/product-category-03-4.webp",
          links: [
            { name: "Headphones", href: "#" },
            { name: "Speakers", href: "#" },
            { name: "Soundbars", href: "#" },
            { name: "Earbuds", href: "#" },
          ],
        },
        {
          title: "Wearables",
          thumb:
            "https://images.shadcnspace.com/assets/ecommerce/product-category/product-category-03-1.webp",
          links: [
            { name: "Smartwatches", href: "#" },
            { name: "Fitness Bands", href: "#" },
            { name: "Watch Straps", href: "#" },
            { name: "Chargers", href: "#" },
          ],
        },
        {
          title: "Computing",
          thumb:
            "https://images.shadcnspace.com/assets/ecommerce/frequently-bought-together/bundle-item-keyboard.webp",
          links: [
            { name: "Laptops", href: "#" },
            { name: "Keyboards", href: "#" },
            { name: "Mice", href: "#" },
            { name: "Monitors", href: "#" },
          ],
        },
        {
          title: "Accessories",
          thumb:
            "https://images.shadcnspace.com/assets/ecommerce/product-category/product-category-04-3-white.webp",
          links: [
            { name: "Power Banks", href: "#" },
            { name: "Phone Cases", href: "#" },
            { name: "Cables", href: "#" },
            { name: "Adapters", href: "#" },
          ],
        },
      ],
    },
  },
  {
    name: "Toys",
    href: "#",
    megaMenu: {
      side: {
        type: "editorial",
        image:
          "https://images.shadcnspace.com/assets/backgrounds/navbar-12-toys-blocks.webp",
        heading: "NEW ARRIVALS\nFOR PLAYTIME",
        cta: "Shop Now",
      },
      footer: {
        type: "services",
        services: [
          {
            icon: Truck,
            title: "Shipping & Returns",
            subtitle: "Fast dispatch, easy returns",
          },
          {
            icon: MapPin,
            title: "Find Stores",
            subtitle: "Locate retail locations",
          },
          {
            icon: PackageCheck,
            title: "Free Shipping",
            subtitle: "On orders above $100",
          },
          {
            icon: Headset,
            title: "Customer Care",
            subtitle: "We're here to help",
          },
        ],
      },
      columns: [
        {
          title: "Building & Puzzles",
          icon: Blocks,
          links: [
            { name: "Building Blocks", href: "#" },
            { name: "Jigsaw Puzzles", href: "#" },
            { name: "Brain Teasers", href: "#" },
          ],
        },
        {
          title: "Creative Play",
          icon: Sparkles,
          links: [
            { name: "Art & Craft", href: "#" },
            { name: "Musical Toys", href: "#" },
            { name: "Role Play", href: "#" },
          ],
        },
        {
          title: "Outdoor Toys",
          icon: Bike,
          links: [
            { name: "Ride-Ons", href: "#" },
            { name: "Sports Sets", href: "#" },
            { name: "Garden Play", href: "#" },
          ],
        },
        {
          title: "Gifts & Occasions",
          icon: Gift,
          links: [
            { name: "Gift Sets", href: "#" },
            { name: "Party Supplies", href: "#" },
            { name: "Gift Cards", href: "#" },
          ],
        },
      ],
    },
  },
];
