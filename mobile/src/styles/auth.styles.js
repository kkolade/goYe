import { StyleSheet } from 'react-native';

export const authStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 16,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 16,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  logo: {
    width: '80%',
    height: '80%',
  },
  title: {
    color: theme.colors.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    color: theme.colors.onSurfaceVariant,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  formContainer: {
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    padding: 16,
  },
  input: {
    width: '100%',
    backgroundColor: theme.colors.surface,
  },
  button: {
    width: '100%',
    borderRadius: 8,
    marginTop: 8,
  },
  backButton: {
    marginTop: 15,
  },
  error: {
    color: theme.colors.error,
    marginBottom: 16,
    textAlign: 'center',
    backgroundColor: `${theme.colors.error}10`,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: `${theme.colors.error}30`,
  },
  linksContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  link: {
    fontWeight: '600',
  },
  errorText: {
    color: theme.colors.error,
    fontSize: 12,
    marginTop: 4,
    marginBottom: 8,
    marginLeft: 4,
  },
});
