import React from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, useTheme, Button, Divider, Card, IconButton, Portal, Dialog, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileMenuItem from '../components/profile/ProfileMenuItem';
import useProfile from '../hooks/useProfile';

const ProfileScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  
  const {
    user,
    formData,
    isEditing,
    isLoading,
    handleEditProfile,
    handleSaveProfile,
    handleSignOut,
    handleToggleTheme,
    handleToggleNotifications,
    handleChangePassword,
    handleHelp,
    handleAbout,
    setFormData,
  } = useProfile();

  const [editField, setEditField] = React.useState(null);
  const [editValue, setEditValue] = React.useState('');

  const handleEditField = (field) => {
    setEditField(field);
    setEditValue(formData[field] || '');
  };

  const handleSaveField = () => {
    if (editField) {
      handleSaveProfile({ [editField]: editValue });
      setEditField(null);
    }
  };

  const confirmSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: handleSignOut,
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView>
        <ProfileHeader 
          user={user} 
          onEditPress={handleEditProfile}
          theme={theme}
        />

        {/* Personal Information */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.primary }]}>
              Personal Information
            </Text>
            
            <ProfileMenuItem
              icon="account"
              title="Name"
              description={user.name}
              onPress={() => handleEditField('name')}
              theme={theme}
            />
            
            <ProfileMenuItem
              icon="email"
              title="Email"
              description={user.email}
              onPress={() => handleEditField('email')}
              theme={theme}
            />
            
            <ProfileMenuItem
              icon="phone"
              title="Phone"
              description={user.phone}
              onPress={() => handleEditField('phone')}
              theme={theme}
            />
            
            <ProfileMenuItem
              icon="office-building"
              title="Organization"
              description={user.organization}
              onPress={() => handleEditField('organization')}
              showDivider={false}
              theme={theme}
            />
          </Card.Content>
        </Card>

        {/* Preferences */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.primary }]}>
              Preferences
            </Text>
            
            <ProfileMenuItem
              icon="theme-light-dark"
              title="Dark Mode"
              onPress={handleToggleTheme}
              rightContent={
                <IconButton
                  icon={theme.dark ? 'weather-night' : 'weather-sunny'}
                  size={20}
                  onPress={handleToggleTheme}
                  iconColor={theme.colors.primary}
                />
              }
              theme={theme}
            />
            
            <ProfileMenuItem
              icon="bell"
              title="Notifications"
              description="Enable push notifications"
              onPress={handleToggleNotifications}
              rightContent={
                <IconButton
                  icon={user.preferences.notifications ? 'bell' : 'bell-off'}
                  size={20}
                  onPress={handleToggleNotifications}
                  iconColor={user.preferences.notifications ? theme.colors.primary : theme.colors.onSurfaceVariant}
                />
              }
              showDivider={false}
              theme={theme}
            />
          </Card.Content>
        </Card>

        {/* Account */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.primary }]}>
              Account
            </Text>
            
            <ProfileMenuItem
              icon="lock"
              title="Change Password"
              onPress={handleChangePassword}
              theme={theme}
            />
            
            <ProfileMenuItem
              icon="help-circle"
              title="Help & Support"
              onPress={handleHelp}
              theme={theme}
            />
            
            <ProfileMenuItem
              icon="information"
              title="About"
              onPress={handleAbout}
              showDivider={false}
              theme={theme}
            />
          </Card.Content>
        </Card>

        {/* Sign Out Button */}
        <Button
          mode="contained"
          onPress={confirmSignOut}
          style={[styles.signOutButton, { backgroundColor: theme.colors.error }]}
          textColor="white"
          icon="logout"
          loading={isLoading}
          disabled={isLoading}
        >
          Sign Out
        </Button>

        <Text style={[styles.version, { color: theme.colors.onSurfaceVariant }]}>
          GoYeCRM v1.0.0
        </Text>
      </ScrollView>

      {/* Edit Field Dialog */}
      <Portal>
        <Dialog 
          visible={!!editField} 
          onDismiss={() => setEditField(null)}
          style={{ backgroundColor: theme.colors.surface }}
        >
          <Dialog.Title>Edit {editField}</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label={editField}
              value={editValue}
              onChangeText={setEditValue}
              mode="outlined"
              style={{ marginTop: 10 }}
              autoFocus
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setEditField(null)}>Cancel</Button>
            <Button 
              onPress={handleSaveField}
              loading={isLoading}
              disabled={isLoading}
            >
              Save
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    margin: 16,
    marginBottom: 0,
    borderRadius: 12,
    overflow: 'hidden',
  },
  sectionTitle: {
    marginBottom: 10,
  },
  menuButton: {
    position: 'absolute',
    right: -15,
    top: -15,
  },
  name: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    marginBottom: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 10,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#ccc',
    height: '100%',
  },
  divider: {
    marginVertical: 10,
  },
  languageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footer: {
    padding: 20,
    marginTop: 10,
  },
});

export default ProfileScreen;
