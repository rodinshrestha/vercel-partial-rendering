export const updateToCartResponseConversion = (
  id: string,
  qty: number
): Array<{
  product_id: string;
  action: 'create' | 'update';
  qty: number;
}> => {
  return [{ product_id: id, qty: Number(qty), action: 'update' }];
};

export const deleteCartResponseConversion = (id: string) => {
  return [{ cart_item_id: id, action: 'delete' }];
};
