export const getActiveShippingAddress = (item: any, accordionKey: string) => {
  if (item?.id) {
    return accordionKey === item.id;
  }

  return accordionKey === item.identifier;
};
