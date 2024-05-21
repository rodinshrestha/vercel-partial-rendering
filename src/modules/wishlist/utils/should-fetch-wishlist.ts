type ShouldFetchWishlist = {
  authToken: string;
};

export const shouldFetchWishlist = ({ authToken }: ShouldFetchWishlist) => {
  return Boolean(authToken);
};
