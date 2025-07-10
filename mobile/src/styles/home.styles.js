import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_MARGIN = 8;
const CARD_WIDTH = (width - 48) / 2 - CARD_MARGIN;

export const homeStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 32,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: -24,
    zIndex: 1,
    backgroundColor: theme.colors.surfaceVariant,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
    color: theme.colors.onSurface,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
    color: theme.colors.onSurfaceVariant,
    textAlign: 'center',
    opacity: 0.8,
  },
  greeting: {
    fontSize: 20,
    color: theme.colors.onSurface,
    opacity: 0.9,
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 4,
    color: theme.colors.onSurface,
  },
  
  // Modal Styles
  modal: {
    margin: 16,
    borderRadius: 12,
    padding: 16,
    width: width - 32,
    backgroundColor: theme.colors.surface,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  dashboardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginHorizontal: -CARD_MARGIN/2,
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
    marginHorizontal: CARD_MARGIN/2,
    flex: 1,
    minWidth: CARD_WIDTH,
    maxWidth: CARD_WIDTH,
    backgroundColor: theme.colors.surface,
  },
  cardContent: {
    alignItems: 'center',
    padding: 16,
  },
  cardIcon: (color) => ({
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: `${color}20`,
  }),
  cardCount: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    color: theme.colors.onSurface,
  },
  cardTitle: {
    fontSize: 14,
    textAlign: 'center',
    color: theme.colors.onSurfaceVariant,
  },
  doneButton: {
    marginTop: 8,
    borderRadius: 8,
    backgroundColor: theme.colors.primary,
  },
  
  // Section Styles
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: theme.colors.primary,
  },
  
  // Quick Actions
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 2,
    backgroundColor: theme.colors.surface,
  },
  actionIcon: {
    margin: 0,
  },
  actionText: {
    marginTop: 4,
    fontSize: 12,
    textAlign: 'center',
    color: theme.colors.onSurface,
  },
  
  // Stats Container
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
    marginTop: 24,
  },
  statCard: {
    width: '48%',
    marginBottom: 16,
    borderRadius: 12,
    elevation: 1,
    backgroundColor: theme.colors.surface,
  },
  statContent: {
    padding: 16,
  },
  
  // Activity
  activityCard: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 1,
    backgroundColor: theme.colors.surface,
  },
  activityContent: {
    paddingVertical: 8,
  },
  emptyState: {
    alignItems: 'center',
    padding: 20,
  },
  emptyStateText: {
    color: theme.colors.onSurfaceVariant,
    textAlign: 'center',
  },
});

export default homeStyles;
