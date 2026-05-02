import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';

interface CustomInputProps extends TextInputProps {
  icon: keyof typeof Ionicons.glyphMap;
  isPassword?: boolean;
}

export default function CustomInput({ icon, isPassword, ...rest }: CustomInputProps) {
  const [isSecure, setIsSecure] = useState(isPassword);

  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={20} color={Colors.light.primaryGreen} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholderTextColor="#A0AABF"
        secureTextEntry={isSecure}
        {...rest}
      />
      {isPassword && (
        <TouchableOpacity onPress={() => setIsSecure(!isSecure)} style={styles.eyeIcon}>
          <Ionicons 
            name={isSecure ? "eye-outline" : "eye-off-outline"} 
            size={20} 
            color="#A0AABF" 
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.light.lightGreenBackground,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.light.text,
  },
  eyeIcon: {
    marginLeft: 12,
  },
});
