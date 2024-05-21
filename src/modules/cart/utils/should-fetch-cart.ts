type ShouldFetchCart = {
  cartToken: string;
  authToken: string;
};

/**
* B2C
  (guest) -> should have x-cart
  (customer) -> should have authToken
*/
export const shouldFetchCart = ({ cartToken, authToken }: ShouldFetchCart) => {
  return Boolean(cartToken || authToken);
};
