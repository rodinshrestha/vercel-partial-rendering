export const shouldFetchPaymentDetails = (
  searchParams: Record<string, string>
) => {
  if ('redirectResult' in searchParams && 'threeDSResult' in searchParams) {
    return true;
  }

  return false;
};
