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

const ROLE_LABELS: Record<string, string> = {
  admin: '👑 Administrador',
  vecino: '🏠 Vecino',
};

export default function HomeScreen() {
  const { appUser, signOut } = useAuth();
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut();
  };

  const greeting = getGreeting();

  return (
    <View style={styles.root}>
      {/* Blobs decorativos */}
      <View style={styles.blobTop} />
      <View style={styles.blobBottom} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.topBar}>
          <View style={styles.logoMini}>
            <Text style={styles.logoMiniText}>🏘️</Text>
          </View>
          <Text style={styles.appLabel}>Toc Toc</Text>
        </View>

        {/* Saludo */}
        <View style={styles.greetingSection}>
          <Text style={styles.greetingText}>{greeting},</Text>
          <Text style={styles.greetingName} numberOfLines={1}>
            {appUser?.displayName || 'Vecino'}
          </Text>
        </View>

        {/* Badge de rol */}
        <View style={styles.roleBadge}>
          <Text style={styles.roleBadgeText}>
            {ROLE_LABELS[appUser?.role ?? ''] ?? appUser?.role}
          </Text>
        </View>

        {/* Card de comunidad */}
        <View style={styles.communityCard}>
          <View style={styles.communityCardHeader}>
            <Text style={styles.communityCardIcon}>🏢</Text>
            <Text style={styles.communityCardLabel}>Tu comunidad</Text>
          </View>
          <Text style={styles.communityId}>{appUser?.communityId}</Text>
          <View style={styles.statusRow}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Acceso activo</Text>
          </View>
        </View>

        {/* Cuadrícula de accesos rápidos (placeholder para futuras secciones) */}
        <Text style={styles.sectionTitle}>Accesos rápidos</Text>
        <View style={styles.grid}>
          <QuickCard emoji="📢" label="Avisos" sublabel="Sin avisos nuevos" />
          <QuickCard emoji="🗓️" label="Eventos" sublabel="Próximamente" />
          <QuickCard emoji="🔧" label="Incidencias" sublabel="Próximamente" />
          <QuickCard emoji="💬" label="Foro" sublabel="Próximamente" />
        </View>

        {/* Cerrar sesión */}
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

// ─── Componente QuickCard ──────────────────────────────────────────────────────

function QuickCard({
  emoji,
  label,
  sublabel,
}: {
  emoji: string;
  label: string;
  sublabel: string;
}) {
  return (
    <Pressable
      style={({ pressed }) => [styles.quickCard, pressed && styles.quickCardPressed]}
      accessibilityLabel={label}
    >
      <Text style={styles.quickCardEmoji}>{emoji}</Text>
      <Text style={styles.quickCardLabel}>{label}</Text>
      <Text style={styles.quickCardSub}>{sublabel}</Text>
    </Pressable>
  );
}

// ─── Helper ───────────────────────────────────────────────────────────────────

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 13) return 'Buenos días';
  if (h < 21) return 'Buenas tardes';
  return 'Buenas noches';
}

// ─── Estilos ──────────────────────────────────────────────────────────────────

const PURPLE = '#5B4FE8';
const DARK_BG = '#0F0E1A';
const CARD_BG = '#1A1930';
const BORDER = '#2D2B4E';
const TEXT_PRIMARY = '#F0EEFF';
const TEXT_SECONDARY = '#9891C4';
const GREEN = '#10B981';

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: DARK_BG },
  blobTop: {
    position: 'absolute',
    top: -100,
    left: -60,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#3B31B0',
    opacity: 0.3,
  },
  blobBottom: {
    position: 'absolute',
    bottom: -120,
    right: -60,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: '#0D9488',
    opacity: 0.15,
  },
  scroll: {
    paddingHorizontal: 24,
    paddingTop: 60,
  },

  // Top bar
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 36,
  },
  logoMini: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: PURPLE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoMiniText: { fontSize: 18 },
  appLabel: {
    fontSize: 18,
    fontWeight: '800',
    color: TEXT_PRIMARY,
    letterSpacing: -0.3,
  },

  // Saludo
  greetingSection: { marginBottom: 8 },
  greetingText: {
    fontSize: 16,
    color: TEXT_SECONDARY,
    fontWeight: '500',
  },
  greetingName: {
    fontSize: 30,
    fontWeight: '800',
    color: TEXT_PRIMARY,
    letterSpacing: -0.5,
  },

  // Badge de rol
  roleBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#1E1B40',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: PURPLE,
    marginTop: 10,
    marginBottom: 28,
  },
  roleBadgeText: {
    color: '#A5A0FF',
    fontSize: 13,
    fontWeight: '600',
  },

  // Card comunidad
  communityCard: {
    backgroundColor: CARD_BG,
    borderRadius: 20,
    padding: 22,
    borderWidth: 1,
    borderColor: BORDER,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  communityCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  communityCardIcon: { fontSize: 20 },
  communityCardLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: TEXT_SECONDARY,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  communityId: {
    fontSize: 18,
    fontWeight: '700',
    color: TEXT_PRIMARY,
    marginBottom: 12,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: GREEN,
  },
  statusText: {
    fontSize: 13,
    color: GREEN,
    fontWeight: '600',
  },

  // Quick access grid
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: TEXT_PRIMARY,
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 36,
  },
  quickCard: {
    width: '47%',
    backgroundColor: CARD_BG,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: BORDER,
  },
  quickCardPressed: { opacity: 0.7, transform: [{ scale: 0.97 }] },
  quickCardEmoji: { fontSize: 26, marginBottom: 10 },
  quickCardLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: TEXT_PRIMARY,
    marginBottom: 4,
  },
  quickCardSub: {
    fontSize: 12,
    color: TEXT_SECONDARY,
  },

  // Sign out
  btnSignOut: {
    borderWidth: 1,
    borderColor: '#3B1A1A',
    backgroundColor: '#1A0F0F',
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
  },
  btnPressed: { opacity: 0.7 },
  btnSignOutText: {
    color: '#FCA5A5',
    fontWeight: '700',
    fontSize: 15,
  },

  bottomSpacer: { height: 90 },
});
