export type PromotionsType = {
  /** Name of the promotion code */
  name: string;

  /** Promotion code */
  coupon_code: string;

  /** Details of promotion description */
  description: string;

  /** Image of promotions */
  image_url: string;

  /** Coupon applied or not flag */
  redeemed: boolean;

  /** Expired */
  expired: boolean;
};
