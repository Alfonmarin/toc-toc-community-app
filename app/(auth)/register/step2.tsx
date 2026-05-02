import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import RegisterHeader from '@/components/RegisterHeader';
import CustomInput from '@/components/CustomInput';
import Animated, { FadeInRight } from 'react-native-reanimated';

const emailImage = require('@/assets/images/sobreArroba.png');

export default function Step2Screen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [email, setEmail] = useState('');

  const handleNext = () => {
    if (!email.trim() || !email.includes('@')) return;
    router.push({
      pathname: '/register/step3',
      params: { ...params, email: email.toLowerCase().trim() }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} bounces={false}>
      <Animated.View style={styles.container} entering={FadeInRight.duration(400)}>
        <RegisterHeader step={2} />
        
        <View style={styles.imageWrapper}>
          <View style={styles.imageBackground} />
          <Image source={emailImage} style={styles.centerImage} contentFit="contain" />
        </View>

        <Text style={styles.title}>Tu correo electrónico</Text>
        <Text style={styles.subtitle}>
          Lo usaremos para iniciar sesión y enviarte información importante de tu cuenta.
        </Text>

        <View style={styles.formContainer}>
          <CustomInput 
            icon="mail-outline" 
            placeholder="Correo electrónico" 
            keyboardType="email-address" 
            autoCapitalize="none" 
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <TouchableOpacity 
          style={styles.primaryButton} 
          activeOpacity={0.8}
          onPress={handleNext}
        >
          <Text style={styles.primaryButtonText}>Continuar</Text>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>o continúa con</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
          <Ionicons name="logo-google" size={20} color="#DB4437" style={styles.socialIcon} />
          <Text style={styles.socialButtonText}>Continuar con Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
          <Ionicons name="logo-apple" size={20} color="#000" style={styles.socialIcon} />
          <Text style={styles.socialButtonText}>Continuar con Apple</Text>
        </TouchableOpacity>
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
  imageWrapper: {
    alignItems: 'center',
    marginBottom: 24,
  },
  imageBackground: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.light.lightGreenBackground,
  },
  centerImage: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2A364E',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#8A94A6',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 20,
    paddingHorizontal: 10,
  },
  formContainer: {
    marginBottom: 16,
  },
  primaryButton: {
    backgroundColor: Colors.light.primaryGreen,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  dividerText: {
    marginHorizontal: 12,
    color: '#8A94A6',
    fontSize: 14,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
  socialIcon: {
    marginRight: 12,
  },
  socialButtonText: {
    color: '#2A364E',
    fontSize: 16,
    fontWeight: '600',
  },
});
