import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './CardInput.styles';
import { COLORS } from '../../constants/colors';

interface CardInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  placeholder?: string;
  keyboardType?: 'numeric' | 'default';
  maxLength?: number;
  secureTextEntry?: boolean;
  showToggle?: boolean;
  showValue?: boolean;
  onToggleShow?: () => void;
}

export const CardInput: React.FC<CardInputProps> = ({
  label,
  value,
  onChangeText,
  error,
  placeholder,
  keyboardType = 'default',
  maxLength,
  secureTextEntry,
  showToggle,
  showValue,
  onToggleShow,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={[
            styles.input,
            error ? styles.inputError : null,
            showToggle ? styles.inputWithIcon : null,
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textSecondary}
          keyboardType={keyboardType}
          maxLength={maxLength}
          secureTextEntry={secureTextEntry && !showValue}
          autoCorrect={false}
          autoCapitalize="none"
        />
        {showToggle && onToggleShow && (
          <TouchableOpacity style={styles.iconButton} onPress={onToggleShow} activeOpacity={0.7}>
            <Ionicons
              name={showValue ? 'eye-outline' : 'eye-off-outline'}
              size={22}
              color={COLORS.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};
