export type NshiftType = {
  /** Agent final location */
  agent: string;

  /** Checkout id */
  deliveryCheckoutId: string;

  /** Delivery price */
  price: number;

  /** Selected agent */
  selectedOptionId: string;

  /** Delivery tax rate */
  taxRate: number;

  /** Selected option is valid or not */
  valid: boolean;

  /** Nshift agent option list */
  options: Array<unknown>;
};
