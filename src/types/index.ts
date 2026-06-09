export interface Subscription {
  isActive: boolean;
  type: 'month' | 'year';
  date: string;
  email: string;
}

export interface CardErrors {
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  email?: string;
}

export type RootStackParamList = {
  Onboarding: undefined;
  Home: undefined;
  Paywall: {
    onSubscribe?: () => void;
  };
};
