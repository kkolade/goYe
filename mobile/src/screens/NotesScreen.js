import React from 'react';
import { View, FlatList } from 'react-native';
import { Text, useTheme, List, FAB } from 'react-native-paper';
import notesStyles from '../styles/notes.styles';

const NotesScreen = () => {
  const theme = useTheme();
  const styles = notesStyles(theme);

  // Temporary empty data - will be replaced with real data later
  const notes = [];

  const renderNoteItem = ({ item }) => (
    <List.Item
      title={item.title}
      description={item.preview}
      descriptionNumberOfLines={2}
      left={props => (
        <List.Icon 
          {...props} 
          icon="note" 
          color={theme.colors.primary}
          style={styles.noteIcon}
        />
      )}
      style={styles.noteItem}
      titleStyle={styles.noteTitle}
      descriptionStyle={styles.notePreview}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notes</Text>
      
      {notes.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            No notes yet. Tap the + button to create one.
          </Text>
        </View>
      ) : (
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          renderItem={renderNoteItem}
          contentContainerStyle={styles.notesList}
        />
      )}

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => {}}
        color={theme.colors.onPrimary}
      />
    </View>
  );
};

// All styles have been moved to notes.styles.js

export default NotesScreen;
