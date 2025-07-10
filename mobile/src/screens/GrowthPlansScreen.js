import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import GrowthPlansList from '../components/growth-plans/GrowthPlansList';
import useGrowthPlans from '../hooks/useGrowthPlans';

const GrowthPlansScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  
  const {
    plans,
    isLoading,
    error,
    refreshing,
    searchQuery,
    setSearchQuery,
    onRefresh,
  } = useGrowthPlans();

  const handlePlanPress = (plan) => {
    navigation.navigate('GrowthPlanDetail', { 
      planId: plan.id,
      title: plan.title 
    });
  };

  const handleAddPress = () => {
    navigation.navigate('CreatePlan');
  };

  return (
    <GrowthPlansList
      plans={plans}
      isLoading={isLoading}
      error={error}
      refreshing={refreshing}
      searchQuery={searchQuery}
      onSearch={setSearchQuery}
      onRefresh={onRefresh}
      onPlanPress={handlePlanPress}
      onAddPress={handleAddPress}
    />
  );
};

export default GrowthPlansScreen;
