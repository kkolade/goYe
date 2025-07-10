import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme, Avatar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const RecentActivityItem = ({ 
  id,
  title, 
  description,
  timestamp,
  type,
  user,
}) => {
  const theme = useTheme();
  
  const getIcon = () => {
    switch (type) {
      case 'contact':
        return 'account';
      case 'plan':
        return 'book-edit';
      case 'note':
        return 'note-edit';
      case 'prayer':
        return 'pray';
      default:
        return 'bell';
    }
  };
  
  const getIconColor = () => {
    switch (type) {
      case 'contact':
        return theme.colors.primary;
      case 'plan':
        return theme.colors.secondary;
      case 'note':
        return theme.colors.tertiary;
      case 'prayer':
        return theme.colors.error;
      default:
        return theme.colors.onSurfaceVariant;
    }
  };

  return (
    <View style={[styles.container, { borderBottomColor: theme.colors.outlineVariant }]}>
      <View style={styles.iconContainer}>
        <View 
          style={[
            styles.iconBackground, 
            { backgroundColor: `${getIconColor()}20` }
          ]}
        >
          <MaterialCommunityIcons 
            name={getIcon()} 
            size={20} 
            color={getIconColor()} 
          />
        </View>
      </View>
      
      <View style={styles.content}>
        <Text 
          variant="bodyMedium" 
          style={[styles.title, { color: theme.colors.onSurface }]}
          numberOfLines={1}
        >
          {title}
        </Text>
        <Text 
          variant="bodySmall" 
          style={[styles.description, { color: theme.colors.onSurfaceVariant }]}
          numberOfLines={2}
        >
          {description}
        </Text>
        <View style={styles.footer}>
          {user && (
            <View style={styles.userInfo}>
              <Avatar.Text 
                size={20} 
                label={user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                style={[styles.avatar, { backgroundColor: theme.colors.primary }]}
                labelStyle={{ color: 'white', fontSize: 10 }}
              />
              <Text 
                variant="labelSmall" 
                style={[styles.userName, { color: theme.colors.onSurfaceVariant }]}
                numberOfLines={1}
              >
                {user.name || 'User'}
              </Text>
            </View>
          )}
          <Text 
            variant="labelSmall" 
            style={[styles.timestamp, { color: theme.colors.onSurfaceVariant }]}
          >
            {timestamp}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  iconContainer: {
    marginRight: 16,
    justifyContent: 'center',
  },
  iconBackground: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  title: {
    fontWeight: '500',
    marginBottom: 2,
  },
  description: {
    opacity: 0.8,
    marginBottom: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '60%',
  },
  avatar: {
    marginRight: 6,
  },
  userName: {
    opacity: 0.8,
  },
  timestamp: {
    opacity: 0.6,
  },
});

export default RecentActivityItem;
