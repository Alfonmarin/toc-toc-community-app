import { Stack } from 'expo-router';

export default function SuperAdminLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Stack.Screen name="dashboard" />
    </Stack>
  );
}
