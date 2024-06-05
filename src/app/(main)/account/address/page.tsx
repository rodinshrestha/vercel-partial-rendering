import React from "react";

import Address from "@/account/components/Address";
import { makeHeaders } from "@/core/utils/header";
import { getAddresses } from "@/account/services/account-service";
import { getResolver } from "@/core/services/resolver-services";
import { getCountryList } from "@/checkout/services/checkout-service";

const Page = async () => {
  const headers = makeHeaders();

  const { data: resolver } = await getResolver(headers);

  const [{ data }, { data: countries }] = await Promise.all([
    getAddresses(headers, {
      channel: resolver.channel,
    }),
    getCountryList(headers),
  ]);

  const shippingAddress = data.find((x) => x.default_shipping_address);
  const billingAddress = shippingAddress?.default_billing_address
    ? shippingAddress
    : data.find((x) => x.default_billing_address);

  const isSame = shippingAddress?.id === billingAddress?.id;

  return (
    <Address
      shipping={shippingAddress || null}
      billing={billingAddress || null}
      countries={countries}
      isSame={isSame}
    />
  );
};

export default Page;
