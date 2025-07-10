import { useState, useEffect, useCallback } from 'react';

// Mock data - Replace with actual API calls
export const MOCK_CONTACTS = [
  { id: '1', name: 'John Doe', status: 'Disciple', lastContact: '2 days ago' },
  { id: '2', name: 'Jane Smith', status: 'Seeker', lastContact: '1 week ago' },
  { id: '3', name: 'Mike Johnson', status: 'Mentor', lastContact: '3 days ago' },
  { id: '4', name: 'Sarah Williams', status: 'Disciple', lastContact: '1 day ago' },
];

const useContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Load contacts
  const loadContacts = useCallback(async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setContacts(MOCK_CONTACTS);
      setFilteredContacts(MOCK_CONTACTS);
      setError(null);
    } catch (err) {
      setError('Failed to load contacts. Please try again.');
      console.error('Error loading contacts:', err);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  // Filter contacts when search query changes
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredContacts(contacts);
      return;
    }

    const filtered = contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.status.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredContacts(filtered);
  }, [searchQuery, contacts]);

  // Handle refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadContacts();
  }, [loadContacts]);

  // Add a new contact
  const addContact = useCallback(async (newContact) => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const updatedContacts = [{ ...newContact, id: Date.now().toString() }, ...contacts];
      setContacts(updatedContacts);
      return { success: true };
    } catch (err) {
      console.error('Error adding contact:', err);
      return { success: false, error: 'Failed to add contact' };
    } finally {
      setIsLoading(false);
    }
  }, [contacts]);

  // Delete a contact
  const deleteContact = useCallback(async (contactId) => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const updatedContacts = contacts.filter(contact => contact.id !== contactId);
      setContacts(updatedContacts);
      return { success: true };
    } catch (err) {
      console.error('Error deleting contact:', err);
      return { success: false, error: 'Failed to delete contact' };
    } finally {
      setIsLoading(false);
    }
  }, [contacts]);

  return {
    contacts: filteredContacts,
    isLoading,
    error,
    refreshing,
    searchQuery,
    setSearchQuery,
    onRefresh,
    addContact,
    deleteContact,
  };
};

export default useContacts;
