import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import RegisterHeader from '@/components/RegisterHeader';
import CustomInput from '@/components/CustomInput';
import Animated, { FadeInRight } from 'react-native-reanimated';

const userImage = require('@/assets/images/user.png');

export default function Step1Screen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} bounces={false}>
      <Animated.View style={styles.container} entering={FadeInRight.duration(400)}>
        <RegisterHeader step={1} />
        
        <View style={styles.imageWrapper}>
          <View style={styles.imageBackground} />
          <Image source={userImage} style={styles.centerImage} contentFit="contain" />
        </View>

        <Text style={styles.title}>¿Cómo te llamas?</Text>
        <Text style={styles.subtitle}>
          Usaremos tu nombre para identificarte dentro de tu comunidad.
        </Text>

        <View style={styles.formContainer}>
          <CustomInput icon="person-outline" placeholder="Nombre" />
          <CustomInput icon="person-outline" placeholder="Primer apellido" />
          <CustomInput icon="person-outline" placeholder="Segundo apellido" />
        </View>

        <TouchableOpacity 
          style={styles.primaryButton} 
          activeOpacity={0.8}
          onPress={() => router.push('/register/step2' as any)}
        >
          <Text style={styles.primaryButtonText}>Siguiente {'>'}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.loginLink} 
          onPress={() => router.navigate('/welcome' as any)}
        >
          <Text style={styles.loginLinkText}>
            ¿Ya tienes cuenta? <Text style={styles.loginLinkTextBold}>Iniciar sesión</Text>
          </Text>
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
    marginBottom: 24,
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
  loginLink: {
    alignItems: 'center',
  },
  loginLinkText: {
    color: '#8A94A6',
    fontSize: 14,
  },
  loginLinkTextBold: {
    color: Colors.light.primaryGreen,
    fontWeight: '600',
  },
});
