import React from 'react';

import { Col } from '@/core/components/Grid/Col';

interface IProps {
  children: (item: unknown, index: number) => React.ReactNode;
  data: unknown[];
}

const WithoutSlideColumnBlock = ({ data = [], children }: IProps) => {
  return (
    <>
      {data.map((item: any, index) => {
        const data = {
          base_image: {
            url: item?.image || item?.product?.base_image || '',
          },
          configurable_attributes: item?.product?.configurable_attributes,
          hoverImage: '',
          url_key: item?.product?.url_key,
          name: item?.product?.name,
          color_value: item?.product?.color_value,
          price_format: item?.product?.price_format,
          rollover_image: {
            url: item?.hover_image || item?.product?.rollover_image || '',
          },
          is_in_stock: item?.product?.is_in_stock,
          is_group_by: item?.product?.is_group_by,
          id: item?.product?.id,
          is_new_product: item?.product?.is_new_product,
        };
        return (
          <Col key={index} className="custom-col">
            {children(data, index)}
          </Col>
        );
      })}
    </>
  );
};

export default WithoutSlideColumnBlock;
