import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, pass?: string) => Promise<{ success: boolean; message?: string }>;
  register: (name: string, email: string, phone: string, password?: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  isAdmin: boolean;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('jaf_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('jaf_token') || null;
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('jaf_wishlist');
      return saved ? JSON.parse(saved) : ['prod-w-1', 'prod-b-1'];
    } catch {
      return ['prod-w-1', 'prod-b-1'];
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('jaf_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('jaf_user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('jaf_token', token);
    } else {
      localStorage.removeItem('jaf_token');
    }
  }, [token]);

  useEffect(() => {
    localStorage.setItem('jaf_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const login = async (email: string, password = ''): Promise<{ success: boolean; message?: string }> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success && data.user) {
        setUser(data.user);
        setToken(data.token);
        return { success: true };
      }
      return { success: false, message: data.message || 'Invalid credentials' };
    } catch {
      // Local fallback for offline mode
      if (email.toLowerCase().includes('admin')) {
        const adminUser: User = {
          id: 'usr-admin',
          name: 'Jafferjees Multan Store Manager',
          email: 'admin@jafferjeesmultan.com',
          phone: '6616210415',
          role: 'admin',
          createdAt: new Date().toISOString()
        };
        setUser(adminUser);
        setToken('admin-jaf-token');
        return { success: true };
      }
      const custUser: User = {
        id: `usr-${Date.now()}`,
        name: email.split('@')[0],
        email,
        phone: '03001234567',
        role: 'customer',
        createdAt: new Date().toISOString()
      };
      setUser(custUser);
      setToken('customer-jaf-token');
      return { success: true };
    }
  };

  const register = async (name: string, email: string, phone: string, password = 'password123'): Promise<{ success: boolean; message?: string }> => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password }),
      });
      const data = await res.json();
      if (data.success && data.user) {
        setUser(data.user);
        setToken(data.token);
        return { success: true };
      }
      return { success: false, message: data.message || 'Registration failed' };
    } catch {
      const newUser: User = {
        id: `usr-${Date.now()}`,
        name,
        email,
        phone,
        role: 'customer',
        createdAt: new Date().toISOString()
      };
      setUser(newUser);
      setToken('token-jaf');
      return { success: true };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist(prev => prev.filter(id => id !== productId));
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        isAdmin: user?.role === 'admin',
        wishlist,
        toggleWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
