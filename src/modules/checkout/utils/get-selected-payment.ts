import { AdyenTypes } from '../components/Adyen/adyen.types';
import { ADYEN } from '../constant/payment-mode.constant';
import { PaymentMethodsType } from '../types/checkout.types';

export const getSelectedPayment = (
  adyenPaymentList: AdyenTypes,
  paymentList: Array<PaymentMethodsType>
) => {
  const isAdyeninList = paymentList.some((x) => x.identifier === ADYEN);

  return isAdyeninList && adyenPaymentList.paymentMethods.length ? ADYEN : '';
};
