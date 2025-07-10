import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, useTheme, List, FAB } from 'react-native-paper';

const NotesScreen = () => {
  const theme = useTheme();

  // Temporary empty data - will be replaced with real data later
  const notes = [];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.primary }]}>
        Notes
      </Text>
      
      {notes.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={{ color: theme.colors.text, textAlign: 'center' }}>
            No notes yet. Tap the + button to create one.
          </Text>
        </View>
      ) : (
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <List.Item
              title={item.title}
              description={item.preview}
              left={props => <List.Icon {...props} icon="note" />}
            />
          )}
        />
      )}

      <FAB
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        icon="plus"
        onPress={() => {}}
        color="white"
      />
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
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default NotesScreen;
