import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import CustomInput from '@/components/CustomInput';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { auth } from '@/config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const logoSource = require('@/assets/images/logo.png');

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Por favor, rellena todos los campos.');
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      // Temporary redirection until the actual tab layout or invite code screen is built
      router.replace('/(tabs)' as any);
    } catch (error: any) {
      console.error(error);
      Alert.alert('Error de inicio de sesión', 'Las credenciales son incorrectas o no existe el usuario.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} bounces={false}>
      <Animated.View style={styles.container} entering={FadeInRight.duration(400)}>
        
        {/* Decorative circles */}
        <View style={styles.topRightCircle} />
        <View style={styles.bottomLeftCircle} />

        {/* Header */}
        <View style={styles.header}>
          <Image source={logoSource} style={styles.logo} contentFit="contain" />
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.dividerContainer}>
            <View style={styles.decorativeLine} />
            <Ionicons name="heart" size={16} color={Colors.light.lightGreenBackground} style={styles.heartIcon} />
            <View style={styles.decorativeLine} />
          </View>

          <Text style={styles.title}>Inicia sesión</Text>
          <Text style={styles.subtitle}>
            Accede a tu comunidad digital.
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
          <CustomInput 
            icon="lock-closed-outline" 
            placeholder="Contraseña" 
            isPassword
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.forgotPasswordLink} onPress={() => router.push('/forgot-password' as any)}>
            <Text style={styles.forgotPasswordText}>Olvidé mi contraseña</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.primaryButton} 
            activeOpacity={0.8}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Ionicons name="lock-closed" size={20} color="#fff" style={styles.buttonIcon} />
                <Text style={styles.primaryButtonText}>Entrar</Text>
              </>
            )}
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.decorativeLine} />
            <Ionicons name="heart" size={16} color={Colors.light.lightGreenBackground} style={styles.heartIcon} />
            <View style={styles.decorativeLine} />
          </View>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>¿Aún no tienes cuenta? </Text>
            <TouchableOpacity onPress={() => router.push('/register/step1' as any)}>
              <Text style={styles.registerLink}>Crear cuenta</Text>
            </TouchableOpacity>
          </View>
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
    justifyContent: 'center',
  },
  topRightCircle: {
    position: 'absolute',
    top: -20,
    right: -40,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.light.lightGreenBackground,
    opacity: 0.7,
  },
  bottomLeftCircle: {
    position: 'absolute',
    bottom: -40,
    left: -40,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: Colors.light.lightGreenBackground,
    opacity: 0.7,
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  logo: {
    width: 160,
    height: 80,
  },
  contentContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    justifyContent: 'center',
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
    fontSize: 15,
    color: '#8A94A6',
    textAlign: 'center',
  },
  formContainer: {
    marginBottom: 32,
  },
  forgotPasswordLink: {
    alignSelf: 'flex-end',
    marginTop: 8,
    marginBottom: 8,
  },
  forgotPasswordText: {
    color: Colors.light.primaryGreen,
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    marginTop: 10,
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
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    color: '#2A364E',
    fontSize: 14,
  },
  registerLink: {
    color: Colors.light.primaryGreen,
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
