import * as Yup from 'yup';

import { TranslateType } from '@/core/providers/TranslationProvider';

export const schemaValidation = (_t: TranslateType) =>
  Yup.object().shape({
    first_name: Yup.string().required(
      `${_t('first_name', 'First Name')} ${_t('is_required', 'is required')}`
    ),
    last_name: Yup.string().required(
      `${_t('last_name', 'Last Name')} ${_t('is_required', 'is required')}`
    ),
    phone: Yup.string().required(
      `${_t('phone_number', 'Phone Number')} ${_t('is_required', 'is required')}`
    ),
    email: Yup.string()
      .email(_t('invalid_email_address', 'Invalid email address'))
      .required(`${_t('email', 'Email')} ${_t('is_required', 'is required')}`),
  });
