import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { migrations } from './migrations';
import { schemas } from './schemas';

// Create the SQLite adapter
export const adapter = new SQLiteAdapter({
  schema: schemas,
  migrations,
  jsi: true, // Enable JSI for better performance
  onSetUpError: error => {
    console.error('Database setup error:', error);
  },
});

// Create the database instance
export const database = new Database({
  adapter,
  modelClasses: [
    // Models will be added here
  ],
  actionsEnabled: true,
});

// Export the database instance as default
export default database;
