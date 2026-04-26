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
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, Timestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { router } from 'expo-router';

type Step = 'code' | 'account' | 'done';

export default function RegisterScreen() {
  // Paso 1: código de invitación
  const [inviteCode, setInviteCode] = useState('');
  // Paso 2: datos de cuenta
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [step, setStep] = useState<Step>('code');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ─── Paso 1: Validar código de invitación ──────────────────────────────────
  const handleValidateCode = async () => {
    const code = inviteCode.trim().toUpperCase();
    if (!code) {
      setError('Introduce un código de invitación.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const inviteRef = doc(db, 'invites', code);
      const inviteSnap = await getDoc(inviteRef);

      if (!inviteSnap.exists()) {
        setError('El código de invitación no existe.');
        return;
      }

      const invite = inviteSnap.data();

      if (!invite.isActive || invite.used) {
        setError('Este código ya ha sido usado o está desactivado.');
        return;
      }

      // Comprobar expiración
      const expiresAt: Timestamp = invite.expiresAt;
      if (expiresAt && expiresAt.toDate() < new Date()) {
        setError('Este código de invitación ha caducado.');
        return;
      }

      // Código válido → siguiente paso
      setStep('account');
    } catch (e: any) {
      setError('Error al verificar el código. Comprueba tu conexión.');
    } finally {
      setLoading(false);
    }
  };

  // ─── Paso 2: Crear cuenta en Firebase Auth ─────────────────────────────────
  const handleCreateAccount = async () => {
    if (!email.trim() || !password || !passwordConfirm) {
      setError('Por favor, completa todos los campos.');
      return;
    }
    if (password !== passwordConfirm) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password);
      // El documento en Firestore lo crea el admin manualmente.
      // La app mostrará "acceso denegado" hasta que el admin active la cuenta.
      setStep('done');
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
          {step !== 'done' && (
            <Pressable
              style={styles.backBtn}
              onPress={() => (step === 'account' ? setStep('code') : router.back())}
              accessibilityLabel="Volver"
            >
              <Text style={styles.backBtnText}>← Volver</Text>
            </Pressable>
          )}

          {/* Indicador de pasos */}
          {step !== 'done' && (
            <View style={styles.stepsRow}>
              <View style={[styles.stepDot, step !== 'code' && styles.stepDotDone]} />
              <View style={styles.stepLine} />
              <View style={[styles.stepDot, step === 'account' && styles.stepDotActive]} />
            </View>
          )}

          {/* PASO 1: Código */}
          {step === 'code' && (
            <View style={styles.card}>
              <View style={styles.iconCircle}>
                <Text style={styles.iconEmoji}>🎟️</Text>
              </View>
              <Text style={styles.cardTitle}>Código de invitación</Text>
              <Text style={styles.cardDesc}>
                Para registrarte necesitas un código proporcionado por el administrador de tu comunidad.
              </Text>

              {error ? (
                <View style={styles.errorBox}>
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              ) : null}

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Código</Text>
                <TextInput
                  style={[styles.input, styles.inputCode]}
                  placeholder="INV-0001"
                  placeholderTextColor="#6B7280"
                  value={inviteCode}
                  onChangeText={setInviteCode}
                  autoCapitalize="characters"
                  accessibilityLabel="Campo de código de invitación"
                />
              </View>

              <Pressable
                style={({ pressed }) => [styles.btnPrimary, pressed && styles.btnPressed]}
                onPress={handleValidateCode}
                disabled={loading}
                accessibilityLabel="Validar código de invitación"
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.btnPrimaryText}>Validar código</Text>
                )}
              </Pressable>
            </View>
          )}

          {/* PASO 2: Cuenta */}
          {step === 'account' && (
            <View style={styles.card}>
              <View style={[styles.iconCircle, { backgroundColor: '#059669' }]}>
                <Text style={styles.iconEmoji}>✅</Text>
              </View>
              <Text style={styles.cardTitle}>Crear tu cuenta</Text>
              <Text style={styles.cardDesc}>
                Código{' '}
                <Text style={styles.codeTag}>{inviteCode.toUpperCase()}</Text> válido.
                {'\n'}Introduce tus datos para continuar.
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
                  accessibilityLabel="Campo de correo electrónico para registro"
                />
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Contraseña</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Mínimo 6 caracteres"
                  placeholderTextColor="#6B7280"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  accessibilityLabel="Campo de contraseña para registro"
                />
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Confirmar contraseña</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Repite la contraseña"
                  placeholderTextColor="#6B7280"
                  value={passwordConfirm}
                  onChangeText={setPasswordConfirm}
                  secureTextEntry
                  accessibilityLabel="Campo de confirmación de contraseña"
                />
              </View>

              <Pressable
                style={({ pressed }) => [styles.btnPrimary, pressed && styles.btnPressed]}
                onPress={handleCreateAccount}
                disabled={loading}
                accessibilityLabel="Crear cuenta"
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.btnPrimaryText}>Crear cuenta</Text>
                )}
              </Pressable>
            </View>
          )}

          {/* PASO FINAL: Cuenta creada, pendiente de activación */}
          {step === 'done' && (
            <View style={styles.card}>
              <View style={[styles.iconCircle, { backgroundColor: '#F59E0B', shadowColor: '#F59E0B' }]}>
                <Text style={styles.iconEmoji}>⏳</Text>
              </View>
              <Text style={styles.cardTitle}>¡Cuenta creada!</Text>
              <Text style={styles.cardDesc}>
                Tu cuenta ha sido registrada. Ahora el administrador de tu comunidad debe activarla.
                {'\n\n'}
                Recibirás acceso en cuanto sea aprobada. Puedes volver a intentar acceder más tarde.
              </Text>
              <Pressable
                style={({ pressed }) => [styles.btnPrimary, pressed && styles.btnPressed]}
                onPress={() => router.replace('/(auth)/login')}
                accessibilityLabel="Ir al inicio de sesión"
              >
                <Text style={styles.btnPrimaryText}>Ir al inicio de sesión</Text>
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
    case 'auth/email-already-in-use':
      return 'Este correo ya tiene una cuenta registrada.';
    case 'auth/invalid-email':
      return 'El correo no tiene un formato válido.';
    case 'auth/weak-password':
      return 'La contraseña es demasiado débil.';
    case 'auth/network-request-failed':
      return 'Sin conexión a internet.';
    default:
      return 'Error al crear la cuenta. Inténtalo más tarde.';
  }
}

const PURPLE = '#5B4FE8';
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
    top: -60,
    left: -80,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: '#3B31B0',
    opacity: 0.3,
  },
  bgBlob2: {
    position: 'absolute',
    bottom: -80,
    right: -40,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: '#0D9488',
    opacity: 0.2,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  backBtn: { marginBottom: 16 },
  backBtnText: { color: TEXT_SECONDARY, fontSize: 15 },

  stepsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
    paddingHorizontal: 60,
  },
  stepDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: BORDER,
  },
  stepDotActive: { backgroundColor: PURPLE },
  stepDotDone: { backgroundColor: '#10B981' },
  stepLine: { flex: 1, height: 2, backgroundColor: BORDER, marginHorizontal: 6 },

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
  codeTag: {
    color: '#10B981',
    fontWeight: '700',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
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
  inputCode: {
    textAlign: 'center',
    letterSpacing: 4,
    fontWeight: '700',
    fontSize: 18,
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
