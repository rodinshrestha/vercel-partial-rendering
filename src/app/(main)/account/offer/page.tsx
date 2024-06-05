import React from "react";

import Offer from "@/account/components/Offer";
import { makeHeaders } from "@/core/utils/header";
import { getOffers } from "@/account/services/account-service";

const OfferPage = async () => {
  const defaultHeaders = makeHeaders();

  const { data } = await getOffers(defaultHeaders);

  return <Offer offers={data} />;
};

export default OfferPage;
