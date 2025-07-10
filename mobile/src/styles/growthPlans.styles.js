import { StyleSheet } from 'react-native';

export const growthPlansStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: theme.colors.background,
  },
  searchContainer: {
    padding: 10,
  },
  searchBar: {
    elevation: 2,
    marginBottom: 8,
    backgroundColor: theme.colors.surface,
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
    backgroundColor: theme.colors.primary,
  },
  emptyText: {
    color: theme.colors.onSurfaceVariant,
    textAlign: 'center',
    marginBottom: 16,
  },
  
  // GrowthPlanItem styles
  card: {
    marginBottom: 16,
    borderRadius: 8,
    elevation: 2,
    backgroundColor: theme.colors.surface,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
    color: theme.colors.onSurface,
  },
  statusBadge: (statusColor) => ({
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    backgroundColor: `${statusColor}20`,
  }),
  statusText: (statusColor) => ({
    color: statusColor,
    fontSize: 12,
  }),
  description: {
    marginBottom: 12,
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: theme.colors.surfaceVariant,
    borderRadius: 3,
    overflow: 'hidden',
    marginRight: 8,
  },
  progressFill: (progress, color) => ({
    width: `${Math.min(progress * 100, 100)}%`,
    height: '100%',
    borderRadius: 3,
    backgroundColor: color,
  }),
  progressText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  statsText: {
    fontSize: 12,
    color: theme.colors.onSurfaceVariant,
  },
});

export default growthPlansStyles;
