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
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { router } from 'expo-router';

type ScreenState = 'form' | 'sent';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [screenState, setScreenState] = useState<ScreenState>('form');

  const handleReset = async () => {
    if (!email.trim()) {
      setError('Por favor, introduce tu correo electrónico.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setScreenState('sent');
    } catch (e: any) {
      setError(mapFirebaseError(e.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.bgBlob1} />
      <View style={styles.bgBlob2} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          {/* Botón volver */}
          <Pressable
            style={styles.backBtn}
            onPress={() => router.back()}
            accessibilityLabel="Volver al inicio de sesión"
          >
            <Text style={styles.backBtnText}>← Volver</Text>
          </Pressable>

          {screenState === 'form' ? (
            <View style={styles.card}>
              {/* Icono */}
              <View style={styles.iconCircle}>
                <Text style={styles.iconEmoji}>🔑</Text>
              </View>
              <Text style={styles.cardTitle}>Recuperar contraseña</Text>
              <Text style={styles.cardDesc}>
                Introduce tu correo y te enviaremos un enlace para restablecer tu contraseña.
              </Text>

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
                  accessibilityLabel="Campo de correo electrónico para recuperar contraseña"
                />
              </View>

              <Pressable
                style={({ pressed }) => [styles.btnPrimary, pressed && styles.btnPressed]}
                onPress={handleReset}
                disabled={loading}
                accessibilityLabel="Enviar enlace de recuperación"
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.btnPrimaryText}>Enviar enlace</Text>
                )}
              </Pressable>
            </View>
          ) : (
            // Estado: enlace enviado
            <View style={styles.card}>
              <View style={[styles.iconCircle, styles.iconCircleSuccess]}>
                <Text style={styles.iconEmoji}>✉️</Text>
              </View>
              <Text style={styles.cardTitle}>¡Enlace enviado!</Text>
              <Text style={styles.cardDesc}>
                Revisa tu bandeja de entrada en{' '}
                <Text style={styles.emailHighlight}>{email}</Text>
                {'\n\n'}Si no lo encuentras, revisa también la carpeta de spam.
              </Text>
              <Pressable
                style={({ pressed }) => [styles.btnPrimary, pressed && styles.btnPressed]}
                onPress={() => router.replace('/(auth)/login')}
                accessibilityLabel="Volver al inicio de sesión"
              >
                <Text style={styles.btnPrimaryText}>Volver al inicio de sesión</Text>
              </Pressable>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

function mapFirebaseError(code: string): string {
  switch (code) {
    case 'auth/invalid-email':
      return 'El correo no es válido.';
    case 'auth/user-not-found':
      return 'No hay ninguna cuenta con ese correo.';
    case 'auth/network-request-failed':
      return 'Sin conexión a internet.';
    default:
      return 'Error al enviar el correo. Inténtalo más tarde.';
  }
}

const PURPLE = '#5B4FE8';
const GREEN = '#10B981';
const DARK_BG = '#0F0E1A';
const CARD_BG = '#1A1930';
const BORDER = '#2D2B4E';
const TEXT_PRIMARY = '#F0EEFF';
const TEXT_SECONDARY = '#9891C4';

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: DARK_BG },
  flex: { flex: 1 },
  bgBlob1: {
    position: 'absolute',
    top: -80,
    right: -60,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: '#3B31B0',
    opacity: 0.3,
  },
  bgBlob2: {
    position: 'absolute',
    bottom: -100,
    left: -40,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#7C3AED',
    opacity: 0.2,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 48,
  },

  backBtn: { marginBottom: 24 },
  backBtnText: { color: TEXT_SECONDARY, fontSize: 15 },

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
  },
  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: PURPLE,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: PURPLE,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 14,
    elevation: 8,
  },
  iconCircleSuccess: { backgroundColor: GREEN, shadowColor: GREEN },
  iconEmoji: { fontSize: 30 },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: TEXT_PRIMARY,
    marginBottom: 10,
  },
  cardDesc: {
    fontSize: 14,
    color: TEXT_SECONDARY,
    lineHeight: 21,
    marginBottom: 24,
  },
  emailHighlight: { color: TEXT_PRIMARY, fontWeight: '600' },

  errorBox: {
    backgroundColor: '#3B1A1A',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#7F1D1D',
  },
  errorText: { color: '#FCA5A5', fontSize: 13 },

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
});
