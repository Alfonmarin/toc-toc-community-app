import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useRouter } from 'expo-router';

const logoSource = require('@/assets/images/logo.png');

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <Animated.View style={styles.container} entering={FadeIn.duration(800)}>
      {/* Decorative background circles */}
      <View style={styles.topRightCircle} />
      <View style={styles.bottomLeftCircle} />
      
      <View style={styles.logoContainer}>
        <Image source={logoSource} style={styles.logo} contentFit="contain" />
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.decorativeLine} />
          <Ionicons name="heart" size={16} color={Colors.light.lightGreenBackground} style={styles.heartIcon} />
          <View style={styles.decorativeLine} />
        </View>

        <Text style={styles.title}>Bienvenido</Text>
        <Text style={styles.subtitle}>Conecta con tu comunidad.</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.primaryButton} 
          activeOpacity={0.8}
          onPress={() => router.push('/login' as any)}
        >
          <Ionicons name="lock-closed-outline" size={20} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.primaryButtonText}>Iniciar sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryButton} 
          activeOpacity={0.8}
          onPress={() => router.push('/register/step1' as any)}
        >
          <Ionicons name="person-outline" size={20} color={Colors.light.primaryGreen} style={styles.buttonIcon} />
          <Text style={styles.secondaryButtonText}>Crear cuenta</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    justifyContent: 'space-between',
    paddingVertical: 60,
    paddingHorizontal: 24,
  },
  topRightCircle: {
    position: 'absolute',
    top: 100,
    right: -40,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.light.lightGreenBackground,
    opacity: 0.7,
  },
  bottomLeftCircle: {
    position: 'absolute',
    bottom: -50,
    left: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: Colors.light.lightGreenBackground,
    opacity: 0.7,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  logo: {
    width: 320,
    height: 180,
    zIndex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
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
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2A364E',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#8A94A6',
  },
  buttonContainer: {
    gap: 16,
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: Colors.light.primaryGreen,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.light.primaryGreen,
  },
  secondaryButtonText: {
    color: Colors.light.primaryGreen,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  buttonIcon: {
    marginRight: 4,
  },
});
