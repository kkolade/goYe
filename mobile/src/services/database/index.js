import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { Platform } from 'react-native';
import { schemas } from './schemas';
import { migrations } from './migrations';
import User from './models/User';

// Initialize the database adapter
const adapter = new SQLiteAdapter({
  schema: schemas,
  migrations,
  jsi: Platform.OS === 'ios', // Enable JSI for better performance on iOS
  onSetUpError: error => {
    console.error('Database setup error:', error);
  },
});

// Initialize the database
export const database = new Database({
  adapter,
  modelClasses: [
    User,
    // Add other models here
  ],
  actionsEnabled: true,
});

// Export collections for easier access
export const collections = {
  users: database.collections.get('users'),
  // Add other collections here
};

// Export the database instance as default
export default database;
