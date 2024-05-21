import * as Yup from 'yup';

import { TranslateType } from '@/core/providers/TranslationProvider';

export const loginSchema = (_t: TranslateType) =>
  Yup.object().shape({
    email: Yup.string()
      .email()
      .required(`${_t('email', 'email')} ${_t('is_required', 'is required')}`),
    password: Yup.string()
      .required(
        `${_t('password', 'Password')} ${_t('is_required', 'is required')}`
      )
      .min(
        6,
        _t(
          'password_must_be_at_least_6_characters',
          'Password must be at least 6 character'
        )
      ),
  });
