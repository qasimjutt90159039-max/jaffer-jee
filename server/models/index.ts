// Mongoose Models and TypeScript Database Interfaces for Jafferjees Multan
import mongoose, { Schema, Document } from 'mongoose';

// User Schema
export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  phone?: string;
  role: 'customer' | 'admin';
  addresses?: Array<{
    fullName: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    isDefault?: boolean;
  }>;
  createdAt: Date;
}

export const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  phone: { type: String, default: '' },
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
  addresses: [{
    fullName: String,
    phone: String,
    address: String,
    city: String,
    postalCode: String,
    isDefault: { type: Boolean, default: false }
  }],
  createdAt: { type: Date, default: Date.now }
});

// Product Schema
export interface IProduct extends Document {
  title: string;
  slug: string;
  sku: string;
  category: string;
  categorySlug: string;
  price: number;
  discountPrice?: number;
  inStock: boolean;
  stockQuantity: number;
  thumbnail: string;
  images: string[];
  description: string;
  shortDescription: string;
  material: string;
  leatherType: string;
  hardware: string;
  dimensions: string;
  weight?: string;
  colors: Array<{ name: string; hex: string; inStock?: boolean; image?: string }>;
  features: string[];
  specifications: Record<string, string>;
  careInstructions: string;
  isFeatured: boolean;
  isNewArrival: boolean;
  isBestSeller: boolean;
  rating: number;
  reviewCount: number;
  tags: string[];
  createdAt: Date;
}

export const ProductSchema = new Schema<IProduct>({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true },
  sku: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  categorySlug: { type: String, required: true },
  price: { type: Number, required: true },
  discountPrice: { type: Number },
  inStock: { type: Boolean, default: true },
  stockQuantity: { type: Number, default: 10 },
  thumbnail: { type: String, required: true },
  images: [{ type: String }],
  description: { type: String, required: true },
  shortDescription: { type: String, required: true },
  material: { type: String, default: 'Genuine Full-Grain Leather' },
  leatherType: { type: String, default: 'Full-Grain' },
  hardware: { type: String, default: 'Solid Brass' },
  dimensions: { type: String, default: '' },
  weight: { type: String, default: '' },
  colors: [{
    name: String,
    hex: String,
    inStock: { type: Boolean, default: true },
    image: String
  }],
  features: [{ type: String }],
  specifications: { type: Map, of: String },
  careInstructions: { type: String, default: '' },
  isFeatured: { type: Boolean, default: false },
  isNewArrival: { type: Boolean, default: false },
  isBestSeller: { type: Boolean, default: false },
  rating: { type: Number, default: 5.0 },
  reviewCount: { type: Number, default: 0 },
  tags: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

// Category Schema
export interface ICategory extends Document {
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount?: number;
  featured?: boolean;
}

export const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  itemCount: { type: Number, default: 0 },
  featured: { type: Boolean, default: false }
});

// Order Schema
export interface IOrder extends Document {
  orderNumber: string;
  userId?: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
  };
  items: Array<{
    productId: string;
    productTitle: string;
    productImage: string;
    sku: string;
    selectedColor?: string;
    price: number;
    quantity: number;
    total: number;
  }>;
  shippingMethod: 'standard' | 'express_multan' | 'store_pickup';
  shippingFee: number;
  subtotal: number;
  discountAmount: number;
  couponCode?: string;
  grandTotal: number;
  paymentMethod: 'cod' | 'bank_transfer' | 'card';
  paymentStatus: 'pending' | 'paid' | 'verified';
  status: 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  trackingNumber?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const OrderSchema = new Schema<IOrder>({
  orderNumber: { type: String, required: true, unique: true },
  userId: { type: String },
  customer: {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, default: '60700' }
  },
  items: [{
    productId: String,
    productTitle: String,
    productImage: String,
    sku: String,
    selectedColor: String,
    price: Number,
    quantity: Number,
    total: Number
  }],
  shippingMethod: { type: String, enum: ['standard', 'express_multan', 'store_pickup'], default: 'standard' },
  shippingFee: { type: Number, default: 250 },
  subtotal: { type: Number, required: true },
  discountAmount: { type: Number, default: 0 },
  couponCode: { type: String },
  grandTotal: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['cod', 'bank_transfer', 'card'], default: 'cod' },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'verified'], default: 'pending' },
  status: { type: String, enum: ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending' },
  trackingNumber: { type: String },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Review Schema
export interface IReview extends Document {
  productId: string;
  productTitle: string;
  author: string;
  city?: string;
  rating: number;
  comment: string;
  verifiedPurchase: boolean;
  isApproved: boolean;
  createdAt: Date;
}

export const ReviewSchema = new Schema<IReview>({
  productId: { type: String, required: true },
  productTitle: { type: String, required: true },
  author: { type: String, required: true },
  city: { type: String, default: 'Multan' },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  verifiedPurchase: { type: Boolean, default: true },
  isApproved: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

// Coupon Schema
export interface ICoupon extends Document {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderAmount: number;
  expiryDate: string;
  isActive: boolean;
  description: string;
}

export const CouponSchema = new Schema<ICoupon>({
  code: { type: String, required: true, unique: true, uppercase: true },
  discountType: { type: String, enum: ['percentage', 'fixed'], default: 'percentage' },
  discountValue: { type: Number, required: true },
  minOrderAmount: { type: Number, default: 0 },
  expiryDate: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  description: { type: String, default: '' }
});

// Contact Message Schema
export interface IContactMessage extends Document {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'unread' | 'replied' | 'archived';
  createdAt: Date;
}

export const ContactMessageSchema = new Schema<IContactMessage>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  subject: { type: String, default: 'Store Inquiry' },
  message: { type: String, required: true },
  status: { type: String, enum: ['unread', 'replied', 'archived'], default: 'unread' },
  createdAt: { type: Date, default: Date.now }
});

// Notification Schema
export interface INotification extends Document {
  userId?: string;
  title: string;
  message: string;
  type: 'order' | 'promo' | 'system';
  isRead: boolean;
  createdAt: Date;
}

export const NotificationSchema = new Schema<INotification>({
  userId: { type: String },
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['order', 'promo', 'system'], default: 'system' },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// Export Mongoose Models safely
export const UserModel = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export const ProductModel = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
export const CategoryModel = mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);
export const OrderModel = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
export const ReviewModel = mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);
export const CouponModel = mongoose.models.Coupon || mongoose.model<ICoupon>('Coupon', CouponSchema);
export const ContactMessageModel = mongoose.models.ContactMessage || mongoose.model<IContactMessage>('ContactMessage', ContactMessageSchema);
export const NotificationModel = mongoose.models.Notification || mongoose.model<INotification>('Notification', NotificationSchema);
