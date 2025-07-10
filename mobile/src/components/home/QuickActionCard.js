import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Card, useTheme, Text, IconButton } from 'react-native-paper';

const QuickActionCard = ({ 
  title, 
  description, 
  icon, 
  onPress,
  color,
  count
}) => {
  const theme = useTheme();
  
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card 
        style={[styles.card, { backgroundColor: theme.colors.surface }]}
        mode="elevated"
      >
        <Card.Content style={styles.cardContent}>
          <View style={[styles.iconContainer, { backgroundColor: `${color}20` }]}>
            <IconButton
              icon={icon}
              iconColor={color}
              size={24}
              style={styles.icon}
            />
          </View>
          
          <View style={styles.textContainer}>
            <Text 
              variant="titleMedium" 
              style={[styles.title, { color: theme.colors.onSurface }]}
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text 
              variant="bodySmall" 
              style={[styles.description, { color: theme.colors.onSurfaceVariant }]}
              numberOfLines={2}
            >
              {description}
            </Text>
          </View>
          
          {count !== undefined && (
            <View style={[styles.countBadge, { backgroundColor: color }]}>
              <Text style={styles.countText}>{count}</Text>
            </View>
          )}
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  icon: {
    margin: 0,
  },
  textContainer: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    opacity: 0.8,
  },
  countBadge: {
    minWidth: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  countText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default QuickActionCard;
