import { StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZES } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xl,
    gap: SPACING.xl,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  plansSection: {
    gap: SPACING.sm,
  },
  cardSection: {
    gap: SPACING.sm,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: SPACING.lg,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    gap: SPACING.md,
  },
  rowFields: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  fieldFlex: {
    flex: 1,
  },
  buttonContainer: {
    width: '100%',
  },
});
