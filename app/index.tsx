import { Redirect } from 'expo-router';

// Redirige la raíz a (auth). El AuthContext decidirá si va a login o a la app.
export default function RootIndex() {
  return <Redirect href="/(auth)/login" />;
}
