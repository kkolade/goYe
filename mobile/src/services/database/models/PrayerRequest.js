import { field, date, relation } from '@nozbe/watermelondb/decorators';
import BaseModel from './BaseModel';

export default class PrayerRequest extends BaseModel {
  static table = 'prayer_requests';
  static associations = {
    users: { type: 'belongs_to', key: 'user_id' },
  };

  @field('user_id') userId;
  @field('title') title;
  @field('description') description;
  @field('is_anonymous') isAnonymous;
  @field('status') status;
  @field('is_synced') isSynced;
  @date('created_at') createdAt;
  @date('updated_at') updatedAt;
  @date('last_synced_at') lastSyncedAt;

  // Relationships
  @relation('users', 'user_id') user;

  // Helper methods
  async updateRequest(updates) {
    return this.update(record => {
      Object.assign(record, updates, {
        updated_at: new Date(),
        is_synced: false,
      });
    });
  }

  // Serialization for API
  toApi() {
    return {
      id: this.id,
      user_id: this.userId,
      title: this.title,
      description: this.description,
      is_anonymous: this.isAnonymous,
      status: this.status,
      created_at: this.createdAt?.getTime(),
      updated_at: this.updatedAt?.getTime(),
    };
  }

  // Create from API response
  static fromApi(apiData) {
    return {
      user_id: apiData.user_id,
      title: apiData.title,
      description: apiData.description,
      is_anonymous: !!apiData.is_anonymous,
      status: apiData.status || 'active',
      created_at: apiData.created_at ? new Date(apiData.created_at) : new Date(),
      updated_at: apiData.updated_at ? new Date(apiData.updated_at) : new Date(),
      last_synced_at: new Date(),
      is_synced: true,
    };
  }
}
