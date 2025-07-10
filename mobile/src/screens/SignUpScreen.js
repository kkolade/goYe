import React, { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView, Platform, ScrollView, Image } from 'react-native';
import { Text, Button, TextInput, useTheme } from 'react-native-paper';
import { useAuth } from '../hooks/useAuth';
import { authStyles } from '../styles/auth.styles';

export default function SignUpScreen({ navigation }) {
  const theme = useTheme();
  const styles = authStyles(theme);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const { signUp, isLoading, error: authError } = useAuth();

  useEffect(() => {
    // Clear errors when email or password changes
    if (touched.email && errors.email) {
      setErrors(prev => ({ ...prev, email: '' }));
    }
    if (touched.password && errors.password) {
      setErrors(prev => ({ ...prev, password: '' }));
    }
  }, [email, password, touched]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateForm();
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;
    
    const result = await signUp(email, password);
    if (result.success) {
      // Navigation is handled by the auth state change
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image 
              source={require('../../assets/goye.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <Text variant="headlineMedium" style={styles.title}>Create Account</Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Join our community of disciples
          </Text>
        </View>
        
        <View style={styles.formContainer}>
          {authError ? <Text style={styles.error}>{authError}</Text> : null}
          
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            onBlur={() => handleBlur('email')}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          {touched.email && errors.email ? (
            <Text style={styles.errorText}>{errors.email}</Text>
          ) : null}
          
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            onBlur={() => handleBlur('password')}
            secureTextEntry
          />
          {touched.password && errors.password ? (
            <Text style={styles.errorText}>{errors.password}</Text>
          ) : null}
          
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            onBlur={() => handleBlur('confirmPassword')}
            secureTextEntry
          />
          {touched.confirmPassword && errors.confirmPassword ? (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          ) : null}
          
          <Button
            mode="contained"
            onPress={handleSignUp}
            loading={isLoading}
            disabled={isLoading}
            style={styles.button}
          >
            Create Account
          </Button>
          
          <View style={styles.linksContainer}>
            <Button
              mode="text"
              onPress={() => navigation.navigate('Login')}
              style={styles.link}
            >
              Already have an account? Sign In
            </Button>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
