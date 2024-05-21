import React from 'react';

import useTranslations from '@/core/hooks/useTranslations';

import WishlistClearModal from '../WishlistClearModal';

import { StyledDiv } from './styles';

export const WishlistFooter = () => {
  const [isModalOpen, setisModalOpen] = React.useState(false);
  const { _t } = useTranslations();
  return (
    <StyledDiv>
      <div className="footer-info" onClick={() => setisModalOpen(true)}>
        <span> {_t('clear_list', 'Clear List')}</span>
      </div>

      <WishlistClearModal
        isOpen={isModalOpen}
        onClose={() => setisModalOpen(false)}
      />
    </StyledDiv>
  );
};
