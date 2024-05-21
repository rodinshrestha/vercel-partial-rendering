import * as Yup from 'yup';

import { TranslateType } from '@/core/providers/TranslationProvider';

export const forgotPasswordSchema = (_t: TranslateType) =>
  Yup.object().shape({
    email: Yup.string()
      .email()
      .required(`${_t('email_is_required', 'Email is Required')}`),
  });
