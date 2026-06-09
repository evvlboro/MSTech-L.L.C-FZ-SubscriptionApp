import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { styles } from './RadioButton.styles';

interface RadioButtonProps {
  selected: boolean;
  label: string;
  onPress: () => void;
}

export const RadioButton: React.FC<RadioButtonProps> = ({ selected, label, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.container, selected ? styles.containerActive : styles.containerInactive]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={[styles.outerCircle, selected ? styles.outerCircleActive : styles.outerCircleInactive]}>
        {selected && <View style={styles.innerCircle} />}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};
