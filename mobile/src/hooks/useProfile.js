import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';

// Mock data - Replace with actual API calls
const MOCK_USER = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  phone: '+1 (555) 123-4567',
  role: 'Discipler',
  organization: 'Grace Church',
  location: 'New York, USA',
  bio: 'Passionate about discipleship and helping others grow in their faith journey.',
  stats: {
    contacts: 24,
    plans: 8,
    teams: 3,
  },
  preferences: {
    theme: 'system',
    notifications: true,
    emailUpdates: true,
  },
};

const useProfile = () => {
  const { signOut } = useAuth();
  const [user, setUser] = useState(MOCK_USER);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({...MOCK_USER});

  const handleEditProfile = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleSaveProfile = useCallback(async (updatedData) => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUser(prev => ({
        ...prev,
        ...updatedData,
      }));
      
      setFormData(prev => ({
        ...prev,
        ...updatedData,
      }));
      
      setIsEditing(false);
      return { success: true };
    } catch (error) {
      console.error('Error updating profile:', error);
      return { success: false, error: 'Failed to update profile' };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSignOut = useCallback(async () => {
    try {
      setIsLoading(true);
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      Alert.alert('Error', 'Failed to sign out. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [signOut]);

  const handleToggleTheme = useCallback(() => {
    // This would be connected to your theme context
    console.log('Toggle theme');
  }, []);

  const handleToggleNotifications = useCallback(() => {
    setUser(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        notifications: !prev.preferences.notifications,
      },
    }));
  }, []);

  const handleChangePassword = useCallback(() => {
    // Navigate to change password screen
    console.log('Change password');
  }, []);

  const handleHelp = useCallback(() => {
    // Navigate to help/support screen
    console.log('Help & Support');
  }, []);

  const handleAbout = useCallback(() => {
    // Navigate to about screen
    console.log('About');
  }, []);

  return {
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
    setIsEditing,
  };
};

export default useProfile;
