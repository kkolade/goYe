import { database } from '..';

export const withDatabase = (action) => {
  return async (...args) => {
    try {
      return await database.action(() => action(...args));
    } catch (error) {
      console.error('Database operation failed:', error);
      throw error;
    }
  };
};

export const createRecord = (collectionName, data) => {
  return withDatabase(async () => {
    const collection = database.collections.get(collectionName);
    return await collection.create(record => {
      Object.assign(record, data);
    });
  });
};

export const updateRecord = (collectionName, id, updates) => {
  return withDatabase(async () => {
    const collection = database.collections.get(collectionName);
    const record = await collection.find(id);
    return await record.update(updatedRecord => {
      Object.assign(updatedRecord, updates, {
        updated_at: new Date(),
      });
    });
  });
};

export const deleteRecord = (collectionName, id) => {
  return withDatabase(async () => {
    const collection = database.collections.get(collectionName);
    const record = await collection.find(id);
    return await record.markAsDeleted();
  });
};

export const findRecord = (collectionName, id) => {
  return withDatabase(async () => {
    const collection = database.collections.get(collectionName);
    return await collection.find(id);
  });
};

export const queryRecords = (collectionName, query) => {
  return withDatabase(async () => {
    const collection = database.collections.get(collectionName);
    return await collection.query(...query).fetch();
  });
};

export const observeRecords = (collectionName, query = []) => {
  const collection = database.collections.get(collectionName);
  return collection.query(...query).observe();
};
