import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import RegisterHeader from '@/components/RegisterHeader';
import CustomInput from '@/components/CustomInput';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { auth, db } from '@/config/firebase';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

const passwordImage = require('@/assets/images/candadoTick.png');

export default function Step3Screen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!password || password.length < 8) {
      Alert.alert('Contraseña no válida', 'La contraseña debe tener al menos 8 caracteres.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    setLoading(true);
    try {
      const { firstName, lastName1, lastName2, email } = params as Record<string, string>;
      
      // 1. Crear usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Crear documento de usuario en Firestore respetando las reglas strictas
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: email,
        firstName: firstName,
        lastName1: lastName1,
        lastName2: lastName2 || '',
        photoURL: '',
        role: null,
        communityId: null,
        status: 'pendingCommunity',
        createdAt: serverTimestamp(),
        lastLoginAt: serverTimestamp()
      });

      // 3. Enviar correo de verificación
      await sendEmailVerification(user);

      // 4. Navegar a pantalla de verificación
      router.push('/register/verify');
    } catch (error: any) {
      console.error(error);
      Alert.alert('Error al registrarse', error.message);
    } finally {
      setLoading(false);
    }
  };

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
          <CustomInput icon="lock-closed-outline" placeholder="Contraseña" isPassword value={password} onChangeText={setPassword} />
          <CustomInput icon="lock-closed-outline" placeholder="Repetir contraseña" isPassword value={confirmPassword} onChangeText={setConfirmPassword} />
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
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.primaryButtonText}>Crear cuenta</Text>
          )}
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
