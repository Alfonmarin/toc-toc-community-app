import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInRight } from 'react-native-reanimated';

const logoSource = require('@/assets/images/logo.png');
const verifyImage = require('@/assets/images/sobreTick.png');

export default function VerifyScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} bounces={false}>
      <Animated.View style={styles.container} entering={FadeInRight.duration(400)}>
        
        {/* Header - Just Logo */}
        <View style={styles.header}>
          <View style={styles.topRightCircle} />
          <Image source={logoSource} style={styles.logo} contentFit="contain" />
        </View>

        <View style={styles.imageWrapper}>
          <View style={styles.imageBackground} />
          <Image source={verifyImage} style={styles.centerImage} contentFit="contain" />
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.dividerContainer}>
            <View style={styles.decorativeLine} />
            <Ionicons name="heart" size={16} color={Colors.light.lightGreenBackground} style={styles.heartIcon} />
            <View style={styles.decorativeLine} />
          </View>

          <Text style={styles.title}>Verifica tu correo</Text>
          <Text style={styles.subtitle}>
            Te hemos enviado un enlace de verificación a tu correo electrónico. Confirma tu cuenta para continuar.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.primaryButton} 
            activeOpacity={0.8}
            onPress={() => router.navigate('/welcome' as any)}
          >
            <Text style={styles.primaryButtonText}>He verificado mi correo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.8}>
            <Ionicons name="paper-plane-outline" size={20} color={Colors.light.primaryGreen} style={styles.buttonIcon} />
            <Text style={styles.secondaryButtonText}>Reenviar correo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkButton} activeOpacity={0.8}>
            <Text style={styles.linkButtonText}>Cambiar correo</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: Colors.light.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  topRightCircle: {
    position: 'absolute',
    top: -20,
    right: -40,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.light.lightGreenBackground,
    opacity: 0.7,
  },
  logo: {
    width: 140,
    height: 70,
  },
  imageWrapper: {
    alignItems: 'center',
    marginBottom: 32,
  },
  imageBackground: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: Colors.light.lightGreenBackground,
  },
  centerImage: {
    width: 120,
    height: 120,
    marginTop: 10,
  },
  contentContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  dividerContainer: {
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
    fontSize: 26,
    fontWeight: '700',
    color: '#2A364E',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: '#8A94A6',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 16,
  },
  buttonContainer: {
    marginTop: 'auto',
    gap: 16,
  },
  primaryButton: {
    backgroundColor: Colors.light.primaryGreen,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
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
  linkButton: {
    alignItems: 'center',
    marginTop: 8,
  },
  linkButtonText: {
    color: Colors.light.primaryGreen,
    fontSize: 14,
    fontWeight: '500',
  },
});
