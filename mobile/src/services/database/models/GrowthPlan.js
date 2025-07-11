import { field, date, relation, children } from '@nozbe/watermelondb/decorators';
import BaseModel from './BaseModel';

export default class GrowthPlan extends BaseModel {
  static table = 'growth_plans';
  static associations = {
    disciples: { type: 'belongs_to', key: 'disciple_id' },
    activities: { type: 'has_many', foreignKey: 'growth_plan_id' },
  };

  @field('disciple_id') discipleId;
  @field('title') title;
  @field('description') description;
  @date('start_date') startDate;
  @date('target_date') targetDate;
  @field('status') status;
  @field('is_synced') isSynced;
  @date('created_at') createdAt;
  @date('updated_at') updatedAt;
  @date('last_synced_at') lastSyncedAt;

  // Relationships
  @relation('disciples', 'disciple_id') disciple;
  @children('activities') activities;

  // Helper methods
  async updatePlan(updates) {
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
      disciple_id: this.discipleId,
      title: this.title,
      description: this.description,
      start_date: this.startDate?.getTime(),
      target_date: this.targetDate?.getTime(),
      status: this.status,
      created_at: this.createdAt?.getTime(),
      updated_at: this.updatedAt?.getTime(),
    };
  }

  // Create from API response
  static fromApi(apiData) {
    return {
      disciple_id: apiData.disciple_id,
      title: apiData.title,
      description: apiData.description || null,
      start_date: apiData.start_date ? new Date(apiData.start_date) : new Date(),
      target_date: apiData.target_date ? new Date(apiData.target_date) : null,
      status: apiData.status || 'not_started',
      created_at: apiData.created_at ? new Date(apiData.created_at) : new Date(),
      updated_at: apiData.updated_at ? new Date(apiData.updated_at) : new Date(),
      last_synced_at: new Date(),
      is_synced: true,
    };
  }
}
