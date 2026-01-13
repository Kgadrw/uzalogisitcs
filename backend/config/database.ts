import mongoose from 'mongoose';

// Database configuration
export const dbConfig = {
  uri: process.env.MONGODB_URI || 'mongodb+srv://kalisagad05_db_user:SKLX1W7tTh5BmK50@cluster0.anfwvi8.mongodb.net/uzalogistics?retryWrites=true&w=majority&appName=Cluster0',
  options: {
    retryWrites: true,
    w: 'majority',
  },
};

export async function connectDatabase() {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log('Database already connected');
      return;
    }

    await mongoose.connect(dbConfig.uri);
    console.log('✅ MongoDB connected successfully');
    console.log(`Database: ${mongoose.connection.name}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB disconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await disconnectDatabase();
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error);
    throw error;
  }
}

export async function disconnectDatabase() {
  try {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
      console.log('✅ MongoDB disconnected successfully');
    }
  } catch (error) {
    console.error('❌ Error disconnecting from MongoDB:', error);
    throw error;
  }
}

// Get connection status
export function getConnectionStatus() {
  return {
    readyState: mongoose.connection.readyState,
    isConnected: mongoose.connection.readyState === 1,
    host: mongoose.connection.host,
    name: mongoose.connection.name,
  };
}
