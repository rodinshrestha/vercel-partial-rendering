export type CheckoutFormType = {
  shipping: CheckoutShippingFormType;

  /** Shipping option */
  shipping_option: string;
};

export type CheckoutShippingFormType = {
  /** Form first name */
  first_name: string;

  /** Form last name */
  last_name: string;

  /** Form email */
  email: string;

  /** Form phone */
  phone: string;

  /** Form address 1 */
  address1: string;

  /** Form city name */
  city_name: string;

  /** Form postal code */
  postal_code: string;

  /** Form country code */
  country_code: string;
};

export type CartInfoType = Record<
  "shipping_addresses",
  CheckoutShippingFormType
> & {
  shipping_method: string;
  payment_method: string;
};

export type ShippingMethodType = {
  /** Shipping method name */
  name: string;

  /** Shipping Method identifier  */
  identifier: string;

  /** Shipping Method description */
  description: string;

  /** Shipping Method Price */
  price: string;

  /** Shipping threshold price */
  offline_shipping_threshold: string;
};

export type PaymentMethodsType = {
  /** Payment title */
  title: string;

  /** Payment Indetifier */
  identifier: string;

  /** Payment Logo */
  logo: string;
};

export type CountriesTypes = {
  /** Countries id */
  id: string;

  /** Countries ISO  2 code*/
  iso_2_code: string;

  /** Countries ISO  3 code*/
  iso_3_code: string;

  /** Counties Name */
  name: string;
};
