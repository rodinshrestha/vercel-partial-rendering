import "server-only";

import React, { Suspense } from "react";

import {
  ProductWithWithoutSliderType,
  RowSettings,
  SectionSettings,
} from "@/builder/types/builder.types";
import { fetchProfile } from "@/auth/services/auth-service";
import { sectionAttributes } from "@/builder/utils/section-settings-utils";
import { rowAttributes } from "@/builder/utils/row-settings-utils";

import ProductWithSectionTitle from "../..";
import { productHelpers } from "../../product.helpers";

type Props = {
  section_settings: SectionSettings;
  row_settings: RowSettings;
  module: any;
};

const ProductSliderBuilder = async ({
  section_settings,
  row_settings,
  module,
}: Props) => {
  const user = await fetchProfile();

  return (
    <Suspense fallback={null}>
      <ProductWithSectionTitle
        sectionAttributes={sectionAttributes(section_settings)}
        rowAttributes={rowAttributes(row_settings)}
        {...productHelpers(module as ProductWithWithoutSliderType)}
        user={user?.data || null}
      />
    </Suspense>
  );
};

export default ProductSliderBuilder;
