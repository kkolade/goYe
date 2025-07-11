import { NetInfo } from 'react-native';
import database from '../database';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

class SyncService {
  constructor() {
    this.isOnline = false;
    this.syncInProgress = false;
    this.setupNetworkListener();
  }

  setupNetworkListener() {
    NetInfo.addEventListener(state => {
      this.isOnline = state.isConnected;
      if (this.isOnline) {
        this.syncAll();
      }
    });
  }

  async syncAll() {
    if (this.syncInProgress || !this.isOnline) return;
    
    this.syncInProgress = true;
    try {
      const user = auth().currentUser;
      if (!user) return;

      // Sync users
      await this.syncCollection('users');
      
      // Sync disciples
      await this.syncCollection('disciples');
      
      // Sync growth plans
      await this.syncCollection('growth_plans');
      
      // Sync prayer requests
      await this.syncCollection('prayer_requests');
      
      console.log('Sync completed successfully');
    } catch (error) {
      console.error('Sync error:', error);
    } finally {
      this.syncInProgress = false;
    }
  }

  async syncCollection(collectionName) {
    // Get local changes
    const localChanges = await this.getLocalChanges(collectionName);
    
    // Push changes to Firebase
    await this.pushChanges(collectionName, localChanges);
    
    // Pull latest from Firebase
    await this.pullChanges(collectionName);
  }

  async getLocalChanges(collectionName) {
    const collection = database.collections.get(collectionName);
    const unsynced = await collection.query(
      Q.where('is_synced', false)
    ).fetch();
    
    return unsynced.map(record => ({
      id: record.id,
      ...record.prepareForSync(),
    }));
  }

  async pushChanges(collectionName, changes) {
    if (!changes.length) return;
    
    const batch = firestore().batch();
    const collectionRef = firestore().collection(collectionName);
    
    for (const change of changes) {
      const { id, ...data } = change;
      const docRef = id ? collectionRef.doc(id) : collectionRef.doc();
      
      batch.set(docRef, {
        ...data,
        updated_at: firestore.FieldValue.serverTimestamp(),
      }, { merge: true });
    }
    
    await batch.commit();
    
    // Mark records as synced
    const collection = database.collections.get(collectionName);
    await database.action(async () => {
      for (const change of changes) {
        if (!change.id) continue;
        const record = await collection.find(change.id);
        await record.markAsSynced();
      }
    });
  }

  async pullChanges(collectionName) {
    const lastSync = await this.getLastSyncTime(collectionName);
    const query = firestore()
      .collection(collectionName)
      .where('updated_at', '>', lastSync)
      .orderBy('updated_at');
    
    const snapshot = await query.get();
    if (snapshot.empty) return;
    
    const collection = database.collections.get(collectionName);
    await database.action(async () => {
      for (const doc of snapshot.docs) {
        const data = { id: doc.id, ...doc.data() };
        await collection.upsert(data);
      }
    });
    
    await this.setLastSyncTime(collectionName, new Date());
  }

  async getLastSyncTime(collectionName) {
    // Implement storage for last sync time (e.g., using AsyncStorage)
    // This is a simplified version
    return new Date(0);
  }

  async setLastSyncTime(collectionName, time) {
    // Implement storage for last sync time (e.g., using AsyncStorage)
    // This is a simplified version
  }
}

export default new SyncService();
