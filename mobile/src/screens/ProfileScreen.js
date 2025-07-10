import React from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { Text, useTheme, Button, Card, IconButton, Portal, Dialog, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileMenuItem from '../components/profile/ProfileMenuItem';
import useProfile from '../hooks/useProfile';
import profileStyles from '../styles/profile.styles';

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

  const styles = profileStyles(theme);

  return (
    <View style={styles.container}>
      <ScrollView>
        <ProfileHeader 
          user={user} 
          onEditPress={handleEditProfile}
          theme={theme}
        />

        {/* Personal Information */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
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
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
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
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
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
          style={styles.signOutButton}
          textColor="white"
          icon="logout"
          loading={isLoading}
          disabled={isLoading}
        >
          Sign Out
        </Button>

        <Text style={styles.version}>
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

export default ProfileScreen;
