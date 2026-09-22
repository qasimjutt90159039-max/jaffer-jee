import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { initialProducts, initialCategories, sampleReviews, sampleCoupons } from '../src/data/seedData';
import { Product, Category, Order, User, Review, Coupon, ContactMessage, Notification } from '../src/types';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

export interface DatabaseState {
  products: Product[];
  categories: Category[];
  orders: Order[];
  users: User[];
  reviews: Review[];
  coupons: Coupon[];
  messages: ContactMessage[];
  notifications: Notification[];
}

// Initial admin & demo user
const defaultAdminPasswordHash = bcrypt.hashSync('admin123', 10);
const defaultCustomerPasswordHash = bcrypt.hashSync('customer123', 10);

const initialUsers: User[] = [
  {
    id: 'user-admin-1',
    name: 'Jafferjees Multan Store Manager',
    email: 'admin@jafferjeesmultan.com',
    password: defaultAdminPasswordHash,
    role: 'admin',
    phone: '6616210415',
    createdAt: '2026-01-01'
  },
  {
    id: 'user-cust-1',
    name: 'Hamza Sheikh',
    email: 'hamza@example.com',
    password: defaultCustomerPasswordHash,
    role: 'customer',
    phone: '03001234567',
    addresses: [
      {
        id: 'addr-cust-1',
        fullName: 'Hamza Sheikh',
        phone: '03001234567',
        address: 'House 42, Block B, Gulgasht Colony',
        city: 'Multan',
        postalCode: '60700',
        isDefault: true
      }
    ],
    createdAt: '2026-02-01'
  }
];

const initialOrders: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'JAF-2026-1001',
    customer: {
      fullName: 'Dr. Tariq Mahmood',
      email: 'tariq.mahmood@example.com',
      phone: '03007894561',
      address: 'Bosan Road near BZU Gate 1',
      city: 'Multan',
      postalCode: '60700'
    },
    items: [
      {
        productId: 'prod-w-1',
        productTitle: 'Heritage Bifold Full-Grain Leather Wallet',
        productImage: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop',
        sku: 'JAF-WLT-001',
        selectedColor: 'Espresso',
        price: 4850,
        quantity: 1,
        total: 4850
      },
      {
        productId: 'prod-b-1',
        productTitle: 'Aristocrat Reversible Dress Leather Belt',
        productImage: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=800&auto=format&fit=crop',
        sku: 'JAF-BLT-001',
        selectedColor: 'Black / Cognac Dual',
        price: 5200,
        quantity: 1,
        total: 5200
      }
    ],
    shippingMethod: 'express_multan',
    shippingFee: 150,
    subtotal: 10050,
    discountAmount: 502,
    couponCode: 'MULTAN5',
    grandTotal: 9698,
    paymentMethod: 'cod',
    paymentStatus: 'pending',
    status: 'Shipped',
    trackingNumber: 'TCS-MLT-992381',
    notes: 'Please call before delivery to ensure resident is home.',
    createdAt: '2026-03-12T14:30:00Z',
    updatedAt: '2026-03-13T09:15:00Z'
  },
  {
    id: 'ord-1002',
    orderNumber: 'JAF-2026-1002',
    customer: {
      fullName: 'Ayesha Siddiqui',
      email: 'ayesha.s@example.com',
      phone: '03215558899',
      address: 'House 14, Officers Colony',
      city: 'Multan',
      postalCode: '60700'
    },
    items: [
      {
        productId: 'prod-gf-1',
        productTitle: 'The Sultan Presentation Gift Box',
        productImage: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=800&auto=format&fit=crop',
        sku: 'JAF-GFT-001',
        selectedColor: 'Onyx Presentation Box',
        price: 11500,
        quantity: 1,
        total: 11500
      }
    ],
    shippingMethod: 'store_pickup',
    shippingFee: 0,
    subtotal: 11500,
    discountAmount: 1150,
    couponCode: 'WELCOME10',
    grandTotal: 10350,
    paymentMethod: 'cod',
    paymentStatus: 'pending',
    status: 'Processing',
    notes: 'Store pickup requested at Sharif Complex Gulgasht.',
    createdAt: '2026-03-14T11:20:00Z',
    updatedAt: '2026-03-14T11:25:00Z'
  }
];

const initialMessages: ContactMessage[] = [
  {
    id: 'msg-1',
    name: 'Khurram Shehzad',
    email: 'khurram@example.com',
    phone: '03336123456',
    subject: 'Bulk Corporate Gifting for Multan Chamber of Commerce',
    message: 'Hello, we require 40 customized leather bifold wallets embossed with our company crest for an upcoming seminar at Multan. Can we arrange a sample meeting at your Sharif Complex store?',
    status: 'unread',
    createdAt: '2026-03-14T08:00:00Z'
  }
];

class DatabaseService {
  private state: DatabaseState = {
    products: [],
    categories: [],
    orders: [],
    users: [],
    reviews: [],
    coupons: [],
    messages: [],
    notifications: []
  };

  private isMongoConnected = false;

  constructor() {
    this.initLocalStore();
    this.connectMongo();
  }

  private initLocalStore() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }

      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        this.state = {
          products: parsed.products && parsed.products.length ? parsed.products : initialProducts,
          categories: parsed.categories && parsed.categories.length ? parsed.categories : initialCategories,
          orders: parsed.orders || initialOrders,
          users: parsed.users || initialUsers,
          reviews: parsed.reviews || sampleReviews,
          coupons: parsed.coupons || sampleCoupons,
          messages: parsed.messages || initialMessages,
          notifications: parsed.notifications || []
        };
      } else {
        this.state = {
          products: initialProducts,
          categories: initialCategories,
          orders: initialOrders,
          users: initialUsers,
          reviews: sampleReviews,
          coupons: sampleCoupons,
          messages: initialMessages,
          notifications: []
        };
        this.persist();
      }
    } catch (e) {
      console.warn('Fallback store load notice:', e);
      this.state = {
        products: initialProducts,
        categories: initialCategories,
        orders: initialOrders,
        users: initialUsers,
        reviews: sampleReviews,
        coupons: sampleCoupons,
        messages: initialMessages,
        notifications: []
      };
    }
  }

  private persist() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(this.state, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to write db.json:', err);
    }
  }

  private async connectMongo() {
    const mongoUri = process.env.MONGODB_URI;
    if (mongoUri && mongoUri.startsWith('mongodb')) {
      try {
        await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 3000 });
        this.isMongoConnected = true;
        console.log('MongoDB connected successfully for Jafferjees Multan');
      } catch (err: any) {
        console.warn('MongoDB connection note (operating on resilient local store):', err.message || err);
      }
    }
  }

  // Products
  public getProducts(): Product[] {
    return this.state.products;
  }

  public getProductById(id: string): Product | undefined {
    return this.state.products.find(p => p.id === id || p.slug === id);
  }

  public saveProduct(product: Product): Product {
    const index = this.state.products.findIndex(p => p.id === product.id);
    if (index >= 0) {
      this.state.products[index] = product;
    } else {
      this.state.products.unshift(product);
    }
    this.persist();
    return product;
  }

  public deleteProduct(id: string): boolean {
    const initialLen = this.state.products.length;
    this.state.products = this.state.products.filter(p => p.id !== id);
    if (this.state.products.length !== initialLen) {
      this.persist();
      return true;
    }
    return false;
  }

  // Categories
  public getCategories(): Category[] {
    return this.state.categories;
  }

  // Orders
  public getOrders(): Order[] {
    return [...this.state.orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public getOrderById(id: string): Order | undefined {
    return this.state.orders.find(o => o.id === id || o.orderNumber === id);
  }

  public createOrder(orderData: Partial<Order>): Order {
    const orderNumber = `JAF-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      userId: orderData.userId,
      customer: orderData.customer || {
        fullName: 'Valued Customer',
        email: 'customer@jafferjeesmultan.com',
        phone: '6616210415',
        address: 'Sharif Complex Gulgasht',
        city: 'Multan',
        postalCode: '60700'
      },
      items: orderData.items || [],
      shippingMethod: orderData.shippingMethod || 'standard',
      shippingFee: orderData.shippingFee ?? 250,
      subtotal: orderData.subtotal || 0,
      discountAmount: orderData.discountAmount || 0,
      couponCode: orderData.couponCode,
      grandTotal: orderData.grandTotal || 0,
      paymentMethod: orderData.paymentMethod || 'cod',
      paymentStatus: orderData.paymentStatus || 'pending',
      status: 'Pending',
      notes: orderData.notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.state.orders.unshift(newOrder);

    // Decrease product stock quantities
    newOrder.items.forEach(item => {
      const prod = this.state.products.find(p => p.id === item.productId);
      if (prod) {
        prod.stockQuantity = Math.max(0, prod.stockQuantity - item.quantity);
        if (prod.stockQuantity === 0) {
          prod.inStock = false;
        }
      }
    });

    this.persist();
    return newOrder;
  }

  public updateOrderStatus(id: string, status: Order['status'], trackingNumber?: string): Order | undefined {
    const order = this.state.orders.find(o => o.id === id || o.orderNumber === id);
    if (order) {
      order.status = status;
      if (trackingNumber) order.trackingNumber = trackingNumber;
      order.updatedAt = new Date().toISOString();
      this.persist();
      return order;
    }
    return undefined;
  }

  // Users
  public getUsers(): User[] {
    return this.state.users;
  }

  public getUserByEmail(email: string): User | undefined {
    return this.state.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  public getUserById(id: string): User | undefined {
    return this.state.users.find(u => u.id === id);
  }

  public createUser(user: Partial<User>): User {
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: user.name || 'Valued Customer',
      email: user.email!.toLowerCase(),
      password: user.password ? bcrypt.hashSync(user.password, 10) : undefined,
      role: user.role || 'customer',
      phone: user.phone || '',
      addresses: user.addresses || [],
      createdAt: new Date().toISOString()
    };
    this.state.users.push(newUser);
    this.persist();
    return newUser;
  }

  // Reviews
  public getReviews(productId?: string): Review[] {
    if (productId) {
      return this.state.reviews.filter(r => r.productId === productId && r.isApproved);
    }
    return this.state.reviews;
  }

  public addReview(reviewData: Partial<Review>): Review {
    const newReview: Review = {
      id: `rev-${Date.now()}`,
      productId: reviewData.productId!,
      productTitle: reviewData.productTitle || '',
      author: reviewData.author || 'Anonymous Guest',
      city: reviewData.city || 'Multan',
      rating: reviewData.rating || 5,
      comment: reviewData.comment || '',
      verifiedPurchase: true,
      isApproved: true,
      date: new Date().toISOString().split('T')[0]
    };
    this.state.reviews.unshift(newReview);

    // Update product rating and review count
    const prod = this.state.products.find(p => p.id === newReview.productId);
    if (prod) {
      const prodReviews = this.state.reviews.filter(r => r.productId === prod.id);
      const totalRating = prodReviews.reduce((sum, r) => sum + r.rating, 0);
      prod.rating = parseFloat((totalRating / prodReviews.length).toFixed(1));
      prod.reviewCount = prodReviews.length;
    }

    this.persist();
    return newReview;
  }

  // Coupons
  public getCoupons(): Coupon[] {
    return this.state.coupons;
  }

  public getCouponByCode(code: string): Coupon | undefined {
    return this.state.coupons.find(c => c.code.toUpperCase() === code.toUpperCase() && c.isActive);
  }

  // Messages
  public getMessages(): ContactMessage[] {
    return [...this.state.messages].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public addMessage(data: Partial<ContactMessage>): ContactMessage {
    const newMsg: ContactMessage = {
      id: `msg-${Date.now()}`,
      name: data.name || '',
      email: data.email || '',
      phone: data.phone || '',
      subject: data.subject || 'General Inquiry',
      message: data.message || '',
      status: 'unread',
      createdAt: new Date().toISOString()
    };
    this.state.messages.unshift(newMsg);
    this.persist();
    return newMsg;
  }

  public updateMessageStatus(id: string, status: ContactMessage['status']): ContactMessage | undefined {
    const msg = this.state.messages.find(m => m.id === id);
    if (msg) {
      msg.status = status;
      this.persist();
      return msg;
    }
    return undefined;
  }
}

export const db = new DatabaseService();
