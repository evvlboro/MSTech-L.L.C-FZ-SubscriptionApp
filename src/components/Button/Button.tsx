import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { styles } from './Button.styles';

type ButtonVariant = 'primary' | 'danger' | 'dark' | 'secondary';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
}

export const Button: React.FC<ButtonProps> = ({ label, onPress, variant = 'primary' }) => {
  const buttonStyle = [
    styles.button,
    variant === 'danger' && styles.buttonDanger,
    variant === 'dark' && styles.buttonDark,
    variant === 'secondary' && styles.buttonSecondary,
  ];

  const labelStyle = [
    styles.label,
    variant === 'secondary' && styles.labelSecondary,
  ];

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={buttonStyle} onPress={onPress} activeOpacity={0.8}>
        <Text style={labelStyle}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};
