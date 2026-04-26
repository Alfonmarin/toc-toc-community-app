import { useAuth } from '@/context/AuthContext';
import { Redirect, Stack } from 'expo-router';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export default function AuthLayout() {
  const { authState } = useAuth();

  // Mientras carga la sesión no redirigimos
  if (authState === 'loading') {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#5B4FE8" />
      </View>
    );
  }

  // Si ya está autenticado y activo, mandarlo a la app
  if (authState === 'active') {
    return <Redirect href="/(app)/(tabs)" />;
  }

  // Si está denegado, mandarlo a access-denied (dentro del mismo grupo auth)
  if (authState === 'denied') {
    return <Redirect href="/(auth)/access-denied" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="forgot-password" />
      <Stack.Screen name="register" />
      <Stack.Screen name="access-denied" />
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
