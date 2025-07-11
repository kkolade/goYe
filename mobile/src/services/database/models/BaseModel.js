import { Model } from '@nozbe/watermelondb';
import { date } from '@nozbe/watermelondb/decorators';

export default class BaseModel extends Model {
  @date('created_at') createdAt;
  @date('updated_at') updatedAt;
  @date('last_synced_at') lastSyncedAt;

  // Helper method to prepare data for sync
  prepareForSync() {
    const raw = this._raw;
    return {
      ...this.constructor.serialize(raw),
      id: this.id,
      _status: raw._status,
      _changed: raw._changed,
    };
  }

  // Helper method to update timestamps
  async updateTimestamps() {
    const now = new Date();
    const updates = {
      updated_at: now,
    };
    
    if (!this.createdAt) {
      updates.created_at = now;
    }
    
    await this.update(record => {
      Object.assign(record, updates);
    });
    
    return this;
  }

  // Helper method to mark as synced
  async markAsSynced() {
    await this.update(record => {
      record.last_synced_at = new Date();
      record.is_synced = true;
    });
    return this;
  }
}
