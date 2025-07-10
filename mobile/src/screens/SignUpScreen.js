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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image 
              source={require('../../assets/goye.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Join our community of disciples
          </Text>
        </View>
        
        <View style={styles.formContainer}>
          {authError ? <Text style={styles.error}>{authError}</Text> : null}
          
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={[
              styles.input,
              touched.email && errors.email && styles.inputError
            ]}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            onBlur={() => handleBlur('email')}
            autoCapitalize="none"
            keyboardType="email-address"
            mode="outlined"
            left={<TextInput.Icon icon="email" color={theme.colors.primary} />}
          />
          {touched.email && errors.email ? (
            <Text style={styles.errorText}>{errors.email}</Text>
          ) : null}
          
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={[
              styles.input,
              touched.password && errors.password && styles.inputError
            ]}
            placeholder="Create a password"
            value={password}
            onChangeText={setPassword}
            onBlur={() => handleBlur('password')}
            secureTextEntry
            mode="outlined"
            left={<TextInput.Icon icon="lock" color={theme.colors.primary} />}
          />
          {touched.password && errors.password ? (
            <Text style={styles.errorText}>{errors.password}</Text>
          ) : null}
          
          <Text style={styles.inputLabel}>Confirm Password</Text>
          <TextInput
            style={[
              styles.input,
              touched.confirmPassword && errors.confirmPassword && styles.inputError
            ]}
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            onBlur={() => handleBlur('confirmPassword')}
            secureTextEntry
            mode="outlined"
            left={<TextInput.Icon icon="lock-check" color={theme.colors.primary} />}
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
            contentStyle={{ height: 50 }}
            labelStyle={{ fontSize: 16 }}
            icon="account-plus"
          >
            Create Account
          </Button>
          
          <View style={styles.linksContainer}>
            <Text style={{ color: theme.colors.onSurfaceVariant }}>
              Already have an account?{' '}
              <Text 
                style={styles.link}
                onPress={() => navigation.navigate('Login')}
              >
                Sign In
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
