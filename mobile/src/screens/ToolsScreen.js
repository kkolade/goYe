import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, useTheme, List, Divider } from 'react-native-paper';

const tools = [
  { id: '1', title: 'Growth Plans', icon: 'trending-up', description: 'Manage discipleship growth plans' },
  { id: '2', title: 'Groups', icon: 'group', description: 'Organize people into groups' },
  { id: '3', title: 'Teams', icon: 'people', description: 'Manage ministry teams' },
  { id: '4', title: 'Export Data', icon: 'file-export', description: 'Export your data for backup' },
  { id: '5', title: 'Settings', icon: 'cog', description: 'App settings and preferences' },
];

const ToolsScreen = () => {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.primary }]}>
        Tools
      </Text>
      
      <ScrollView>
        {tools.map((tool, index) => (
          <View key={tool.id}>
            <List.Item
              title={tool.title}
              description={tool.description}
              left={props => <List.Icon {...props} icon={tool.icon} color={theme.colors.primary} />}
              onPress={() => {}}
              style={styles.listItem}
            />
            {index < tools.length - 1 && <Divider />}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 10,
  },
  listItem: {
    paddingVertical: 12,
  },
});

export default ToolsScreen;
