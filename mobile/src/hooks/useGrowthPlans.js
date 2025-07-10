import { useState, useEffect, useCallback } from 'react';

// Mock data - Replace with actual API calls
export const MOCK_GROWTH_PLANS = [
  { 
    id: '1', 
    title: 'New Believer Foundation', 
    description: 'Basic discipleship for new believers',
    progress: 0.65,
    totalSteps: 12,
    completedSteps: 8,
    status: 'In Progress',
    lastUpdated: '2 days ago'
  },
  { 
    id: '2', 
    title: 'Spiritual Maturity', 
    description: 'Growing deeper in faith',
    progress: 0.3,
    totalSteps: 10,
    completedSteps: 3,
    status: 'In Progress',
    lastUpdated: '1 week ago'
  },
  { 
    id: '3', 
    title: 'Leadership Development', 
    description: 'Training for future leaders',
    progress: 0.1,
    totalSteps: 8,
    completedSteps: 1,
    status: 'Not Started',
    lastUpdated: '2 weeks ago'
  },
];

const useGrowthPlans = () => {
  const [plans, setPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Load growth plans
  const loadPlans = useCallback(async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPlans(MOCK_GROWTH_PLANS);
      setFilteredPlans(MOCK_GROWTH_PLANS);
      setError(null);
    } catch (err) {
      setError('Failed to load growth plans. Please try again.');
      console.error('Error loading growth plans:', err);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadPlans();
  }, [loadPlans]);

  // Filter plans when search query changes
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredPlans(plans);
      return;
    }

    const filtered = plans.filter(
      plan =>
        plan.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plan.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plan.status.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPlans(filtered);
  }, [searchQuery, plans]);

  // Handle refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadPlans();
  }, [loadPlans]);

  // Add a new growth plan
  const addPlan = useCallback(async (newPlan) => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const updatedPlans = [{ ...newPlan, id: Date.now().toString() }, ...plans];
      setPlans(updatedPlans);
      return { success: true };
    } catch (err) {
      console.error('Error adding growth plan:', err);
      return { success: false, error: 'Failed to add growth plan' };
    } finally {
      setIsLoading(false);
    }
  }, [plans]);

  // Update a growth plan
  const updatePlan = useCallback(async (updatedPlan) => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const updatedPlans = plans.map(plan => 
        plan.id === updatedPlan.id ? updatedPlan : plan
      );
      setPlans(updatedPlans);
      return { success: true };
    } catch (err) {
      console.error('Error updating growth plan:', err);
      return { success: false, error: 'Failed to update growth plan' };
    } finally {
      setIsLoading(false);
    }
  }, [plans]);

  // Delete a growth plan
  const deletePlan = useCallback(async (planId) => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const updatedPlans = plans.filter(plan => plan.id !== planId);
      setPlans(updatedPlans);
      return { success: true };
    } catch (err) {
      console.error('Error deleting growth plan:', err);
      return { success: false, error: 'Failed to delete growth plan' };
    } finally {
      setIsLoading(false);
    }
  }, [plans]);

  return {
    plans: filteredPlans,
    isLoading,
    error,
    refreshing,
    searchQuery,
    setSearchQuery,
    onRefresh,
    addPlan,
    updatePlan,
    deletePlan,
  };
};

export default useGrowthPlans;
