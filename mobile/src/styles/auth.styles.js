import { StyleSheet } from 'react-native';

export const authStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 2,
  },
  logo: {
    width: '80%',
    height: '80%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: theme.colors.onSurfaceVariant,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  formContainer: {
    backgroundColor: theme.colors.surface,
    borderRadius: 8,
    padding: 20,
    elevation: 2,
  },
  input: {
    backgroundColor: theme.colors.surfaceVariant,
    marginBottom: 15,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: theme.colors.outline,
  },
  button: {
    marginTop: 10,
    paddingVertical: 8,
    backgroundColor: theme.colors.primary,
  },
  backButton: {
    marginTop: 15,
  },
  error: {
    color: theme.colors.error,
    marginBottom: 10,
    textAlign: 'center',
    backgroundColor: `${theme.colors.error}20`,
    padding: 10,
    borderRadius: 4,
  },
  linksContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  link: {
    color: theme.colors.primary,
    marginTop: 10,
  },
  inputLabel: {
    marginBottom: 4,
    color: theme.colors.onSurfaceVariant,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
  },
});
