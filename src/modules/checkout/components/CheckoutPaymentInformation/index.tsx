import React from 'react';

import { FormikProps } from 'formik';

import { AdyenTypes } from '../Adyen/adyen.types';
import {
  CheckoutFormType,
  PaymentMethodsType,
} from '../../types/checkout.types';

import { StyledDiv } from './style';
import PaymentOptionList from './PaymentOptionList';

type Props = {
  formik: FormikProps<CheckoutFormType>;
  paymentList: Array<PaymentMethodsType>;
  adyenPaymentList: AdyenTypes;
};

const CheckoutPaymentInformation = ({
  formik,
  paymentList,
  adyenPaymentList,
}: Props) => {
  return (
    <StyledDiv className="payment-opt-wrap">
      <PaymentOptionList
        adyenPaymentList={adyenPaymentList}
        formik={formik}
        paymentList={paymentList}
      />
    </StyledDiv>
  );
};

export default CheckoutPaymentInformation;
