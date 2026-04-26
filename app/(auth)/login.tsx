import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { router } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Por favor, completa todos los campos.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      // La redirección la gestiona AuthContext + (auth)/_layout.tsx
    } catch (e: any) {
      setError(mapFirebaseError(e.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.root}>
      {/* Fondo con gradiente visual */}
      <View style={styles.bgTop} />
      <View style={styles.bgBottom} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo / título */}
          <View style={styles.header}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoEmoji}>🏘️</Text>
            </View>
            <Text style={styles.appName}>Toc Toc</Text>
            <Text style={styles.appSubtitle}>Tu comunidad, conectada</Text>
          </View>

          {/* Card de login */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Iniciar sesión</Text>

            {error ? (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Correo electrónico</Text>
              <TextInput
                style={styles.input}
                placeholder="tu@email.com"
                placeholderTextColor="#6B7280"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                accessibilityLabel="Campo de correo electrónico"
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Contraseña</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#6B7280"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoComplete="password"
                accessibilityLabel="Campo de contraseña"
              />
            </View>

            <Pressable
              style={({ pressed }) => [styles.btnPrimary, pressed && styles.btnPressed]}
              onPress={handleLogin}
              disabled={loading}
              accessibilityLabel="Botón iniciar sesión"
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.btnPrimaryText}>Entrar</Text>
              )}
            </Pressable>

            {/* Links secundarios */}
            <Pressable
              onPress={() => router.push('/(auth)/forgot-password')}
              style={styles.linkRow}
              accessibilityLabel="¿Olvidaste tu contraseña?"
            >
              <Text style={styles.linkText}>¿Olvidaste tu contraseña?</Text>
            </Pressable>
          </View>

          {/* Footer: nuevo usuario */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>¿Primera vez aquí? </Text>
            <Pressable
              onPress={() => router.push('/(auth)/register')}
              accessibilityLabel="Registrarse con código de invitación"
            >
              <Text style={styles.footerLink}>Únete con invitación</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function mapFirebaseError(code: string): string {
  switch (code) {
    case 'auth/invalid-email':
      return 'El correo no es válido.';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Credenciales incorrectas. Inténtalo de nuevo.';
    case 'auth/too-many-requests':
      return 'Demasiados intentos. Espera un momento.';
    case 'auth/network-request-failed':
      return 'Sin conexión a internet.';
    default:
      return 'Error al iniciar sesión. Inténtalo más tarde.';
  }
}

// ─── Estilos ──────────────────────────────────────────────────────────────────

const PURPLE = '#5B4FE8';
const DARK_BG = '#0F0E1A';
const CARD_BG = '#1A1930';
const BORDER = '#2D2B4E';
const TEXT_PRIMARY = '#F0EEFF';
const TEXT_SECONDARY = '#9891C4';

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: DARK_BG },
  flex: { flex: 1 },
  bgTop: {
    position: 'absolute',
    top: -100,
    left: -80,
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: '#3B31B0',
    opacity: 0.35,
  },
  bgBottom: {
    position: 'absolute',
    bottom: -120,
    right: -60,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: '#7C3AED',
    opacity: 0.25,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 48,
  },

  // Header
  header: { alignItems: 'center', marginBottom: 36 },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: PURPLE,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: PURPLE,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 12,
  },
  logoEmoji: { fontSize: 36 },
  appName: {
    fontSize: 32,
    fontWeight: '800',
    color: TEXT_PRIMARY,
    letterSpacing: -0.5,
  },
  appSubtitle: {
    marginTop: 4,
    fontSize: 14,
    color: TEXT_SECONDARY,
    letterSpacing: 0.3,
  },

  // Card
  card: {
    backgroundColor: CARD_BG,
    borderRadius: 24,
    padding: 28,
    borderWidth: 1,
    borderColor: BORDER,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.4,
    shadowRadius: 32,
    elevation: 10,
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: TEXT_PRIMARY,
    marginBottom: 20,
  },

  // Error
  errorBox: {
    backgroundColor: '#3B1A1A',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#7F1D1D',
  },
  errorText: { color: '#FCA5A5', fontSize: 13 },

  // Form
  fieldGroup: { marginBottom: 16 },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: TEXT_SECONDARY,
    marginBottom: 6,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: '#12111F',
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: TEXT_PRIMARY,
  },

  // Buttons
  btnPrimary: {
    backgroundColor: PURPLE,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: PURPLE,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  btnPressed: { opacity: 0.8, transform: [{ scale: 0.98 }] },
  btnPrimaryText: { color: '#fff', fontWeight: '700', fontSize: 16 },

  // Links
  linkRow: { alignItems: 'center', marginTop: 18 },
  linkText: { color: TEXT_SECONDARY, fontSize: 14 },

  // Footer
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: { color: TEXT_SECONDARY, fontSize: 14 },
  footerLink: { color: PURPLE, fontWeight: '700', fontSize: 14 },
});
