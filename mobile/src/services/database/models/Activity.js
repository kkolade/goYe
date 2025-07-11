import { field, date, relation } from '@nozbe/watermelondb/decorators';
import BaseModel from './BaseModel';

export default class Activity extends BaseModel {
  static table = 'activities';
  static associations = {
    growth_plans: { type: 'belongs_to', key: 'growth_plan_id' },
  };

  @field('growth_plan_id') growthPlanId;
  @field('title') title;
  @field('description') description;
  @field('type') type; // e.g., 'lesson', 'meeting', 'prayer', 'bible_study'
  @field('status') status; // 'pending', 'completed', 'skipped'
  @date('scheduled_date') scheduledDate;
  @field('is_synced') isSynced;
  @date('created_at') createdAt;
  @date('updated_at') updatedAt;
  @date('last_synced_at') lastSyncedAt;
  @field('notes') notes;

  // Relationships
  @relation('growth_plans', 'growth_plan_id') growthPlan;

  // Helper methods
  async updateActivity(updates) {
    return this.update(record => {
      Object.assign(record, updates, {
        updated_at: new Date(),
        is_synced: false,
      });
    });
  }

  // Mark as completed
  async markAsCompleted(notes = '') {
    return this.update(record => {
      record.status = 'completed';
      record.notes = notes;
      record.updated_at = new Date();
      record.is_synced = false;
    });
  }

  // Serialization for API
  toApi() {
    return {
      id: this.id,
      growth_plan_id: this.growthPlanId,
      title: this.title,
      description: this.description,
      type: this.type,
      status: this.status,
      scheduled_date: this.scheduledDate?.getTime(),
      notes: this.notes,
      created_at: this.createdAt?.getTime(),
      updated_at: this.updatedAt?.getTime(),
    };
  }

  // Create from API response
  static fromApi(apiData) {
    return {
      growth_plan_id: apiData.growth_plan_id,
      title: apiData.title,
      description: apiData.description || null,
      type: apiData.type || 'lesson',
      status: apiData.status || 'pending',
      scheduled_date: apiData.scheduled_date ? new Date(apiData.scheduled_date) : new Date(),
      notes: apiData.notes || null,
      created_at: apiData.created_at ? new Date(apiData.created_at) : new Date(),
      updated_at: apiData.updated_at ? new Date(apiData.updated_at) : new Date(),
      last_synced_at: new Date(),
      is_synced: true,
    };
  }
}
