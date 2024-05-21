export type AdyenTypes = {
  paymentMethods: Array<any>;
};

export type AdyenDataType = {
  /** Client to initalize adyen data */
  client_key: string;

  /** Adyen merchant account id */
  merchantAccount: string;

  /** Adyen test environment*/
  environment: string;

  /** Adyen amount */
  amount: {
    value: number;
    currency: string;
  };

  /**Adyen country code */
  countryCode: string;

  /** Adyen unique identifier */
  id: string;

  /** Adyen session data */
  sessionData: string;
};

export type AdyenDropInType = {
  /** Updates the adyen drop in widget/iframe */
  update: () => void;
};
