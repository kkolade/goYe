import { useState, useEffect, useCallback } from 'react';

// Mock data - Replace with actual API calls
const MOCK_QUICK_ACTIONS = [
  {
    id: '1',
    title: 'New Contact',
    description: 'Add a new person to your network',
    icon: 'account-plus',
    route: 'AddContact',
    color: '#4CAF50', // Green
  },
  {
    id: '2',
    title: 'Create Plan',
    description: 'Start a new growth plan',
    icon: 'book-plus',
    route: 'CreatePlan',
    color: '#2196F3', // Blue
  },
  {
    id: '3',
    title: 'Log Meeting',
    description: 'Record a new interaction',
    icon: 'calendar-plus',
    route: 'LogMeeting',
    color: '#9C27B0', // Purple
  },
  {
    id: '4',
    title: 'Prayer Request',
    description: 'Add a prayer request',
    icon: 'hands-pray',
    route: 'AddPrayerRequest',
    color: '#F44336', // Red
  },
];

const MOCK_RECENT_ACTIVITIES = [
  {
    id: '1',
    title: 'John Doe',
    description: 'Follow-up scheduled for tomorrow at 2:00 PM',
    timestamp: '2 hours ago',
    type: 'contact',
    user: { id: '1', name: 'You' },
  },
  {
    id: '2',
    title: 'New Believer Foundation',
    description: 'Step 3 completed in the growth plan',
    timestamp: '5 hours ago',
    type: 'plan',
    user: { id: '2', name: 'Sarah Johnson' },
  },
  {
    id: '3',
    title: 'Prayer Request',
    description: 'Jane requested prayer for her family',
    timestamp: '1 day ago',
    type: 'prayer',
    user: { id: '3', name: 'Jane Smith' },
  },
  {
    id: '4',
    title: 'Team Meeting',
    description: 'Monthly discipleship team meeting notes updated',
    timestamp: '2 days ago',
    type: 'note',
    user: { id: '1', name: 'You' },
  },
];

const MOCK_STATS = {
  totalContacts: 124,
  activePlans: 8,
  pendingFollowUps: 5,
  prayerRequests: 12,
};

const useHomeData = () => {
  const [quickActions, setQuickActions] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [stats, setStats] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Load home data
  const loadData = useCallback(async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setQuickActions(MOCK_QUICK_ACTIONS);
      setRecentActivities(MOCK_RECENT_ACTIVITIES);
      setStats(MOCK_STATS);
      setError(null);
    } catch (err) {
      setError('Failed to load home data. Please try again.');
      console.error('Error loading home data:', err);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Handle refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadData();
  }, [loadData]);

  return {
    quickActions,
    recentActivities,
    stats,
    isLoading,
    error,
    refreshing,
    onRefresh,
  };
};

export default useHomeData;
