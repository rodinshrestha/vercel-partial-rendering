import { fontMediaQuery } from './mixin';
import { fontFamily } from './font';

export const typography = {
  h1: {
    fontSize: 48,
    lineHeight: 56,
    letterSpacing: 4.8,
    fontFamily: fontFamily.regular,
    responsive: [
      fontMediaQuery(1199, 40, 46, 4.8),
      fontMediaQuery(991, 32, 40, 3.2),
    ],
  },
  h2: {
    fontSize: 44,
    lineHeight: 50,
    letterSpacing: 4.4,
    fontFamily: fontFamily.regular,
    responsive: [fontMediaQuery(1199, 32, 38, 3.2)],
  },
  h3: {
    fontSize: 32,
    lineHeight: 38,
    letterSpacing: 3.2,
    fontFamily: fontFamily.regular,
    responsive: [fontMediaQuery(1199, 24, 30, 2.4)],
  },
  h4: {
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: 2.8,
    fontFamily: fontFamily.regular,
    // responsive: [fontMediaQuery(1199, 22, 26, 2.2)],
  },
  h5: {
    fontSize: 24,
    lineHeight: 30,
    letterSpacing: 2,
    fontFamily: fontFamily.regular,
    // responsive: [fontMediaQuery(1199, 18, 24, 1.8)],
  },
  h6: {
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 1.8,
    fontFamily: fontFamily.regular,
    // responsive: [fontMediaQuery(1199, 16, 22, 1.6)],
  },

  p: {
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 1.4,
    fontFamily: fontFamily.regular,
  },

  small: {
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 1.2,
    fontFamily: fontFamily.regular,
    responsive: [fontMediaQuery(1199, 10, 16, 1)],
  },

  big: {
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 1.8,
    fontFamily: fontFamily.regular,
    responsive: [fontMediaQuery(1199, 16, 22, 1.6)],
  },
};
