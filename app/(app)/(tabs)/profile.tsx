import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function ProfileScreen() {
  const { appUser, firebaseUser, signOut } = useAuth();
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut();
  };

  const initials = (appUser?.displayName ?? firebaseUser?.email ?? '?')
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <View style={styles.root}>
      <View style={styles.blobTop} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.pageTitle}>Mi perfil</Text>

        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarInitials}>{initials}</Text>
          </View>
          <Text style={styles.displayName}>
            {appUser?.displayName || 'Usuario'}
          </Text>
          <Text style={styles.emailText}>{appUser?.email || firebaseUser?.email}</Text>
        </View>

        {/* Info cards */}
        <View style={styles.infoSection}>
          <InfoRow label="Rol" value={appUser?.role ?? '—'} />
          <InfoRow label="Comunidad" value={appUser?.communityId ?? '—'} />
          <InfoRow label="Estado" value={appUser?.status ?? '—'} valueColor="#10B981" />
          <InfoRow label="UID" value={appUser?.uid ?? '—'} mono />
        </View>

        <Pressable
          style={({ pressed }) => [styles.btnSignOut, pressed && styles.btnPressed]}
          onPress={handleSignOut}
          disabled={signingOut}
          accessibilityLabel="Cerrar sesión"
        >
          {signingOut ? (
            <ActivityIndicator color="#FCA5A5" />
          ) : (
            <Text style={styles.btnSignOutText}>Cerrar sesión</Text>
          )}
        </Pressable>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

function InfoRow({
  label,
  value,
  mono,
  valueColor,
}: {
  label: string;
  value: string;
  mono?: boolean;
  valueColor?: string;
}) {
  return (
    <View style={infoStyles.row}>
      <Text style={infoStyles.label}>{label}</Text>
      <Text
        style={[
          infoStyles.value,
          mono && infoStyles.mono,
          valueColor ? { color: valueColor } : null,
        ]}
        numberOfLines={1}
        ellipsizeMode="middle"
      >
        {value}
      </Text>
    </View>
  );
}

const PURPLE = '#5B4FE8';
const DARK_BG = '#0F0E1A';
const CARD_BG = '#1A1930';
const BORDER = '#2D2B4E';
const TEXT_PRIMARY = '#F0EEFF';
const TEXT_SECONDARY = '#9891C4';

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: DARK_BG },
  blobTop: {
    position: 'absolute',
    top: -80,
    right: -60,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: '#3B31B0',
    opacity: 0.25,
  },
  scroll: { paddingHorizontal: 24, paddingTop: 60 },
  pageTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: TEXT_PRIMARY,
    marginBottom: 32,
    letterSpacing: -0.5,
  },
  avatarSection: { alignItems: 'center', marginBottom: 36 },
  avatarCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: PURPLE,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    shadowColor: PURPLE,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  avatarInitials: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
  },
  displayName: {
    fontSize: 22,
    fontWeight: '700',
    color: TEXT_PRIMARY,
    marginBottom: 4,
  },
  emailText: { fontSize: 13, color: TEXT_SECONDARY },
  infoSection: {
    backgroundColor: CARD_BG,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: BORDER,
    overflow: 'hidden',
    marginBottom: 28,
  },
  btnSignOut: {
    borderWidth: 1,
    borderColor: '#3B1A1A',
    backgroundColor: '#1A0F0F',
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
  },
  btnPressed: { opacity: 0.7 },
  btnSignOutText: { color: '#FCA5A5', fontWeight: '700', fontSize: 15 },
  bottomSpacer: { height: 90 },
});

const infoStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: TEXT_SECONDARY,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    flex: 1,
  },
  value: {
    fontSize: 14,
    color: TEXT_PRIMARY,
    fontWeight: '600',
    flex: 2,
    textAlign: 'right',
  },
  mono: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: '#9891C4',
  },
});
