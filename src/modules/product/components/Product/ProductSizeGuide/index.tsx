"use client";

import React from "react";

import { publicAxios } from "@/core/utils/axios";
import toastAlert from "@/core/utils/toast";
import { BuilderComponentTypes } from "@/builder/types/builder.types";
import Loader from "@/core/components/Loader";
import { PageResponse } from "@/core/types/page-props.types";
import useTranslations from "@/core/hooks/useTranslations";
import SizeGuideBuilder from "@/builder/SizeGuideBuilder";

import { StyledDiv, StyledLoader } from "./style";

type Props = {
  sizeChartId: string;
};

const ProductSizeGuide = ({ sizeChartId }: Props) => {
  const [loader, setLoader] = React.useState(false);
  const [sizeGuideData, setSizeGuideData] = React.useState<PageResponse>();
  const [isError, setIsError] = React.useState(false);
  const { _t } = useTranslations();
  React.useEffect(() => {
    if (!sizeChartId) return;
    setLoader(true);
    publicAxios
      .get(`sf/size_chart/${sizeChartId}`)
      .then((res) => setSizeGuideData(res.data.data))
      .catch((err) => {
        setIsError(true);
        toastAlert(err, "error");
      })
      .finally(() => setLoader(false));
  }, [sizeChartId]);

  if (loader)
    return (
      <StyledLoader>
        <Loader color="primary" type="spinner" />
      </StyledLoader>
    );

  if (isError || !sizeGuideData?.components.length) {
    return (
      <StyledDiv>
        <p>
          {_t(
            "size_guide_is_not_available_for_this_product",
            "Size Guide is not Available for this Product"
          )}
        </p>
      </StyledDiv>
    );
  }

  return (
    <StyledDiv className=" size-guide-wrapper">
      {sizeGuideData?.components.map(
        (component: BuilderComponentTypes, i: number) => {
          return <SizeGuideBuilder component={component} key={i} />;
        }
      )}
    </StyledDiv>
  );
};

export default ProductSizeGuide;
