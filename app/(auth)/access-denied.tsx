import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

export default function AccessDeniedScreen() {
  const { signOut, firebaseUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    await signOut();
    // La redirección la gestiona AuthContext → authState: "unauthenticated"
  };

  return (
    <View style={styles.root}>
      <View style={styles.bgBlob1} />
      <View style={styles.bgBlob2} />

      <View style={styles.content}>
        {/* Icono */}
        <View style={styles.iconCircle}>
          <Text style={styles.iconEmoji}>🚫</Text>
        </View>

        <Text style={styles.title}>Acceso denegado</Text>
        <Text style={styles.subtitle}>Tu cuenta no está activada</Text>

        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            Tu usuario ha sido registrado, pero aún no tiene acceso a la comunidad.
          </Text>
          <Text style={[styles.infoText, styles.infoTextSecond]}>
            El administrador debe activar tu cuenta antes de que puedas entrar. Si crees que es un error, contacta con tu administrador.
          </Text>

          {firebaseUser?.email ? (
            <View style={styles.emailRow}>
              <Text style={styles.emailLabel}>Cuenta:</Text>
              <Text style={styles.emailValue}>{firebaseUser.email}</Text>
            </View>
          ) : null}
        </View>

        <Pressable
          style={({ pressed }) => [styles.btnSignOut, pressed && styles.btnPressed]}
          onPress={handleSignOut}
          disabled={loading}
          accessibilityLabel="Cerrar sesión"
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.btnSignOutText}>Cerrar sesión</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}

const DARK_BG = '#0F0E1A';
const CARD_BG = '#1A1930';
const BORDER = '#2D2B4E';
const TEXT_PRIMARY = '#F0EEFF';
const TEXT_SECONDARY = '#9891C4';
const RED = '#EF4444';

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: DARK_BG, justifyContent: 'center' },
  bgBlob1: {
    position: 'absolute',
    top: -80,
    right: -60,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: '#7F1D1D',
    opacity: 0.25,
  },
  bgBlob2: {
    position: 'absolute',
    bottom: -80,
    left: -60,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: '#7C3AED',
    opacity: 0.15,
  },
  content: {
    paddingHorizontal: 28,
    alignItems: 'center',
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#3B0A0A',
    borderWidth: 2,
    borderColor: '#7F1D1D',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: RED,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  iconEmoji: { fontSize: 44 },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: TEXT_PRIMARY,
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#FCA5A5',
    marginBottom: 32,
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: CARD_BG,
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: BORDER,
    width: '100%',
    marginBottom: 32,
    gap: 12,
  },
  infoText: {
    fontSize: 14,
    color: TEXT_SECONDARY,
    lineHeight: 21,
  },
  infoTextSecond: {
    fontSize: 14,
    color: TEXT_SECONDARY,
    lineHeight: 21,
    marginTop: 8,
  },
  emailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: BORDER,
  },
  emailLabel: { fontSize: 13, color: TEXT_SECONDARY, fontWeight: '600' },
  emailValue: { fontSize: 13, color: TEXT_PRIMARY, fontWeight: '600', flex: 1 },
  btnSignOut: {
    backgroundColor: '#2D1515',
    borderWidth: 1,
    borderColor: '#7F1D1D',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 40,
    alignItems: 'center',
    width: '100%',
  },
  btnPressed: { opacity: 0.7 },
  btnSignOutText: { color: '#FCA5A5', fontWeight: '700', fontSize: 15 },
});
