import React from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { Searchbar, ActivityIndicator, Text, useTheme, FAB } from 'react-native-paper';
import GrowthPlanItem from './GrowthPlanItem';
import growthPlansStyles from '../../styles/growthPlans.styles';

const GrowthPlansList = ({
  plans,
  isLoading,
  error,
  refreshing,
  searchQuery,
  onSearch,
  onRefresh,
  onPlanPress,
  onAddPress,
}) => {
  const theme = useTheme();

  const styles = growthPlansStyles(theme);

  if (isLoading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={{ color: theme.colors.error }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search growth plans..."
          onChangeText={onSearch}
          value={searchQuery}
          style={styles.searchBar}
          iconColor={theme.colors.primary}
          placeholderTextColor={theme.colors.onSurfaceVariant}
          inputStyle={{ color: theme.colors.onSurface }}
        />
      </View>

      <FlatList
        data={plans}
        renderItem={({ item }) => (
          <GrowthPlanItem
            title={item.title}
            description={item.description}
            progress={item.progress}
            status={item.status}
            lastUpdated={item.lastUpdated}
            totalSteps={item.totalSteps}
            completedSteps={item.completedSteps}
            onPress={() => onPlanPress(item)}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primary]}
            tintColor={theme.colors.primary}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No growth plans found. Create your first growth plan to get started!
            </Text>
          </View>
        }
      />

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={onAddPress}
        color="white"
      />
    </View>
  );
};



export default GrowthPlansList;
