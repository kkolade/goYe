import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FAB, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import ContactsList from '../components/contacts/ContactsList';
import useContacts from '../hooks/useContacts';

const ContactsScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  
  const {
    contacts,
    isLoading,
    error,
    refreshing,
    searchQuery,
    setSearchQuery,
    onRefresh,
  } = useContacts();

  const handleContactPress = (contact) => {
    navigation.navigate('ContactDetail', { contactId: contact.id });
  };

  const handleContactLongPress = (contact) => {
    // Show options menu or action sheet
    console.log('Long pressed:', contact.name);
  };

  const handleAddContact = () => {
    navigation.navigate('AddContact');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ContactsList
        contacts={contacts}
        isLoading={isLoading}
        error={error}
        refreshing={refreshing}
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
        onRefresh={onRefresh}
        onContactPress={handleContactPress}
        onContactLongPress={handleContactLongPress}
      />

      <FAB
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        icon="plus"
        onPress={handleAddContact}
        color="white"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default ContactsScreen;
