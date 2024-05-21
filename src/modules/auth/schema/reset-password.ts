import * as Yup from 'yup';

import { TranslateType } from '@/core/providers/TranslationProvider';

export const resetPasswordSchema = (_t: TranslateType) =>
  Yup.object().shape({
    newPassword: Yup.string()
      .required(_t('new_password_is_required', 'New Password is Required'))
      .min(
        6,
        _t('password_min_length', 'Password must be at Least 6 Character')
      ),
    confirmPassword: Yup.string()
      .required(
        _t('confirm_password_is_required', 'Confirm Password is required')
      )
      .min(
        6,
        _t('password_min_length', 'Password must be at Least 6 Character')
      )
      .oneOf(
        [Yup.ref('newPassword'), null],
        _t(
          'confirm_password_and_new_password_should_be_same',
          'Confirm password and new password should be same'
        )
      ),
  });
