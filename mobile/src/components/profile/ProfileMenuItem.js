import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, useTheme, IconButton } from 'react-native-paper';

const ProfileMenuItem = ({
  icon,
  title,
  description,
  onPress,
  showDivider = true,
  rightContent,
  theme
}) => {
  return (
    <>
      <TouchableOpacity 
        style={styles.container}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={styles.content}>
          <View style={[styles.iconContainer, { backgroundColor: `${theme.colors.primary}10` }]}>
            <IconButton
              icon={icon}
              iconColor={theme.colors.primary}
              size={20}
              style={styles.icon}
            />
          </View>
          
          <View style={styles.textContainer}>
            <Text 
              variant="bodyLarge" 
              style={[styles.title, { color: theme.colors.onSurface }]}
              numberOfLines={1}
            >
              {title}
            </Text>
            {description && (
              <Text 
                variant="bodySmall" 
                style={[styles.description, { color: theme.colors.onSurfaceVariant }]}
                numberOfLines={1}
              >
                {description}
              </Text>
            )}
          </View>
          
          {rightContent || (
            <IconButton
              icon="chevron-right"
              size={24}
              iconColor={theme.colors.onSurfaceVariant}
              style={styles.arrow}
            />
          )}
        </View>
      </TouchableOpacity>
      
      {showDivider && (
        <View style={[styles.divider, { backgroundColor: theme.colors.outlineVariant }]} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
    fontWeight: '500',
    marginBottom: 2,
  },
  description: {
    opacity: 0.8,
  },
  arrow: {
    margin: 0,
    marginRight: -8,
  },
  divider: {
    height: 1,
    opacity: 0.2,
    marginLeft: 72, // icon width + margin
  },
});

export default ProfileMenuItem;
