// Jafferjees - Sharif Complex Gulgasht- Multan Configuration & Business Details

export interface SiteConfig {
  businessName: string;
  shortName: string;
  tagline: string;
  category: string;
  contactNumber: string;
  phoneRaw: string;
  phoneFormatted: string;
  whatsappNumber: string;
  email: string;
  address: {
    line1: string;
    complex: string;
    area: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
    fullAddress: string;
    plusCode: string;
    googleMapsLink: string;
  };
  geo: {
    lat: number;
    lng: number;
  };
  hours: {
    weekdays: string;
    sunday: string;
  };
  currency: string;
  freeShippingThreshold: number; // in PKR
  shippingRates: {
    standard: number;
    expressMultan: number;
    storePickup: number;
  };
  announcementText: string;
  bankDetails: {
    bankName: string;
    accountTitle: string;
    accountNumber: string;
    iban: string;
    branch: string;
  };
  socialLinks: {
    facebook: string;
    instagram: string;
  };
  openingHours: {
    weekdays: string;
    sunday: string;
  };
}

export const siteConfig: SiteConfig = {
  businessName: 'Jafferjees - Sharif Complex Gulgasht- Multan',
  shortName: 'Jafferjees Multan',
  tagline: 'Handcrafted Leather Goods & Timeless Accessories',
  category: 'Leather Goods Store',
  contactNumber: '+92 66 16210415',
  phoneRaw: '6616210415',
  phoneFormatted: '+92 66 16210415',
  whatsappNumber: '926616210415',
  email: 'multan@jafferjees-store.pk',
  address: {
    line1: 'Shop # G 06-08, Sharif Complex',
    complex: 'Sharif Complex',
    area: 'Peer Khurshid Colony, Chah Usman Wala, Gulgasht',
    city: 'Multan',
    province: 'Punjab',
    postalCode: '60700',
    country: 'Pakistan',
    fullAddress: '6F8C+4WX, Sharif Complex, Shop # G 06-08, Peer Khurshid Colony Chah Usman Wala, Multan, 60700, Pakistan',
    plusCode: '6F8C+4WX Multan, Pakistan',
    googleMapsLink: 'https://maps.google.com/?q=6F8C%2B4WX+Sharif+Complex+Peer+Khurshid+Colony+Multan'
  },
  geo: {
    lat: 30.2227,
    lng: 71.4984
  },
  hours: {
    weekdays: '11:00 AM – 10:00 PM (Mon – Sat)',
    sunday: '02:00 PM – 10:00 PM (Sunday)'
  },
  currency: 'PKR',
  freeShippingThreshold: 5000,
  shippingRates: {
    standard: 250,
    expressMultan: 350,
    storePickup: 0
  },
  announcementText: '✨ Premium Handcrafted Leather Goods • Sharif Complex, Gulgasht Multan • Cash on Delivery & Nationwide Delivery Available',
  bankDetails: {
    bankName: 'Meezan Bank Limited',
    accountTitle: 'Jafferjees Multan Store',
    accountNumber: '0281-0109923812',
    iban: 'PK14MEZN0002810109923812',
    branch: 'Gulgasht Colony Branch, Multan'
  },
  socialLinks: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com'
  },
  openingHours: {
    weekdays: '11:00 AM – 10:00 PM (Mon – Sat)',
    sunday: '02:00 PM – 10:00 PM (Sunday)'
  }
};

export const getWhatsAppLink = (message?: string): string => {
  const cleanNumber = siteConfig.whatsappNumber.replace(/[^0-9]/g, '');
  const encoded = encodeURIComponent(
    message || 'Hello Jafferjees Sharif Complex Multan, I would like to inquire about your leather goods collection, bespoke gifting, and delivery in Multan.'
  );
  return `https://wa.me/${cleanNumber}?text=${encoded}`;
};

export const getWhatsAppUrl = getWhatsAppLink;

export const formatPKR = (amount: number): string => {
  return `Rs. ${Math.round(amount).toLocaleString('en-PK')}`;
};
