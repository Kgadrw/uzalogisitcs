// Main server file - Express.js server setup with MongoDB
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { appConfig } from './config/app';
import { connectDatabase, disconnectDatabase } from './config/database';
import routes from './routes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { AuthService } from './services/authService';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: appConfig.corsOrigin }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    database: 'connected' // You can check actual connection status here
  });
});

// Routes
app.use('/api', routes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
async function startServer() {
  try {
    // Connect to MongoDB
    await connectDatabase();
    
    // Initialize default admin account
    await AuthService.initializeDefaultAdmin();
    
    // Start Express server
    app.listen(appConfig.port, () => {
      console.log(`🚀 Server running on port ${appConfig.port}`);
      console.log(`📡 Environment: ${appConfig.env}`);
      console.log(`🌐 CORS enabled for: ${appConfig.corsOrigin}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server');
  await disconnectDatabase();
  process.exit(0);
});

startServer();
