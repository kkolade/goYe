import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';

const GrowthPlanItem = ({
  title,
  description,
  progress,
  status,
  lastUpdated,
  totalSteps,
  completedSteps,
  onPress,
}) => {
  const theme = useTheme();

  const getStatusColor = () => {
    switch (status) {
      case 'In Progress':
        return theme.colors.primary;
      case 'Completed':
        return theme.colors.success;
      case 'Not Started':
      default:
        return theme.colors.onSurfaceVariant;
    }
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <Text style={[styles.title, { color: theme.colors.onSurface }]}>
              {title}
            </Text>
            <View 
              style={[
                styles.statusBadge, 
                { backgroundColor: `${getStatusColor()}20` }
              ]}
            >
              <Text style={{ color: getStatusColor(), fontSize: 12 }}>
                {status}
              </Text>
            </View>
          </View>
          
          <Text style={[styles.description, { color: theme.colors.onSurfaceVariant }]}>
            {description}
          </Text>
          
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { 
                    width: `${Math.min(progress * 100, 100)}%`,
                    backgroundColor: theme.colors.primary,
                  }
                ]} 
              />
            </View>
            <Text style={[styles.progressText, { color: theme.colors.primary }]}>
              {Math.round(progress * 100)}%
            </Text>
          </View>
          
          <View style={styles.statsContainer}>
            <Text style={[styles.statsText, { color: theme.colors.onSurfaceVariant }]}>
              {completedSteps} of {totalSteps} steps
            </Text>
            <Text style={[styles.statsText, { color: theme.colors.onSurfaceVariant }]}>
              Updated {lastUpdated}
            </Text>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  description: {
    marginBottom: 12,
    fontSize: 14,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    overflow: 'hidden',
    marginRight: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  statsText: {
    fontSize: 12,
  },
});

export default GrowthPlanItem;
