import { StyleSheet } from 'react-native';

export const notesStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 10,
    color: theme.colors.primary,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    color: theme.colors.onSurface,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.primary,
  },
  noteItem: {
    backgroundColor: theme.colors.surface,
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
  },
  noteContent: {
    padding: 16,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.onSurface,
    marginBottom: 4,
  },
  notePreview: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
  },
  noteDate: {
    fontSize: 12,
    color: theme.colors.outline,
    marginTop: 4,
  },
  noteIcon: {
    backgroundColor: `${theme.colors.primary}20`,
  },
});

export default notesStyles;
