export type OfferType = {
  name: string;
  image_url: string | null;
  description: string;
  coupon_code: string;
  redeemed: boolean;

  /** Created at date */
  created_at: string;
};
