import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { List, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ContactItem = ({ 
  name, 
  status, 
  lastContact, 
  onPress,
  onLongPress
}) => {
  const theme = useTheme();
  
  const getStatusIcon = () => {
    switch(status.toLowerCase()) {
      case 'disciple':
        return 'account-heart';
      case 'mentor':
        return 'account-star';
      case 'seeker':
        return 'account-question';
      default:
        return 'account';
    }
  };

  return (
    <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
      <List.Item
        title={name}
        description={`${status} • ${lastContact}`}
        left={props => (
          <List.Icon 
            {...props} 
            icon={getStatusIcon()}
            color={theme.colors.primary}
          />
        )}
        right={props => (
          <List.Icon 
            {...props} 
            icon="chevron-right"
            color={theme.colors.onSurfaceVariant}
          />
        )}
        style={[styles.container, { backgroundColor: theme.colors.surface }]}
        titleStyle={{ color: theme.colors.onSurface }}
        descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    borderRadius: 8,
    elevation: 1,
  },
});

export default ContactItem;
