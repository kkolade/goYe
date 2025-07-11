import { appSchema, tableSchema } from '@nozbe/watermelondb';

export const migrations = [
  // Initial schema version 1
  {
    toVersion: 1,
    steps: [
      // Users table
      createTable({
        name: 'users',
        columns: [
          { name: 'firebase_uid', type: 'string', isIndexed: true },
          { name: 'email', type: 'string', isIndexed: true },
          { name: 'display_name', type: 'string' },
          { name: 'photo_url', type: 'string', isOptional: true },
          { name: 'role', type: 'string' },
          { name: 'created_at', type: 'number' },
          { name: 'updated_at', type: 'number' },
          { name: 'last_synced_at', type: 'number', isOptional: true },
        ],
      }),
      
      // Disciples table
      createTable({
        name: 'disciples',
        columns: [
          { name: 'user_id', type: 'string', isIndexed: true },
          { name: 'name', type: 'string' },
          { name: 'phone', type: 'string', isOptional: true },
          { name: 'email', type: 'string', isOptional: true },
          { name: 'address', type: 'string', isOptional: true },
          { name: 'birth_date', type: 'number', isOptional: true },
          { name: 'notes', type: 'string', isOptional: true },
          { name: 'status', type: 'string' },
          { name: 'created_at', type: 'number' },
          { name: 'updated_at', type: 'number' },
          { name: 'last_synced_at', type: 'number', isOptional: true },
          { name: 'is_synced', type: 'boolean' },
        ],
      }),
      
      // Growth Plans table
      createTable({
        name: 'growth_plans',
        columns: [
          { name: 'disciple_id', type: 'string', isIndexed: true },
          { name: 'title', type: 'string' },
          { name: 'description', type: 'string', isOptional: true },
          { name: 'start_date', type: 'number' },
          { name: 'target_date', type: 'number', isOptional: true },
          { name: 'status', type: 'string' },
          { name: 'created_at', type: 'number' },
          { name: 'updated_at', type: 'number' },
          { name: 'last_synced_at', type: 'number', isOptional: true },
          { name: 'is_synced', type: 'boolean' },
        ],
      }),
      
      // Prayer Requests table
      createTable({
        name: 'prayer_requests',
        columns: [
          { name: 'user_id', type: 'string', isIndexed: true },
          { name: 'title', type: 'string' },
          { name: 'description', type: 'string' },
          { name: 'is_anonymous', type: 'boolean' },
          { name: 'status', type: 'string' },
          { name: 'created_at', type: 'number' },
          { name: 'updated_at', type: 'number' },
          { name: 'last_synced_at', type: 'number', isOptional: true },
          { name: 'is_synced', type: 'boolean' },
        ],
      }),
    ],
  },
  // Add future migrations here
];

// Helper function to create table schema for migrations
function createTable({ name, columns }) {
  return tableSchema({
    name,
    columns: columns.map(column => ({
      ...column,
      // Add default values for required fields
      isOptional: column.isOptional || false,
      isIndexed: column.isIndexed || false,
    })),
  });
}

export default migrations;
