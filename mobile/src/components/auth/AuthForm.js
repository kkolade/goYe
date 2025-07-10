import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { Button, TextInput, Text, useTheme } from 'react-native-paper';

const AuthForm = ({
  email,
  setEmail,
  password,
  setPassword,
  isSignUp,
  isLoading,
  error,
  onSubmit,
  onToggleAuthMode,
}) => {
  const theme = useTheme();

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.inner}>
          <Text style={[styles.title, { color: theme.colors.primary }]}>
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </Text>
          
          {error ? (
            <Text style={[styles.error, { color: theme.colors.error }]}>
              {error}
            </Text>
          ) : null}

          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
            disabled={isLoading}
          />
          
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            secureTextEntry
            style={styles.input}
            disabled={isLoading}
          />

          <Button
            mode="contained"
            onPress={onSubmit}
            loading={isLoading}
            style={styles.button}
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>

          <Button
            onPress={onToggleAuthMode}
            style={styles.toggleButton}
            labelStyle={{ color: theme.colors.primary }}
            disabled={isLoading}
          >
            {isSignUp 
              ? 'Already have an account? Sign In' 
              : "Don't have an account? Sign Up"}
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  inner: {
    padding: 20,
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    paddingVertical: 5,
  },
  toggleButton: {
    marginTop: 15,
  },
  error: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default AuthForm;
