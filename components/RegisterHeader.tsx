import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Colors } from '@/constants/theme';

const logoSource = require('@/assets/images/logo.png');

interface RegisterHeaderProps {
  step: number;
}

export default function RegisterHeader({ step }: RegisterHeaderProps) {
  return (
    <View style={styles.container}>
      <Image source={logoSource} style={styles.logo} contentFit="contain" />
      <Text style={styles.stepText}>Paso {step} de 3</Text>
      
      <View style={styles.progressContainer}>
        {/* Step 1 */}
        <View style={[styles.dot, step >= 1 ? styles.dotActive : styles.dotInactive]} />
        <View style={[styles.line, step >= 2 ? styles.lineActive : styles.lineInactive]} />
        
        {/* Step 2 */}
        <View style={[styles.dot, step >= 2 ? styles.dotActive : styles.dotInactive]} />
        <View style={[styles.line, step >= 3 ? styles.lineActive : styles.lineInactive]} />
        
        {/* Step 3 */}
        <View style={[styles.dot, step >= 3 ? styles.dotActive : styles.dotInactive]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  logo: {
    width: 140,
    height: 70,
  },
  stepText: {
    marginTop: 16,
    fontSize: 14,
    color: '#8A94A6',
    fontWeight: '500',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    width: 200,
    justifyContent: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  dotActive: {
    backgroundColor: Colors.light.primaryGreen,
  },
  dotInactive: {
    backgroundColor: Colors.light.lightGreenBackground,
  },
  line: {
    height: 2,
    flex: 1,
  },
  lineActive: {
    backgroundColor: Colors.light.primaryGreen,
  },
  lineInactive: {
    backgroundColor: Colors.light.lightGreenBackground,
  },
});
