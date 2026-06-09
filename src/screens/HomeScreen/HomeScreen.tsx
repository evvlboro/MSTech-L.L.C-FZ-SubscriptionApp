import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Modal,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { Button } from '../../components/Button/Button';
import { subscriptionService } from '../../services/subscriptionService';
import { Subscription, RootStackParamList } from '../../types';
import { styles } from './HomeScreen.styles';

const { width } = Dimensions.get('window');
const gifSize = width < 375 ? Math.min(width * 0.7, 250) : Math.min(width * 0.5, 350);

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [showModal, setShowModal] = useState(false);

  const loadSubscription = async () => {
    const data = await subscriptionService.getSubscription();
    setSubscription(data);
  };

  useFocusEffect(
    useCallback(() => {
      loadSubscription();
    }, [])
  );

  const handleCancelConfirm = async () => {
    await subscriptionService.cancelSubscription();
    setSubscription(null);
    setShowModal(false);
  };

  const planLabel = subscription?.type === 'year' ? 'на год' : 'на месяц';

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Главный экран</Text>

          <Image
            source={
              subscription?.isActive
                ? require('../../assets/subscribed.gif')
                : require('../../assets/not-subscribed.gif')
            }
            style={[styles.gif, { width: gifSize, height: gifSize }]}
            resizeMode="contain"
          />

          <View style={styles.statusBlock}>
            {subscription?.isActive ? (
              <>
                <Text style={[styles.statusText, styles.statusTextActive]}>
                  Подписка оформлена
                </Text>
                <Text style={styles.planText}>{planLabel}</Text>
                <Text style={styles.emailText}>{subscription.email}</Text>
              </>
            ) : (
              <Text style={[styles.statusText, styles.statusTextInactive]}>
                Подписка не оформлена
              </Text>
            )}
          </View>

          <View style={styles.buttonContainer}>
            {subscription?.isActive ? (
              <Button
                label="Отменить подписку"
                onPress={() => setShowModal(true)}
                variant="danger"
              />
            ) : (
              <Button
                label="Оформить подписку"
                onPress={() => navigation.navigate('Paywall')}
                variant="primary"
              />
            )}
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalText}>
              Вы точно хотите отменить подписку?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalBtn, styles.modalBtnNo]}
                onPress={() => setShowModal(false)}
                activeOpacity={0.8}
              >
                <Text style={styles.modalBtnNoText}>Нет</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, styles.modalBtnYes]}
                onPress={handleCancelConfirm}
                activeOpacity={0.8}
              >
                <Text style={styles.modalBtnYesText}>Да</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};
