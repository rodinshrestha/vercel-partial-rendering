import React from "react";

import { CheckoutContext } from "../providers/CheckoutProviders";

const useCheckout = () => React.useContext(CheckoutContext);
export default useCheckout;
