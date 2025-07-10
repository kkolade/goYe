import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';

// Import screens
import AuthScreen from '../screens/AuthScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import ContactsScreen from '../screens/ContactsScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import NotesScreen from '../screens/NotesScreen';
import ToolsScreen from '../screens/ToolsScreen';

// Icons
import { MaterialIcons } from '@expo/vector-icons';
import { selectIsAuthenticated } from '../store/slices/authSlice';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  const theme = useTheme();
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Contacts') {
            iconName = 'contacts';
          } else if (route.name === 'Schedule') {
            iconName = 'event';
          } else if (route.name === 'Notes') {
            iconName = 'note';
          } else if (route.name === 'Tools') {
            iconName = 'build';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
        },
        headerStyle: {
          backgroundColor: theme.colors.surface,
        },
        headerTintColor: theme.colors.text,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Home' }}
      />
      <Tab.Screen 
        name="Contacts" 
        component={ContactsScreen} 
        options={{ title: 'Contacts' }}
      />
      <Tab.Screen 
        name="Schedule" 
        component={ScheduleScreen} 
        options={{ title: 'Schedule' }}
      />
      <Tab.Screen 
        name="Notes" 
        component={NotesScreen} 
        options={{ title: 'Notes' }}
      />
      <Tab.Screen 
        name="Tools" 
        component={ToolsScreen} 
        options={{ title: 'Tools' }}
      />
    </Tab.Navigator>
  );
}

// Main Navigation Container
export default function Navigation() {
  const theme = useTheme();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const navigationTheme = {
    dark: theme.dark,
    colors: {
      primary: theme.colors.primary,
      background: theme.colors.background,
      card: theme.colors.surface,
      text: theme.colors.text,
      border: theme.colors.border,
      notification: theme.colors.notification,
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.surface,
        },
        headerTintColor: theme.colors.primary,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
        {!isAuthenticated ? (
          <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen 
              name="Auth" 
              component={AuthScreen}
            />
            <Stack.Screen 
              name="SignUp" 
              component={SignUpScreen}
              options={{
                headerShown: true,
                title: 'Create Account',
                headerBackTitle: 'Back',
              }}
            />
            <Stack.Screen 
              name="ForgotPassword" 
              component={ForgotPasswordScreen}
              options={{
                headerShown: true,
                title: 'Reset Password',
                headerBackTitle: 'Back',
              }}
            />
          </Stack.Group>
        ) : (
          <Stack.Screen 
            name="MainTabs" 
            component={MainTabs} 
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
