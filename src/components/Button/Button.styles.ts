import { StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZES } from '../../constants/colors';

export const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    maxWidth: 430,
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonDanger: {
    backgroundColor: COLORS.danger,
    shadowColor: COLORS.danger,
  },
  buttonDark: {
    backgroundColor: COLORS.black,
    shadowColor: COLORS.black,
  },
  buttonSecondary: {
    backgroundColor: COLORS.border,
    shadowOpacity: 0,
    elevation: 0,
  },
  label: {
    color: COLORS.white,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  labelSecondary: {
    color: COLORS.text,
  },
});
