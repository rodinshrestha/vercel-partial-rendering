"use client";
import React from "react";

import clsx from "clsx";

import {
  ProductTypes,
  VariationProductDetails,
} from "@/product/types/product.types";
import { StyledDiv, StyledContentWrap } from "@/product/page/style";
import { Container } from "@/core/components/Grid/Container";
import { Row } from "@/core/components/Grid/Row";
import { Col } from "@/core/components/Grid/Col";
import ProductBreadCrumb from "@/product/components/Product/ProductBreadCrumb";
import { isConfigurableProducts } from "@/product/utils/is-configurable-products";
import useMediaQuery from "@/core/hooks/useMediaQuery";
import { breakPoints } from "@/theme/breakPoints";
import ProductTitle from "@/product/components/Product/ProductTitle";
import ProductImageGallery from "@/product/components/Product/ProductImageGallery";
import ProductStockStatus from "@/product/components/Product/ProductStockStatus";
import { SelectedProductVariants } from "@/product/types/selected-product-varaints-state.types";
import { getCurrentProductVariants } from "@/product/utils/get-current-product-variants";
import { getProductVariationsGroupBy } from "@/product/utils/get-product-group-by";
import { initializeProductId } from "@/product/utils/initialize-product-id";
import ProductVariantList from "@/product/components/Product/ProductVariantList";
import ProductCTA from "@/product/components/Product/ProductCTA";
import ProductAdditionalDetails from "@/product/components/ProductAdditionalDetails";
import AuthCheckModal from "@/auth/components/AuthModal";
import getSortVariants from "@/product/utils/get-variant-sorting";
import useHeaders from "@/core/hooks/useHeaders";

import { getSelectedVariantFromSKU } from "../utils/get-selected-variant-from-sku";
import { fetchProductAdditionalData } from "../services/product-additional-service";
import { showConfigurableProductError } from "../utils/show-error-product";
import useProductHelperStore from "../store/useProductHelperStore";

type Props = {
  productData: ProductTypes;
  slug: string;
  pluckVariantDetailsFromSKU: VariationProductDetails | null;
  productWithSlug: Array<string>;
  children: React.ReactNode;
};

const Product = ({
  productData,
  slug,
  pluckVariantDetailsFromSKU,
  productWithSlug,
  children,
}: Props) => {
  const isConfigurableProduct = isConfigurableProducts(productData);
  const isTablet = useMediaQuery(breakPoints.tab);
  const { clientHeaders } = useHeaders();
  const { changeAbleValue, setChangeAbleValue } = useProductHelperStore();

  const [additionalDataLoader, setAdditionalDataLoader] = React.useState(false);
  const [additionalData, setAdditionalData] =
    React.useState<ProductTypes | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [appliedQty, setAppliedQty] = React.useState<number>(1);
  const [minimumQty, setMinimumQuantity] = React.useState<number>(1);

  const [selectedVaraintsFromSKU, setSelectedVaraintsFromSKU] = React.useState(
    pluckVariantDetailsFromSKU
  );
  const [selectedGroupBy, setSelectedGroupBy] = React.useState<null | string>(
    getProductVariationsGroupBy(productData)
  );

  const {
    selectedVariantList,
    error,
    lastVariantMatrix,
    selectedVaraint,
    //Pluck the product id matched from the product SKU found in URL
    productId: generatedProductId,
  } = React.useMemo(() => {
    return getSelectedVariantFromSKU(productData, pluckVariantDetailsFromSKU);
  }, [productData, pluckVariantDetailsFromSKU]);

  /**
   * Generate the product matrix according the product variants
   */
  const currentProductMaxtrix = React.useMemo(
    () =>
      getCurrentProductVariants(
        productData,
        selectedGroupBy,
        isConfigurableProduct,
        slug
      ),
    [isConfigurableProduct, productData, selectedGroupBy, slug]
  );

  // throw error if  configurable attribute is not present
  React.useEffect(() => {
    showConfigurableProductError(productData);
  }, [productData]);

  const [selectedProductVariants, setSelectedProductVariants] =
    React.useState<SelectedProductVariants>({
      variants:
        !error || lastVariantMatrix
          ? { ...currentProductMaxtrix, ...lastVariantMatrix }
          : currentProductMaxtrix,

      selectedAttributes: selectedVariantList,
    });

  const [productId, setProductId] = React.useState<string>(
    initializeProductId(
      productData,
      isConfigurableProduct,
      selectedGroupBy,
      slug
    )
  );

  React.useEffect(() => {
    const minQuantitiy = productData?.min_order_qty || 1;
    setMinimumQuantity(minQuantitiy);
    setAppliedQty(minQuantitiy);
  }, [productData?.min_order_qty, setAppliedQty]);

  React.useEffect(() => {
    const variantId =
      selectedProductVariants.selectedAttributes?.at(-1)?.id ||
      selectedVaraintsFromSKU?.id ||
      "";

    if (!variantId) return;

    setAdditionalDataLoader(true);
    fetchProductAdditionalData(variantId, clientHeaders)
      .then((res) => {
        const { data = null } = res?.data || {};
        setAdditionalData(data);
      })
      .finally(() => {
        setAdditionalDataLoader(false);
      });
  }, [
    clientHeaders,
    selectedProductVariants.selectedAttributes,
    selectedVaraintsFromSKU,
  ]);

  // Setting product group by, if the product is configurable
  React.useEffect(() => {
    if (!isConfigurableProduct) return;
    setSelectedGroupBy(getProductVariationsGroupBy(productData));
  }, [isConfigurableProduct, productData]);

  //   Setting product variants if the product is configurable
  React.useEffect(() => {
    if (!isConfigurableProduct) {
      setProductId(
        initializeProductId(
          productData,
          isConfigurableProduct,
          selectedGroupBy,
          slug
        )
      );

      return;
    }

    setSelectedProductVariants({
      variants:
        !error || lastVariantMatrix
          ? { ...currentProductMaxtrix, ...lastVariantMatrix }
          : currentProductMaxtrix,
      selectedAttributes: selectedVariantList,
    });
    setProductId(generatedProductId);
  }, [
    currentProductMaxtrix,
    error,
    generatedProductId,
    isConfigurableProduct,
    lastVariantMatrix,
    productData,
    selectedGroupBy,
    selectedVariantList,
    slug,
  ]);

  return (
    <>
      <StyledDiv className={clsx("pb-90")}>
        <div className="product-details-wrapper">
          <Container fluid>
            <Row
              className="flex-row-reverse"
              style={{ zIndex: "1", position: "relative", rowGap: "15px" }}
            >
              <Col lg={7} xl={8} className="mr-auto">
                <div className="product-img-inner-wrapper">
                  {isTablet && (
                    <ProductBreadCrumb
                      productWithSlug={productWithSlug}
                      productData={productData}
                      selectedVaraint={selectedVaraint}
                    />
                  )}
                  <ProductImageGallery
                    data={
                      additionalData?.images.length
                        ? additionalData?.images
                        : productData.images
                    }
                  />
                </div>
              </Col>
              <Col lg={5} xl={4} className="ml-auto">
                <div className="sticky-wrapper">
                  {!isTablet && (
                    <ProductBreadCrumb
                      productWithSlug={productWithSlug}
                      productData={productData}
                      selectedVaraint={selectedVaraint}
                    />
                  )}
                  <StyledContentWrap className="product-content-wrap">
                    <ProductTitle
                      productData={productData}
                      changeAbleValue={changeAbleValue}
                    />
                    <div className="content-info-wrap">
                      <div className="price-fav-wrap">{children}</div>
                    </div>
                    {isConfigurableProduct &&
                      Object.entries(
                        selectedProductVariants?.variants || {}
                      ).map(([key, value], i) => {
                        const sortedVaraintData = getSortVariants(value, key);

                        return (
                          <ProductVariantList
                            key={key}
                            variantData={sortedVaraintData}
                            slug={key}
                            setProductId={setProductId}
                            setSelectedProductVariants={
                              setSelectedProductVariants
                            }
                            selectedProductVariants={selectedProductVariants}
                            productData={productData}
                            setChangeAbleValue={setChangeAbleValue}
                            index={i}
                            productSlug={slug}
                            setAppliedQty={setAppliedQty}
                            minimumQty={minimumQty}
                            setMinimumQuantity={setMinimumQuantity}
                            setSelectedVaraintsFromSKU={
                              setSelectedVaraintsFromSKU
                            }
                          />
                        );
                      })}

                    <ProductCTA
                      isConfigurableProduct={isConfigurableProduct}
                      productData={productData}
                      productId={productId}
                      changeAbleValue={changeAbleValue}
                      setSelectedProductVariants={setSelectedProductVariants}
                      appliedQty={appliedQty}
                      setAppliedQty={setAppliedQty}
                      setProductId={setProductId}
                      slug={slug}
                      selectedGroupBy={selectedGroupBy}
                      minimumQty={minimumQty}
                    />
                    <ProductStockStatus
                      productData={productData}
                      productId={productId}
                    />

                    <ProductAdditionalDetails
                      product={productData}
                      additionalData={additionalData}
                      additionalDataLoader={additionalDataLoader}
                    />
                  </StyledContentWrap>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </StyledDiv>
      <AuthCheckModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Product;
