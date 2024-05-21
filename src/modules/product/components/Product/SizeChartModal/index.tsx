'use client';
import React from 'react';

import { clsx } from 'clsx';

import { ProductTypes } from '@/product/types/product.types';
import Modal from '@/core/components/Modal';
import useTranslations from '@/core/hooks/useTranslations';

import ProductSizeGuide from '../ProductSizeGuide';

type Props = {
  productData: ProductTypes;
};

const SizeChartModal = ({ productData }: Props) => {
  const { _t } = useTranslations();
  const [isSizeChartModalOpen, setIsSizeChartModalOpen] = React.useState(false);

  return (
    <>
      <div className={clsx('size-info-guide')}>
        <span onClick={() => setIsSizeChartModalOpen(true)}>
          {_t('size_guide', 'Size Guide')}
        </span>
      </div>

      <Modal
        open={isSizeChartModalOpen}
        onClose={() => setIsSizeChartModalOpen(false)}
        maxWidth="1000px"
      >
        <ProductSizeGuide sizeChartId={productData.size_chart_id} />
      </Modal>
    </>
  );
};

export default SizeChartModal;
