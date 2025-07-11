import { field, date, readonly } from '@nozbe/watermelondb/decorators';
import BaseModel from './BaseModel';

export default class User extends BaseModel {
  static table = 'users';
  static associations = {
    disciples: { type: 'has_many', foreignKey: 'user_id' },
    prayer_requests: { type: 'has_many', foreignKey: 'user_id' },
  };

  @field('firebase_uid') firebaseUid;
  @field('email') email;
  @field('display_name') displayName;
  @field('photo_url') photoUrl;
  @field('role') role;
  @date('created_at') createdAt;
  @date('updated_at') updatedAt;
  @date('last_synced_at') lastSyncedAt;

  // Relationships
  @children('disciples') disciples;
  @children('prayer_requests') prayerRequests;

  // Helper methods
  async addDisciple(discipleData) {
    return this.collections.get('disciples').create(disciple => {
      Object.assign(disciple, discipleData, {
        user_id: this.id,
      });
    });
  }

  async addPrayerRequest(prayerRequestData) {
    return this.collections.get('prayer_requests').create(prayerRequest => {
      Object.assign(prayerRequest, prayerRequestData, {
        user_id: this.id,
      });
    });
  }

  // Serialization for API
  toApi() {
    return {
      id: this.id,
      firebase_uid: this.firebaseUid,
      email: this.email,
      display_name: this.displayName,
      photo_url: this.photoUrl,
      role: this.role,
      created_at: this.createdAt?.getTime(),
      updated_at: this.updatedAt?.getTime(),
    };
  }

  // Create from API response
  static fromApi(apiData) {
    return {
      firebase_uid: apiData.uid || apiData.firebase_uid,
      email: apiData.email,
      display_name: apiData.displayName || apiData.display_name,
      photo_url: apiData.photoURL || apiData.photo_url,
      role: apiData.role || 'user',
      created_at: apiData.created_at ? new Date(apiData.created_at) : new Date(),
      updated_at: apiData.updated_at ? new Date(apiData.updated_at) : new Date(),
      last_synced_at: new Date(),
    };
  }
}
