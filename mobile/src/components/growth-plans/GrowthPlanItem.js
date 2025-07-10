import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import growthPlansStyles from '../../styles/growthPlans.styles';

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
  const styles = growthPlansStyles(theme);

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
  
  const statusColor = getStatusColor();

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <Text style={styles.itemTitle}>
              {title}
            </Text>
            <View style={styles.statusBadge(statusColor)}>
              <Text style={styles.statusText(statusColor)}>
                {status}
              </Text>
            </View>
          </View>
          
          <Text style={styles.description}>
            {description}
          </Text>
          
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={styles.progressFill(progress, theme.colors.primary)} 
              />
            </View>
            <Text style={styles.progressText}>
              {Math.round(progress * 100)}%
            </Text>
          </View>
          
          <View style={styles.statsContainer}>
            <Text style={styles.statsText}>
              {completedSteps} of {totalSteps} steps
            </Text>
            <Text style={styles.statsText}>
              Updated {lastUpdated}
            </Text>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

export default GrowthPlanItem;
