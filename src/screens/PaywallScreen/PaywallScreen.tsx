import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RadioButton } from '../../components/RadioButton/RadioButton';
import { CardInput } from '../../components/CardInput/CardInput';
import { Button } from '../../components/Button/Button';
import { subscriptionService } from '../../services/subscriptionService';
import { CardErrors, RootStackParamList } from '../../types';
import { styles } from './PaywallScreen.styles';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Paywall'>;
  route: RouteProp<RootStackParamList, 'Paywall'>;
};

const EMAIL_REGEX = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

const formatCardNumber = (value: string): string => {
  const digits = value.replace(/\D/g, '').slice(0, 16);
  return digits.replace(/(.{4})/g, '$1 ').trim();
};

const formatExpiryDate = (value: string): string => {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length > 2) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return digits;
};

export const PaywallScreen: React.FC<Props> = ({ navigation, route }) => {
  const [selectedPlan, setSelectedPlan] = useState<'month' | 'year'>('month');
  const [email, setEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [showCvv, setShowCvv] = useState(false);
  const [errors, setErrors] = useState<CardErrors>({});

  const validate = (): boolean => {
    const newErrors: CardErrors = {};

    if (!EMAIL_REGEX.test(email.trim())) {
      newErrors.email = 'Введите корректный email';
    }

    if (cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'Введите корректный номер карты (16 цифр)';
    }

    const expiryMatch = expiryDate.match(/^(\d{2})\/(\d{2})$/);
    if (!expiryMatch) {
      newErrors.expiryDate = 'Введите дату в формате ММ/ГГ';
    } else {
      const month = parseInt(expiryMatch[1], 10);
      const year = 2000 + parseInt(expiryMatch[2], 10);
      const now = new Date();
      if (month < 1 || month > 12) {
        newErrors.expiryDate = 'Неверный месяц';
      } else if (
        year < now.getFullYear() ||
        (year === now.getFullYear() && month < now.getMonth() + 1)
      ) {
        newErrors.expiryDate = 'Карта просрочена';
      }
    }

    if (!/^\d{3}$/.test(cvv)) {
      newErrors.cvv = 'Введите 3 цифры CVV';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubscribe = async () => {
    if (!validate()) return;
    await subscriptionService.saveSubscription(selectedPlan, email.trim());
    route.params?.onSubscribe?.();
    navigation.goBack();
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.content}>
        <View style={styles.plansSection}>
          <Text style={styles.sectionTitle}>Выберите тариф</Text>
          <RadioButton
            selected={selectedPlan === 'month'}
            label="Подписка на месяц"
            onPress={() => setSelectedPlan('month')}
          />
          <RadioButton
            selected={selectedPlan === 'year'}
            label="Подписка на год — скидка 30%"
            onPress={() => setSelectedPlan('year')}
          />
        </View>

        <View style={styles.cardSection}>
          <Text style={styles.sectionTitle}>Данные карты</Text>
          <View style={styles.card}>
            <CardInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="example@mail.com"
              keyboardType="default"
              error={errors.email}
            />

            <CardInput
              label="Номер карты"
              value={cardNumber}
              onChangeText={(t) => setCardNumber(formatCardNumber(t))}
              placeholder="1234 5678 9012 3456"
              keyboardType="numeric"
              maxLength={19}
              error={errors.cardNumber}
            />

            <View style={styles.rowFields}>
              <View style={styles.fieldFlex}>
                <CardInput
                  label="Срок действия"
                  value={expiryDate}
                  onChangeText={(t) => setExpiryDate(formatExpiryDate(t))}
                  placeholder="ММ/ГГ"
                  keyboardType="numeric"
                  maxLength={5}
                  error={errors.expiryDate}
                />
              </View>
              <View style={styles.fieldFlex}>
                <CardInput
                  label="CVV"
                  value={cvv}
                  onChangeText={(t) => setCvv(t.replace(/\D/g, '').slice(0, 3))}
                  placeholder="123"
                  keyboardType="numeric"
                  maxLength={3}
                  secureTextEntry
                  showToggle
                  showValue={showCvv}
                  onToggleShow={() => setShowCvv((v) => !v)}
                  error={errors.cvv}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button label="Оформить подписку" onPress={handleSubscribe} variant="dark" />
        </View>
      </View>
    </ScrollView>
  );
};
