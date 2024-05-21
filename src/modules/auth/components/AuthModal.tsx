import React from 'react';

import styled from 'styled-components';

import Button from '@/core/components/Button';
import useTranslations from '@/core/hooks/useTranslations';
import Modal from '@/core/components/Modal';

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};
const AuthCheckModal = ({ isOpen, setIsOpen }: Props) => {
  const { _t } = useTranslations();

  if (!isOpen) {
    return null;
  }

  const title = _t(
    'you_must_first_log_in_before_adding_items_to_favourites',
    'You Must First Log in Before Adding Items to Favourites'
  );

  return (
    <Modal open={isOpen} onClose={() => setIsOpen(false)} title={title}>
      <StyleDiv>
        <Button href="/login" skin="primary" variant="contained" size="lg">
          {_t('proceed', 'PROCEED')}
        </Button>
      </StyleDiv>
    </Modal>
  );
};

export default AuthCheckModal;

const StyleDiv = styled.div`
  display: flex;
  justify-content: center;
`;
