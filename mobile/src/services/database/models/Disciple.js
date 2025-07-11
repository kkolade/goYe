import { field, date, relation, readonly, children } from '@nozbe/watermelondb/decorators';
import BaseModel from './BaseModel';

export default class Disciple extends BaseModel {
  static table = 'disciples';
  static associations = {
    users: { type: 'belongs_to', key: 'user_id' },
    growth_plans: { type: 'has_many', foreignKey: 'disciple_id' },
  };

  @field('user_id') userId;
  @field('name') name;
  @field('phone') phone;
  @field('email') email;
  @field('address') address;
  @field('birth_date') birthDate;
  @field('notes') notes;
  @field('status') status;
  @field('is_synced') isSynced;
  @date('created_at') createdAt;
  @date('updated_at') updatedAt;
  @date('last_synced_at') lastSyncedAt;

  // Relationships
  @relation('users', 'user_id') user;
  @children('growth_plans') growthPlans;

  // Helper methods
  async updateDisciple(updates) {
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
      name: this.name,
      phone: this.phone,
      email: this.email,
      address: this.address,
      birth_date: this.birthDate?.getTime(),
      notes: this.notes,
      status: this.status,
      created_at: this.createdAt?.getTime(),
      updated_at: this.updatedAt?.getTime(),
    };
  }

  // Create from API response
  static fromApi(apiData) {
    return {
      user_id: apiData.user_id,
      name: apiData.name,
      phone: apiData.phone || null,
      email: apiData.email || null,
      address: apiData.address || null,
      birth_date: apiData.birth_date ? new Date(apiData.birth_date) : null,
      notes: apiData.notes || null,
      status: apiData.status || 'active',
      created_at: apiData.created_at ? new Date(apiData.created_at) : new Date(),
      updated_at: apiData.updated_at ? new Date(apiData.updated_at) : new Date(),
      last_synced_at: new Date(),
      is_synced: true,
    };
  }
}
