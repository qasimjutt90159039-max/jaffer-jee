import { Router, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { db } from '../db';
import { siteConfig } from '../../src/config/siteConfig';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'jafferjees-multan-secret-key-2026';

// Auth Middleware
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Invalid or expired session' });
    }
    (req as any).user = user;
    next();
  });
};

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  authenticateToken(req, res, () => {
    const user = (req as any).user;
    if (user && user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ success: false, message: 'Admin privileges required' });
    }
  });
};

// ==========================================
// STORE CONFIG & INFO
// ==========================================
router.get('/store-info', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: siteConfig
  });
});

// ==========================================
// AUTHENTICATION
// ==========================================
router.post('/auth/register', (req: Request, res: Response) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
    }

    const existing = db.getUserByEmail(email);
    if (existing) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists' });
    }

    const newUser = db.createUser({
      name,
      email,
      password,
      phone: phone || '',
      role: 'customer'
    });

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role, name: newUser.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const { password: _, ...userSafe } = newUser;
    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token,
      user: userSafe
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Registration failed' });
  }
});

router.post('/auth/login', (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const user = db.getUserByEmail(email);
    if (!user || !user.password) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const { password: _, ...userSafe } = user;
    res.json({
      success: true,
      message: 'Logged in successfully',
      token,
      user: userSafe
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Login failed' });
  }
});

router.get('/auth/me', authenticateToken, (req: Request, res: Response) => {
  try {
    const tokenUser = (req as any).user;
    const user = db.getUserById(tokenUser.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    const { password: _, ...userSafe } = user;
    res.json({ success: true, user: userSafe });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==========================================
// CATEGORIES
// ==========================================
router.get('/categories', (req: Request, res: Response) => {
  const categories = db.getCategories();
  res.json({ success: true, count: categories.length, data: categories });
});

// ==========================================
// PRODUCTS
// ==========================================
router.get('/products', (req: Request, res: Response) => {
  try {
    let products = db.getProducts();
    const { category, search, minPrice, maxPrice, inStock, sort, isFeatured, isNewArrival, isBestSeller, limit } = req.query;

    if (category) {
      const catSlug = String(category).toLowerCase();
      products = products.filter(p => p.categorySlug.toLowerCase() === catSlug || p.category.toLowerCase() === catSlug);
    }

    if (search) {
      const q = String(search).toLowerCase();
      products = products.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    if (minPrice) {
      products = products.filter(p => p.price >= Number(minPrice));
    }

    if (maxPrice) {
      products = products.filter(p => p.price <= Number(maxPrice));
    }

    if (inStock === 'true') {
      products = products.filter(p => p.inStock && p.stockQuantity > 0);
    }

    if (isFeatured === 'true') {
      products = products.filter(p => p.isFeatured);
    }

    if (isNewArrival === 'true') {
      products = products.filter(p => p.isNewArrival);
    }

    if (isBestSeller === 'true') {
      products = products.filter(p => p.isBestSeller);
    }

    // Sorting
    if (sort === 'price-low') {
      products.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
      products.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      products.sort((a, b) => b.rating - a.rating);
    } else if (sort === 'newest') {
      products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    if (limit) {
      products = products.slice(0, Number(limit));
    }

    res.json({
      success: true,
      total: products.length,
      data: products
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/products/:idOrSlug', (req: Request, res: Response) => {
  const { idOrSlug } = req.params;
  const product = db.getProductById(idOrSlug);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  res.json({ success: true, data: product });
});

// Admin product creation
router.post('/products', requireAdmin, (req: Request, res: Response) => {
  try {
    const productData = req.body;
    if (!productData.title || !productData.price || !productData.category) {
      return res.status(400).json({ success: false, message: 'Title, price, and category are required' });
    }

    const slug = productData.slug || productData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const id = productData.id || `prod-${Date.now()}`;
    const sku = productData.sku || `JAF-${Math.floor(100 + Math.random() * 900)}`;

    const saved = db.saveProduct({
      ...productData,
      id,
      slug,
      sku,
      createdAt: new Date().toISOString()
    });

    res.status(201).json({ success: true, message: 'Product saved successfully', data: saved });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Admin product update
router.put('/products/:id', requireAdmin, (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const existing = db.getProductById(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const updated = db.saveProduct({
      ...existing,
      ...req.body,
      id: existing.id
    });

    res.json({ success: true, message: 'Product updated successfully', data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Admin product deletion
router.delete('/products/:id', requireAdmin, (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const success = db.deleteProduct(id);
    if (!success) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==========================================
// COUPONS
// ==========================================
router.post('/coupons/validate', (req: Request, res: Response) => {
  try {
    const { code, cartTotal } = req.body;
    if (!code) {
      return res.status(400).json({ success: false, message: 'Coupon code is required' });
    }

    const coupon = db.getCouponByCode(code);
    if (!coupon) {
      return res.status(404).json({ success: false, message: 'Invalid or expired coupon code' });
    }

    if (cartTotal && cartTotal < coupon.minOrderAmount) {
      return res.status(400).json({
        success: false,
        message: `This coupon requires a minimum order amount of Rs. ${coupon.minOrderAmount.toLocaleString()}`
      });
    }

    let discount = 0;
    if (coupon.discountType === 'percentage') {
      discount = Math.round((cartTotal * coupon.discountValue) / 100);
    } else {
      discount = coupon.discountValue;
    }

    res.json({
      success: true,
      data: {
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        discountAmount: discount,
        description: coupon.description
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==========================================
// ORDERS
// ==========================================
router.post('/orders', (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    if (!orderData.items || orderData.items.length === 0) {
      return res.status(400).json({ success: false, message: 'Order must include at least one item' });
    }
    if (!orderData.customer || !orderData.customer.fullName || !orderData.customer.phone || !orderData.customer.address) {
      return res.status(400).json({ success: false, message: 'Customer name, phone, and delivery address are required' });
    }

    const createdOrder = db.createOrder(orderData);
    res.status(201).json({
      success: true,
      message: 'Order placed successfully! We will confirm by phone or SMS shortly.',
      data: createdOrder
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/orders', (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    let orders = db.getOrders();

    if (email) {
      orders = orders.filter(o => o.customer.email.toLowerCase() === String(email).toLowerCase());
    }

    res.json({ success: true, count: orders.length, data: orders });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/orders/:idOrNumber', (req: Request, res: Response) => {
  const { idOrNumber } = req.params;
  const order = db.getOrderById(idOrNumber);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }
  res.json({ success: true, data: order });
});

router.patch('/orders/:id/status', requireAdmin, (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, trackingNumber } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required' });
    }

    const updated = db.updateOrderStatus(id, status, trackingNumber);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({ success: true, message: 'Order status updated', data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==========================================
// REVIEWS
// ==========================================
router.get('/reviews', (req: Request, res: Response) => {
  const { productId } = req.query;
  const reviews = db.getReviews(productId ? String(productId) : undefined);
  res.json({ success: true, count: reviews.length, data: reviews });
});

router.post('/reviews', (req: Request, res: Response) => {
  try {
    const { productId, author, rating, comment, city } = req.body;
    if (!productId || !author || !rating || !comment) {
      return res.status(400).json({ success: false, message: 'Missing required review fields' });
    }

    const product = db.getProductById(productId);
    const newReview = db.addReview({
      productId,
      productTitle: product ? product.title : 'Leather Good',
      author,
      city: city || 'Multan',
      rating: Number(rating),
      comment
    });

    res.status(201).json({ success: true, message: 'Review submitted successfully', data: newReview });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==========================================
// CONTACT & INQUIRIES
// ==========================================
router.post('/contact', (req: Request, res: Response) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required' });
    }

    const newMsg = db.addMessage({ name, email, phone, subject, message });
    res.status(201).json({
      success: true,
      message: 'Inquiry received. The Jafferjees Multan team will contact you shortly.',
      data: newMsg
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/admin/messages', requireAdmin, (req: Request, res: Response) => {
  const messages = db.getMessages();
  res.json({ success: true, count: messages.length, data: messages });
});

router.patch('/admin/messages/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const updated = db.updateMessageStatus(id, status);
  if (!updated) {
    return res.status(404).json({ success: false, message: 'Message not found' });
  }
  res.json({ success: true, data: updated });
});

// ==========================================
// ADMIN DASHBOARD STATS
// ==========================================
router.get('/admin/stats', requireAdmin, (req: Request, res: Response) => {
  try {
    const products = db.getProducts();
    const orders = db.getOrders();
    const messages = db.getMessages();
    const users = db.getUsers();

    const totalRevenue = orders
      .filter(o => o.status !== 'Cancelled')
      .reduce((sum, o) => sum + o.grandTotal, 0);

    const pendingOrders = orders.filter(o => o.status === 'Pending').length;
    const lowStockProducts = products.filter(p => p.stockQuantity < 5);
    const unreadMessages = messages.filter(m => m.status === 'unread').length;

    res.json({
      success: true,
      data: {
        totalRevenue,
        totalOrders: orders.length,
        pendingOrders,
        totalProducts: products.length,
        lowStockCount: lowStockProducts.length,
        unreadMessages,
        totalCustomers: users.filter(u => u.role === 'customer').length,
        recentOrders: orders.slice(0, 5),
        lowStockProducts: lowStockProducts.slice(0, 5)
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
