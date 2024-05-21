import { ProfileUser } from '@/auth/types/user.types';

import { OrderSummaryPriceFormat } from '../types/order-summary.types';

export const getOrderSummaryDiscountPrice = (
  user: ProfileUser | null,
  priceFormat: Record<
    'formatted_final_price' | 'formatted_recommended_price',
    OrderSummaryPriceFormat | undefined
  >
) => {
  return priceFormat?.formatted_final_price?.discount_amount_formatted;
  //TODO Might need later
  // switch (true) {
  //   case user?.role?.slug === B2B_USER && user?.pricing === "recommended_price":
  //     return (
  //       priceFormat.formatted_recommended_price
  //         ?.recommended_discount_amount_formatted ||
  //       priceFormat.formatted_final_price?.discount_amount_formatted
  //     );

  //   default:
  //     return priceFormat.formatted_final_price?.discount_amount_formatted;
  // }
};

export const getOrderSummaryGrandTotalPrice = (
  user: ProfileUser | null,
  priceFormat: Record<
    'formatted_final_price' | 'formatted_recommended_price',
    OrderSummaryPriceFormat | undefined
  >
) => {
  return priceFormat?.formatted_final_price?.grand_total_formatted;

  //TODO Might need later
  // switch (true) {
  //   case user?.role?.slug === B2B_USER && user?.pricing === "recommended_price":
  //     return (
  //       priceFormat.formatted_recommended_price?.grand_total_formatted ||
  //       priceFormat.formatted_final_price?.grand_total_formatted
  //     );

  //   default:
  //     return priceFormat.formatted_final_price?.grand_total_formatted;
  // }
};

export const getOrderSummaryShippingPrice = (
  user: ProfileUser | null,
  priceFormat: Record<
    'formatted_final_price' | 'formatted_recommended_price',
    OrderSummaryPriceFormat | undefined
  >
) => {
  return priceFormat?.formatted_final_price?.shipping_inc_tax_formatted;
  //TODO: Might need later
  // switch (true) {
  //   case user?.role?.slug === B2B_USER && user?.pricing === "recommended_price":
  //     return (
  //       priceFormat.formatted_recommended_price?.shipping_inc_tax_formatted ||
  //       priceFormat.formatted_final_price?.shipping_inc_tax_formatted
  //     );

  //   default:
  //     return priceFormat.formatted_final_price?.shipping_inc_tax_formatted;
  // }
};

export const getOrderSummarySubTotalPrice = (
  user: ProfileUser | null,
  priceFormat: Record<
    'formatted_final_price' | 'formatted_recommended_price',
    OrderSummaryPriceFormat | undefined
  >
) => {
  return priceFormat?.formatted_final_price?.sub_total_inc_tax_formatted;
  //TODO Might need later
  // switch (true) {
  //   case user?.role?.slug === B2B_USER && user?.pricing === "recommended_price":
  //     return (
  //       priceFormat.formatted_recommended_price?.sub_total_inc_tax_formatted ||
  //       priceFormat.formatted_final_price?.sub_total_inc_tax_formatted
  //     );

  //   default:
  //     return priceFormat.formatted_final_price?.sub_total_inc_tax_formatted;
  // }
};

export const getOrderSummaryTaxPrice = (
  user: ProfileUser | null,
  priceFormat: Record<
    'formatted_final_price' | 'formatted_recommended_price',
    OrderSummaryPriceFormat | undefined
  >
) => {
  return priceFormat?.formatted_final_price?.total_tax_amount_formatted;
  //TODO Might need later
  // switch (true) {
  //   case user?.role?.slug === B2B_USER && user?.pricing === "recommended_price":
  //     return (
  //       priceFormat.formatted_recommended_price?.total_tax_amount_formatted ||
  //       priceFormat.formatted_final_price?.total_tax_amount_formatted
  //     );

  //   default:
  //     return priceFormat.formatted_final_price?.total_tax_amount_formatted;
  // }
};
