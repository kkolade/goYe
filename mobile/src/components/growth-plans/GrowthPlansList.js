import React from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Searchbar, ActivityIndicator, Text, useTheme, FAB } from 'react-native-paper';
import GrowthPlanItem from './GrowthPlanItem';

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

  if (isLoading && !refreshing) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.errorContainer, { backgroundColor: theme.colors.background }]}>
        <Text style={{ color: theme.colors.error }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
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
            <Text style={{ 
              color: theme.colors.onSurfaceVariant,
              textAlign: 'center',
              marginBottom: 16,
            }}>
              No growth plans found. Create your first growth plan to get started!
            </Text>
          </View>
        }
      />

      <FAB
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        icon="plus"
        onPress={onAddPress}
        color="white"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  searchContainer: {
    padding: 10,
  },
  searchBar: {
    elevation: 2,
    marginBottom: 8,
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default GrowthPlansList;
