import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import RegisterHeader from '@/components/RegisterHeader';
import CustomInput from '@/components/CustomInput';
import Animated, { FadeInRight } from 'react-native-reanimated';

const passwordImage = require('@/assets/images/candadoTick.png');

export default function Step3Screen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} bounces={false}>
      <Animated.View style={styles.container} entering={FadeInRight.duration(400)}>
        <RegisterHeader step={3} />
        
        <View style={styles.imageWrapper}>
          <View style={styles.imageBackground} />
          <Image source={passwordImage} style={styles.centerImage} contentFit="contain" />
        </View>

        <Text style={styles.title}>Crea una contraseña</Text>
        <Text style={styles.subtitle}>
          Elige una contraseña segura para proteger el acceso a tu comunidad.
        </Text>

        <View style={styles.formContainer}>
          <CustomInput icon="lock-closed-outline" placeholder="Contraseña" isPassword />
          <CustomInput icon="lock-closed-outline" placeholder="Repetir contraseña" isPassword />
        </View>

        <View style={styles.securityBox}>
          <Ionicons name="shield-checkmark-outline" size={24} color={Colors.light.primaryGreen} style={styles.securityIcon} />
          <Text style={styles.securityText}>
            <Text style={styles.securityTextBold}>Mínimo 8 caracteres.</Text> Usa letras y números para mayor seguridad.
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.primaryButton} 
          activeOpacity={0.8}
          onPress={() => router.push('/register/verify' as any)}
        >
          <Text style={styles.primaryButtonText}>Crear cuenta</Text>
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
  securityBox: {
    flexDirection: 'row',
    backgroundColor: Colors.light.lightGreenBackground,
    padding: 16,
    borderRadius: 12,
    marginBottom: 32,
    alignItems: 'center',
  },
  securityIcon: {
    marginRight: 12,
  },
  securityText: {
    flex: 1,
    fontSize: 13,
    color: '#2A364E',
    lineHeight: 18,
  },
  securityTextBold: {
    fontWeight: '700',
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
});
