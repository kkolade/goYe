import { appSchema, tableSchema } from '@nozbe/watermelondb';

export const schemas = appSchema({
  version: 1,
  tables: [
    // User schema
    tableSchema({
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
    
    // Disciples schema
    tableSchema({
      name: 'disciples',
      columns: [
        { name: 'user_id', type: 'string', isIndexed: true },
        { name: 'name', type: 'string' },
        { name: 'phone', type: 'string', isOptional: true },
        { name: 'email', type: 'string', isOptional: true },
        { name: 'address', type: 'string', isOptional: true },
        { name: 'birth_date', type: 'number', isOptional: true },
        { name: 'notes', type: 'string', isOptional: true },
        { name: 'status', type: 'string' }, // active, inactive, follow_up
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
        { name: 'last_synced_at', type: 'number', isOptional: true },
        { name: 'is_synced', type: 'boolean' },
      ],
    }),
    
    // Growth Plans schema
    tableSchema({
      name: 'growth_plans',
      columns: [
        { name: 'disciple_id', type: 'string', isIndexed: true },
        { name: 'title', type: 'string' },
        { name: 'description', type: 'string', isOptional: true },
        { name: 'start_date', type: 'number' },
        { name: 'target_date', type: 'number', isOptional: true },
        { name: 'status', type: 'string' }, // not_started, in_progress, completed
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
        { name: 'last_synced_at', type: 'number', isOptional: true },
        { name: 'is_synced', type: 'boolean' },
      ],
    }),
    
    // Prayer Requests schema
    tableSchema({
      name: 'prayer_requests',
      columns: [
        { name: 'user_id', type: 'string', isIndexed: true },
        { name: 'title', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'is_anonymous', type: 'boolean' },
        { name: 'status', type: 'string' }, // active, answered, archived
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
        { name: 'last_synced_at', type: 'number', isOptional: true },
        { name: 'is_synced', type: 'boolean' },
      ],
    }),
  ],
});

export default schemas;
