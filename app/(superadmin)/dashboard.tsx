import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { useRouter } from 'expo-router';

const logoSource = require('@/assets/images/logo.png');

const MOCK_COMMUNITIES = [
  { id: '1', name: 'Residencial Montepinar', location: 'Calle Montepinar 24, Madrid', status: 'Activa' },
  { id: '2', name: 'Edificio Sol', location: 'Av. del Sol 18, Valencia', status: 'Activa' },
  { id: '3', name: 'Comunidad Alameda', location: 'Paseo Alameda 7, Sevilla', status: 'Activa' },
  { id: '4', name: 'Torre Norte', location: 'Calle Norte 45, Zaragoza', status: 'Activa' },
];

export default function SuperAdminDashboard() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Decorative background circles */}
      <View style={styles.topRightCircle} />
      <View style={styles.bottomLeftCircle} />

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <Animated.View style={styles.header} entering={FadeIn.duration(600)}>
          <Image source={logoSource} style={styles.logo} contentFit="contain" />
          <View style={styles.badgeContainer}>
            <Ionicons name="shield-checkmark" size={14} color={Colors.light.primaryGreen} />
            <Text style={styles.badgeText}>SuperAdmin</Text>
          </View>
        </Animated.View>

        {/* Title Section */}
        <Animated.View style={styles.titleSection} entering={FadeInDown.delay(100).duration(500)}>
          <Text style={styles.title}>Panel SuperAdmin</Text>
          <Text style={styles.subtitle}>Gestiona comunidades y accesos.</Text>
        </Animated.View>

        {/* Action Buttons */}
        <Animated.View style={styles.actionsContainer} entering={FadeInDown.delay(200).duration(500)}>
          <TouchableOpacity style={styles.actionCard} activeOpacity={0.8}>
            <View style={styles.actionIconContainer}>
              <Ionicons name="business-outline" size={40} color={Colors.light.primaryGreen} />
            </View>
            <View style={styles.actionTextRow}>
              <Text style={styles.actionText}>Crear comunidad</Text>
              <Ionicons name="chevron-forward" size={16} color={Colors.light.primaryGreen} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard} activeOpacity={0.8}>
            <View style={styles.actionIconContainer}>
              <Ionicons name="key-outline" size={40} color={Colors.light.primaryGreen} />
            </View>
            <View style={styles.actionTextRow}>
              <Text style={styles.actionText}>Crear código admin</Text>
              <Ionicons name="chevron-forward" size={16} color={Colors.light.primaryGreen} />
            </View>
          </TouchableOpacity>
        </Animated.View>

        {/* Communities List */}
        <View style={styles.listSection}>
          <Animated.View entering={FadeInDown.delay(300).duration(500)}>
            <Text style={styles.listTitle}>Comunidades</Text>
            <Text style={styles.listSubtitle}>Pulsa una comunidad para ver acciones.</Text>
          </Animated.View>

          <View style={styles.listContainer}>
            {MOCK_COMMUNITIES.map((community, index) => (
              <Animated.View key={community.id} entering={FadeInDown.delay(300 + (index * 100)).duration(400)}>
                <TouchableOpacity style={styles.communityCard} activeOpacity={0.7}>
                  <View style={styles.communityIconContainer}>
                    <Ionicons name="business" size={24} color={Colors.light.primaryGreen} />
                  </View>
                  <View style={styles.communityInfo}>
                    <Text style={styles.communityName}>{community.name}</Text>
                    <Text style={styles.communityLocation}>{community.location}</Text>
                  </View>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>{community.status}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#C4C4C4" />
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </View>

        {/* Bottom Decorative Line */}
        <Animated.View style={styles.dividerContainer} entering={FadeIn.delay(800).duration(500)}>
          <View style={styles.decorativeLine} />
          <Ionicons name="heart" size={16} color={Colors.light.lightGreenBackground} style={styles.heartIcon} />
          <View style={styles.decorativeLine} />
        </Animated.View>
        
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  topRightCircle: {
    position: 'absolute',
    top: -30,
    right: -40,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.light.lightGreenBackground,
    opacity: 0.6,
  },
  bottomLeftCircle: {
    position: 'absolute',
    bottom: -60,
    left: -40,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: Colors.light.lightGreenBackground,
    opacity: 0.6,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 160,
    height: 60,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 12,
  },
  badgeText: {
    color: Colors.light.primaryGreen,
    fontWeight: '600',
    fontSize: 12,
    marginLeft: 6,
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#2A364E',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#8A94A6',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  actionCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    alignItems: 'center',
  },
  actionIconContainer: {
    marginBottom: 20,
    height: 60,
    justifyContent: 'center',
  },
  actionTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  actionText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.light.primaryGreen,
    flex: 1,
  },
  listSection: {
    flex: 1,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2A364E',
    marginBottom: 4,
  },
  listSubtitle: {
    fontSize: 14,
    color: '#8A94A6',
    marginBottom: 16,
  },
  listContainer: {
    gap: 12,
  },
  communityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#F5F5F5',
  },
  communityIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.light.lightGreenBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  communityInfo: {
    flex: 1,
  },
  communityName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2A364E',
    marginBottom: 2,
  },
  communityLocation: {
    fontSize: 12,
    color: '#8A94A6',
  },
  statusBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.light.primaryGreen,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
  },
  decorativeLine: {
    height: 2,
    width: 20,
    backgroundColor: Colors.light.lightGreenBackground,
    marginHorizontal: 8,
  },
  heartIcon: {
    marginHorizontal: 4,
  },
});
