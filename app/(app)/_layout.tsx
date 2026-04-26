import { useAuth } from '@/context/AuthContext';
import { Redirect, Stack } from 'expo-router';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export default function AppLayout() {
  const { authState } = useAuth();

  if (authState === 'loading') {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#5B4FE8" />
      </View>
    );
  }

  if (authState === 'unauthenticated') {
    return <Redirect href="/(auth)/login" />;
  }

  if (authState === 'denied') {
    return <Redirect href="/(auth)/access-denied" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F0E1A',
  },
});
