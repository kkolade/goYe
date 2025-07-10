import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text, useTheme, Card, IconButton, Button, Portal, Modal } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { useNavigation } from '@react-navigation/native';
import homeStyles from '../styles/home.styles';

// Dimensions and styles are now managed in home.styles.js

const DashboardCard = ({ title, count, icon, color, onPress }) => {
  const theme = useTheme();
  const styles = homeStyles(theme);
  
  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <View style={styles.cardIcon(color)}>
            <IconButton
              icon={icon}
              size={24}
              color={color}
              style={styles.actionIcon}
            />
          </View>
          <Text style={styles.cardCount}>
            {count}
          </Text>
          <Text style={styles.cardTitle}>
            {title}
          </Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const DashboardModal = ({ visible, onDismiss, theme }) => {
  const navigation = useNavigation();
  const styles = homeStyles(theme);
  
  const dashboardItems = [
    { 
      id: '1', 
      title: 'Daily Scriptures', 
      icon: 'book-open-variant',
      count: '5',
      color: theme.colors.primary,
      onPress: () => navigation.navigate('Scriptures')
    },
    { 
      id: '2', 
      title: 'Notifications', 
      icon: 'bell',
      count: '3',
      color: theme.colors.secondary,
      onPress: () => navigation.navigate('Notifications')
    },
    { 
      id: '3', 
      title: 'Pending Tasks', 
      icon: 'clipboard-check',
      count: '7',
      color: theme.colors.tertiary || '#2196F3',
      onPress: () => navigation.navigate('Tasks')
    },
    { 
      id: '4', 
      title: 'Upcoming Events', 
      icon: 'calendar',
      count: '2',
      color: theme.colors.primaryContainer || '#9C27B0',
      onPress: () => navigation.navigate('Events')
    },
  ];

  return (
    <Portal>
      <Modal 
        visible={visible} 
        onDismiss={onDismiss}
        contentContainerStyle={styles.modal}
      >
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>
            Welcome Back!
          </Text>
          <IconButton
            icon="close"
            size={24}
            onPress={onDismiss}
            color={theme.colors.onSurface}
          />
        </View>
        
        <View style={styles.dashboardGrid}>
          {dashboardItems.map((item) => (
            <DashboardCard
              key={item.id}
              title={item.title}
              count={item.count}
              icon={item.icon}
              color={item.color}
              onPress={item.onPress}
            />
          ))}
        </View>
        
        <Button 
          mode="contained" 
          onPress={onDismiss}
          style={styles.doneButton}
          labelStyle={{ color: theme.colors.onPrimary }}
        >
          Continue to App
        </Button>
      </Modal>
    </Portal>
  );
};

const HomeScreen = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [showDashboard, setShowDashboard] = useState(true);
  const styles = homeStyles(theme);

  const handleLogout = () => {
    dispatch(logout());
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const quickActions = [
    { id: '1', title: 'Add Contact', icon: 'account-plus', screen: 'AddContact' },
    { id: '2', title: 'Schedule', icon: 'calendar-plus', screen: 'Schedule' },
    { id: '3', title: 'New Note', icon: 'note-plus', screen: 'AddNote' },
    { id: '4', title: 'Quick Task', icon: 'checkbox-marked-circle-plus-outline', screen: 'AddTask' },
  ];

  const handleQuickAction = (screen) => {
    // Navigation logic will be added later
    console.log(`Navigate to ${screen}`);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.title}>
                {getGreeting()}, User!
              </Text>
              <Text style={styles.subtitle}>
                Welcome to goYe
              </Text>
            </View>
            <IconButton
              icon="view-dashboard"
              size={28}
              onPress={() => setShowDashboard(true)}
              color={theme.colors.primary}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Quick Actions
          </Text>
          <View style={styles.quickActions}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={styles.actionCard}
                onPress={() => handleQuickAction(action.screen)}
              >
                <IconButton
                  icon={action.icon}
                  size={32}
                  color={theme.colors.primary}
                  style={styles.actionIcon}
                />
                <Text style={styles.actionText}>
                  {action.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Recent Activity
          </Text>
          <Card style={styles.activityCard}>
            <Card.Content style={styles.activityContent}>
              <Text style={[styles.emptyStateText, { textAlign: 'center' }]}>
                Your recent activities will appear here
              </Text>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
      
      <DashboardModal 
        visible={showDashboard} 
        onDismiss={() => setShowDashboard(false)}
        theme={theme}
      />
    </View>
  );
};


export default HomeScreen;
