import React, { useState } from 'react';
import { View, Image, KeyboardAvoidingView, Platform, ScrollView, TextInput } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useAuth } from '../hooks/useAuth';
import { authStyles as styles } from '../styles/auth.styles';

const AuthScreen = ({ navigation }) => {
  const { login, isLoading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    await login(email, password);
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
          <Text style={styles.title}>goYe</Text>
          <Text style={styles.subtitle}>
            A Christian Discipleship and Growth Management System
          </Text>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
          
          {error && <Text style={styles.error}>{error}</Text>}
          
          <Button
            mode="contained"
            onPress={handleLogin}
            loading={isLoading}
            style={styles.button}
          >
            Login
          </Button>
          
          <View style={styles.linksContainer}>
            <Button
              mode="text"
              onPress={() => navigation.navigate('ForgotPassword')}
              style={styles.link}
            >
              Forgot Password?
            </Button>
            <Button
              mode="text"
              onPress={() => navigation.navigate('SignUp')}
              style={styles.link}
            >
              Don't have an account? Sign Up
            </Button>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// Styles are now imported from src/styles/auth.styles.js

export default AuthScreen;
