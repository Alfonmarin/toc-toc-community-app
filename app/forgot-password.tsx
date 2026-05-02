import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import CustomInput from '@/components/CustomInput';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { auth } from '@/config/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

const logoSource = require('@/assets/images/logo.png');
const lockImage = require('@/assets/images/candadoLlave.png');

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!email.trim() || !email.includes('@')) {
      Alert.alert('Error', 'Por favor, introduce un correo electrónico válido.');
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email.trim());
      Alert.alert(
        'Enlace enviado',
        'Revisa tu bandeja de entrada o spam. Te hemos enviado un enlace para restablecer tu contraseña.',
        [{ text: 'OK', onPress: () => router.back() }]
      );
    } catch (error: any) {
      console.error(error);
      Alert.alert('Error', 'No se pudo enviar el correo de recuperación. Verifica que la dirección es correcta.');
    } finally {
      setLoading(false);
    }
  };

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
          <Image source={lockImage} style={styles.centerImage} contentFit="contain" />
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.dividerContainer}>
            <View style={styles.decorativeLine} />
            <Ionicons name="heart" size={16} color={Colors.light.lightGreenBackground} style={styles.heartIcon} />
            <View style={styles.decorativeLine} />
          </View>

          <Text style={styles.title}>Recupera tu contraseña</Text>
          <Text style={styles.subtitle}>
            Introduce tu correo y te enviaremos un enlace para restablecerla.
          </Text>
        </View>

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

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.primaryButton} 
            activeOpacity={0.8}
            onPress={handleResetPassword}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Ionicons name="mail-outline" size={20} color="#fff" style={styles.buttonIcon} />
                <Text style={styles.primaryButtonText}>Enviar enlace</Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkButton} activeOpacity={0.8} onPress={() => router.back()}>
            <Text style={styles.linkButtonText}>Volver a iniciar sesión</Text>
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
    width: 100,
    height: 100,
    marginTop: 10,
  },
  contentContainer: {
    alignItems: 'center',
    marginBottom: 24,
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
    fontSize: 24,
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
  formContainer: {
    marginBottom: 24,
  },
  buttonContainer: {
    marginTop: 'auto',
    gap: 24,
  },
  primaryButton: {
    backgroundColor: Colors.light.primaryGreen,
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: 8,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  linkButton: {
    alignItems: 'center',
  },
  linkButtonText: {
    color: Colors.light.primaryGreen,
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
