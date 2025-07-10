import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Text, useTheme, Card, IconButton, Button, Portal, Modal } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const CARD_MARGIN = 8;
const CARD_WIDTH = (width - 48) / 2 - CARD_MARGIN; // 16 padding on each side + margin between cards

const DashboardCard = ({ title, count, icon, color, onPress }) => {
  const theme = useTheme();
  
  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={[styles.card, { backgroundColor: theme.colors.surface, width: CARD_WIDTH }]}>
        <Card.Content style={styles.cardContent}>
          <View style={[styles.cardIcon, { backgroundColor: `${color}20` }]}>
            <IconButton
              icon={icon}
              size={24}
              color={color}
              style={styles.icon}
            />
          </View>
          <Text style={[styles.cardCount, { color: theme.colors.text }]}>
            {count}
          </Text>
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
            {title}
          </Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const DashboardModal = ({ visible, onDismiss, theme }) => {
  const navigation = useNavigation();
  
  const dashboardItems = [
    { 
      id: '1', 
      title: 'Daily Scriptures', 
      icon: 'book-open-variant',
      count: '5',
      color: '#4CAF50',
      onPress: () => navigation.navigate('Scriptures')
    },
    { 
      id: '2', 
      title: 'Notifications', 
      icon: 'bell',
      count: '3',
      color: '#FF9800',
      onPress: () => navigation.navigate('Notifications')
    },
    { 
      id: '3', 
      title: 'Pending Tasks', 
      icon: 'clipboard-check',
      count: '7',
      color: '#2196F3',
      onPress: () => navigation.navigate('Tasks')
    },
    { 
      id: '4', 
      title: 'Upcoming Events', 
      icon: 'calendar',
      count: '2',
      color: '#9C27B0',
      onPress: () => navigation.navigate('Events')
    },
  ];

  return (
    <Portal>
      <Modal 
        visible={visible} 
        onDismiss={onDismiss}
        contentContainerStyle={[styles.modal, { backgroundColor: theme.colors.background }]}
      >
        <View style={styles.modalHeader}>
          <Text style={[styles.modalTitle, { color: theme.colors.primary }]}>
            Welcome Back!
          </Text>
          <IconButton
            icon="close"
            size={24}
            onPress={onDismiss}
            color={theme.colors.text}
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
          labelStyle={{ color: 'white' }}
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
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={[styles.title, { color: theme.colors.primary }]}>
                {getGreeting()}, User!
              </Text>
              <Text style={[styles.subtitle, { color: theme.colors.text }]}>
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
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
            Quick Actions
          </Text>
          <View style={styles.quickActions}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={[styles.actionCard, { backgroundColor: theme.colors.surface }]}
                onPress={() => handleQuickAction(action.screen)}
              >
                <IconButton
                  icon={action.icon}
                  size={32}
                  color={theme.colors.primary}
                  style={styles.actionIcon}
                />
                <Text style={[styles.actionText, { color: theme.colors.text }]}>
                  {action.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
            Recent Activity
          </Text>
          <Card style={{ backgroundColor: theme.colors.surface, marginTop: 10 }}>
            <Card.Content>
              <Text style={{ color: theme.colors.text, textAlign: 'center' }}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 32,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: -24,
    zIndex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modal: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    width: width - 32, // Full width minus margin
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  dashboardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginHorizontal: -CARD_MARGIN/2,
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
    marginHorizontal: CARD_MARGIN/2,
    flex: 1,
    minWidth: CARD_WIDTH,
    maxWidth: CARD_WIDTH,
  },
  cardContent: {
    alignItems: 'center',
    padding: 16,
  },
  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardCount: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 14,
    textAlign: 'center',
  },
  doneButton: {
    marginTop: 8,
    borderRadius: 8,
    backgroundColor: '#6200ee',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    opacity: 0.8,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionIcon: {
    margin: 0,
  },
  actionText: {
    marginTop: 4,
    fontSize: 12,
    textAlign: 'center',
  },

  greeting: {
    fontSize: 20,
    opacity: 0.9,
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 4,
  },
  profileButton: {
    elevation: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
    marginTop: 24,
  },
  statCard: {
    width: '48%',
    marginBottom: 16,
    borderRadius: 12,
    elevation: 1,
  },
  statContent: {
    padding: 16,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  quickActionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  activityCard: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 1,
  },
  activityContent: {
    paddingVertical: 8,
  },
  emptyState: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default HomeScreen;
