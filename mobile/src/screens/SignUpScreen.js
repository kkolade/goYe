import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import { useAuth } from '../hooks/useAuth';
import { authStyles as styles } from '../styles/auth.styles';

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signUp, isLoading, error } = useAuth();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      return { success: false, error: "Passwords don't match" };
    }
    
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
          {error ? <Text style={styles.error}>{error}</Text> : null}
          
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          
          <Button
            mode="contained"
            onPress={handleSignUp}
            loading={isLoading}
            style={styles.button}
          >
            Sign Up
          </Button>
          
          <View style={styles.linksContainer}>
            <Button
              mode="text"
              onPress={() => navigation.goBack()}
              style={styles.link}
            >
              Already have an account? Login
            </Button>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
