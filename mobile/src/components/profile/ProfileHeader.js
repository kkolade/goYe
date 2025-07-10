import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Text, useTheme, Button } from 'react-native-paper';

const ProfileHeader = ({ user, onEditPress, theme }) => {
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
      <View style={styles.content}>
        <View style={styles.avatarContainer}>
          <TouchableOpacity onPress={onEditPress}>
            <Avatar.Image 
              size={100} 
              source={{ uri: user.avatar || 'https://via.placeholder.com/100' }} 
              style={styles.avatar}
            />
            <View style={[styles.editBadge, { backgroundColor: theme.colors.secondary }]}>
              <Text style={styles.editIcon}>✏️</Text>
            </View>
          </TouchableOpacity>
        </View>
        
        <View style={styles.userInfo}>
          <Text variant="headlineSmall" style={[styles.name, { color: theme.colors.onPrimary }]}>
            {user.name || 'User Name'}
          </Text>
          <Text variant="bodyMedium" style={[styles.email, { color: theme.colors.onPrimary }]}>
            {user.email || 'user@example.com'}
          </Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text variant="titleLarge" style={[styles.statValue, { color: theme.colors.onPrimary }]}>
                {user.stats?.contacts || '0'}
              </Text>
              <Text variant="bodySmall" style={[styles.statLabel, { color: theme.colors.onPrimary }]}>
                Contacts
              </Text>
            </View>
            
            <View style={[styles.statDivider, { backgroundColor: theme.colors.onPrimary }]} />
            
            <View style={styles.statItem}>
              <Text variant="titleLarge" style={[styles.statValue, { color: theme.colors.onPrimary }]}>
                {user.stats?.plans || '0'}
              </Text>
              <Text variant="bodySmall" style={[styles.statLabel, { color: theme.colors.onPrimary }]}>
                Plans
              </Text>
            </View>
            
            <View style={[styles.statDivider, { backgroundColor: theme.colors.onPrimary }]} />
            
            <View style={styles.statItem}>
              <Text variant="titleLarge" style={[styles.statValue, { color: theme.colors.onPrimary }]}>
                {user.stats?.teams || '0'}
              </Text>
              <Text variant="bodySmall" style={[styles.statLabel, { color: theme.colors.onPrimary }]}>
                Teams
              </Text>
            </View>
          </View>
          
          <Button 
            mode="contained" 
            onPress={onEditPress}
            style={[styles.editButton, { backgroundColor: theme.colors.secondary }]}
            labelStyle={{ color: theme.colors.onSecondary }}
            icon="pencil"
          >
            Edit Profile
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 16,
    elevation: 4,
  },
  content: {
    paddingTop: 60,
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    borderWidth: 3,
    borderColor: 'white',
    elevation: 4,
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  editIcon: {
    fontSize: 16,
  },
  userInfo: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  email: {
    opacity: 0.9,
    marginBottom: 16,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  statLabel: {
    opacity: 0.9,
    fontSize: 12,
  },
  statDivider: {
    width: 1,
    height: 40,
    opacity: 0.3,
  },
  editButton: {
    borderRadius: 20,
    marginTop: 8,
    elevation: 2,
  },
});

export default ProfileHeader;
