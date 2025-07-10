import React from 'react';
import { View } from 'react-native';
import { Text, useTheme, FAB } from 'react-native-paper';
import scheduleStyles from '../styles/schedule.styles';

const ScheduleScreen = () => {
  const theme = useTheme();
  const styles = scheduleStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Schedule</Text>
      <View style={styles.emptyState}>
        <Text style={styles.emptyStateText}>
          Your schedule will appear here
        </Text>
        <Text style={styles.subtitle}>
          No upcoming events scheduled
        </Text>
      </View>

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => {}}
        color={theme.colors.onPrimary}
      />
    </View>
  );
};

// All styles have been moved to schedule.styles.js

export default ScheduleScreen;
