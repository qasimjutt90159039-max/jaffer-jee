// Jafferjees - Sharif Complex Gulgasht Multan - TypeScript Definitions

export interface ProductColor {
  name: string;
  hex: string;
  inStock?: boolean;
  image?: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  sku: string;
  category: string;
  categorySlug: string;
  price: number;
  discountPrice?: number;
  inStock: boolean;
  stockQuantity: number;
  images: string[];
  thumbnail: string;
  description: string;
  shortDescription: string;
  material: string;
  leatherType: string;
  hardware: string;
  dimensions: string;
  weight?: string;
  colors: ProductColor[];
  features: string[];
  specifications: Record<string, string>;
  specs?: Record<string, string>;
  careInstructions: string;
  isFeatured: boolean;
  isNewArrival: boolean;
  isBestSeller: boolean;
  isMonogrammable?: boolean;
  monogramEligible?: boolean;
  stock?: number;
  rating: number;
  reviewCount: number;
  reviewsCount?: number;
  tags: string[];
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount?: number;
  startingPrice?: number;
  featured?: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  product?: Product;
  selectedColor?: any;
  quantity: number;
  price: number;
  originalPrice?: number;
  title?: string;
  slug?: string;
  sku?: string;
  category?: string;
  image?: string;
  name?: string;
  stockQuantity?: number;
  personalization?: {
    initials: string;
    foilType: 'blind' | 'gold' | 'silver';
  };
}

export interface WishlistItem {
  id: string;
  productId: string;
  product: Product;
  addedAt: string;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  isDefault?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  role: 'customer' | 'admin';
  addresses?: Address[];
  createdAt: string;
}

export interface Notification {
  id: string;
  userId?: string;
  title: string;
  message: string;
  type: 'order' | 'system' | 'promotion' | 'monogram';
  isRead: boolean;
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  productTitle: string;
  productImage: string;
  sku: string;
  selectedColor?: string;
  price: number;
  quantity: number;
  total: number;
}

export type OrderStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Processing'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled';

export interface OrderCustomer {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  customer: OrderCustomer;
  items: OrderItem[];
  shippingMethod: 'standard' | 'express_multan' | 'store_pickup';
  shippingFee: number;
  subtotal: number;
  discountAmount: number;
  couponCode?: string;
  grandTotal: number;
  paymentMethod: 'cod' | 'bank_transfer' | 'card';
  paymentStatus: 'pending' | 'paid' | 'verified';
  status: OrderStatus;
  trackingNumber?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  productId: string;
  productTitle: string;
  author: string;
  city?: string;
  location?: string;
  rating: number;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
  isApproved: boolean;
}

export interface Question {
  id: string;
  name: string;
  question: string;
  answer?: string;
  createdAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderAmount: number;
  expiryDate: string;
  isActive: boolean;
  description: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'unread' | 'replied' | 'archived';
}

export interface AdminDashboardMetrics {
  totalSales: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  pendingOrders: number;
  completedOrders: number;
  lowStockCount: number;
}

export interface SiteSettings {
  businessName: string;
  tagline: string;
  phoneRaw: string;
  phoneFormatted: string;
  whatsappNumber: string;
  email: string;
  address: {
    street: string;
    landmark: string;
    area: string;
    city: string;
    postalCode: string;
    country: string;
    fullAddress: string;
    plusCode: string;
  };
  openingHours: {
    weekdays: string;
    sunday: string;
  };
  freeShippingThreshold: number;
  shippingRates: {
    standard: number;
    expressMultan: number;
    storePickup: number;
  };
  bankDetails: {
    bankName: string;
    accountTitle: string;
    accountNumber: string;
    iban: string;
    branch: string;
  };
}
