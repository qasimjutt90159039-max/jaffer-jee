import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import apiRouter from './server/routes/api';
import { siteConfig } from './src/config/siteConfig';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    store: siteConfig.businessName,
    category: siteConfig.category,
    contactNumber: siteConfig.contactNumber,
    address: siteConfig.address.fullAddress,
    timestamp: new Date().toISOString()
  });
});

// REST API Routes
app.use('/api', apiRouter);

// Vite middleware for dev / static for prod
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Jafferjees Multan Luxury Leather Goods Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
