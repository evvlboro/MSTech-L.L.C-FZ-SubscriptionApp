import AsyncStorage from '@react-native-async-storage/async-storage';
import { Subscription } from '../types';

const SUBSCRIPTION_KEY = '@subscription_status';

async function getSubscription(): Promise<Subscription | null> {
  try {
    const data = await AsyncStorage.getItem(SUBSCRIPTION_KEY);
    if (!data) return null;
    return JSON.parse(data) as Subscription;
  } catch (error) {
    console.error('getSubscription error:', error);
    return null;
  }
}

async function saveSubscription(type: 'month' | 'year', email: string): Promise<Subscription> {
  try {
    const subscription: Subscription = {
      isActive: true,
      type,
      date: new Date().toISOString(),
      email,
    };
    await AsyncStorage.setItem(SUBSCRIPTION_KEY, JSON.stringify(subscription));
    return subscription;
  } catch (error) {
    console.error('saveSubscription error:', error);
    throw error;
  }
}

async function cancelSubscription(): Promise<void> {
  try {
    await AsyncStorage.removeItem(SUBSCRIPTION_KEY);
  } catch (error) {
    console.error('cancelSubscription error:', error);
    throw error;
  }
}

export const subscriptionService = {
  getSubscription,
  saveSubscription,
  cancelSubscription,
};
