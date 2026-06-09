import { StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZES } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: 12,
    borderWidth: 2,
    gap: SPACING.sm,
  },
  containerActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  containerInactive: {
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  outerCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerCircleActive: {
    borderColor: COLORS.primary,
  },
  outerCircleInactive: {
    borderColor: COLORS.border,
  },
  innerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
  },
  label: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    fontWeight: '500',
    flex: 1,
  },
});
