import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { AuthProvider } from '@/context/AuthContext';

export const unstable_settings = {
  // La pantalla ancla por defecto cuando no hay ruta es (auth)/login
  anchor: '(auth)',
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(app)" />
        {/* Redirige la ruta raíz a (auth)/login */}
        <Stack.Screen name="index" redirect />
      </Stack>
      <StatusBar style="light" />
    </AuthProvider>
  );
}
