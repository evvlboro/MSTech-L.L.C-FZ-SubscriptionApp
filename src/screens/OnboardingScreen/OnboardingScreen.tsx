import React from 'react';
import { View, Text, Image, ScrollView, Dimensions } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button } from '../../components/Button/Button';
import { RootStackParamList } from '../../types';
import { styles } from './OnboardingScreen.styles';

const { width } = Dimensions.get('window');
const gifSize = width < 375 ? Math.min(width * 0.7, 250) : Math.min(width * 0.5, 350);

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;
};

export const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.content}>
        <View style={styles.textBlock}>
          <Text style={styles.title}>Тестовое задание{'\n'}для компании MSTech-L.L.C-FZ</Text>
          <Text style={styles.subtitle}>Автор: Боровиков Евгений</Text>
        </View>

        <Image
          source={require('../../assets/sticker.gif')}
          style={[styles.gif, { width: gifSize, height: gifSize }]}
          resizeMode="contain"
        />

        <View style={styles.buttonContainer}>
          <Button label="Продолжить" onPress={() => navigation.navigate('Home')} />
        </View>
      </View>
    </ScrollView>
  );
};
