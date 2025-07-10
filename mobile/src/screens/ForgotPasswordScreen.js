import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Platform, ScrollView, Image } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import { useAuth } from '../hooks/useAuth';
import { authStyles as styles } from '../styles/auth.styles';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { requestPasswordReset, isLoading, error } = useAuth();

  const handleResetPassword = async () => {
    const { success } = await requestPasswordReset(email);
    if (success) {
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', padding: 20 }]}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('../../assets/goye.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={[styles.title, { textAlign: 'center' }]}>
          Check Your Email
        </Text>
        <Text style={[styles.subtitle, { textAlign: 'center' }]}>
          We've sent a password reset link to {'\n'}
          <Text style={{ fontWeight: 'bold' }}>{email}</Text>
        </Text>
        <Button 
          mode="contained" 
          onPress={() => navigation.navigate('Auth')}
          style={[styles.button, { marginTop: 30 }]}
        >
          Back to Login
        </Button>
      </View>
    );
  }

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
          <Text style={styles.title}>
            Reset Password
          </Text>
          <Text style={styles.subtitle}>
            Enter your email to receive a reset link
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

          <Button 
            mode="contained" 
            onPress={handleResetPassword}
            loading={isLoading}
            style={styles.button}
          >
            Send Reset Link
          </Button>

          <Button 
            mode="text" 
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            Back to Login
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
