import { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
});

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [error, setError] = useState(null);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // Load fonts
        await Font.loadAsync({
          // You can add custom fonts here
          // Example:
          // 'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
          // 'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
        });
      } catch (e) {
        // Log the error and continue
        console.warn('Error loading resources:', e);
        setError(e);
      } finally {
        // Add a small delay to ensure everything is loaded
        setTimeout(() => {
          setLoadingComplete(true);
          SplashScreen.hideAsync().catch(e => {
            console.warn('Error hiding splash screen:', e);
          });
        }, 500);
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return { isLoadingComplete, error };
}
