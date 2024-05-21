import React from "react";

import { CartContext } from "../providers/CartProvider";

const useCart = () => React.useContext(CartContext);

export default useCart;
