import {
  CheckoutShippingFormType,
  CountriesTypes,
} from '../types/checkout.types';

export const getCountryCode = (
  countryList: Array<CountriesTypes>,
  cartInfo: CheckoutShippingFormType | null,
  country: string | null
) => {
  const countryCode =
    (countryList?.length > 1 &&
      cartInfo &&
      countryList.some((item) => item.iso_2_code === cartInfo.country_code) &&
      cartInfo.country_code) ||
    country;

  return countryCode;
};
