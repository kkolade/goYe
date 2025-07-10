import { StyleSheet } from 'react-native';

export const profileStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  card: {
    margin: 16,
    borderRadius: 8,
    elevation: 2,
    backgroundColor: theme.colors.surface,
  },
  sectionTitle: {
    marginBottom: 16,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  signOutButton: {
    margin: 24,
    marginTop: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: theme.colors.error,
  },
  version: {
    textAlign: 'center',
    marginVertical: 16,
    fontSize: 12,
    color: theme.colors.onSurfaceVariant,
  },
  dialogContent: {
    padding: 16,
  },
  dialogInput: {
    marginBottom: 16,
    backgroundColor: theme.colors.surface,
  },
  dialogActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 8,
  },
  dialogButton: {
    marginLeft: 8,
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
  errorText: {
    color: theme.colors.error,
    marginBottom: 16,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 8,
  },
  editButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  avatar: {
    backgroundColor: theme.colors.primaryContainer,
    marginBottom: 8,
  },
  userName: {
    marginTop: 8,
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.onSurface,
  },
  userRole: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
    marginBottom: 8,
  },
  menuItem: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    marginLeft: 16,
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    color: theme.colors.onSurface,
  },
  menuItemDescription: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.outline,
    opacity: 0.2,
  },
});

export default profileStyles;
