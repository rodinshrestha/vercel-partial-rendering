import React from 'react';

import styled from 'styled-components';

import Button from '@/core/components/Button';
import useTranslations from '@/core/hooks/useTranslations';
import Modal from '@/core/components/Modal';

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  loader: boolean;
  handleLogout: () => void;
};
const LogoutModal = ({ isOpen, setIsOpen, loader, handleLogout }: Props) => {
  const { _t } = useTranslations();
  return (
    <Modal
      open={isOpen}
      onClose={() => setIsOpen(false)}
      title={_t('logout_confirmation', 'Are you sure you want to logout?')}
    >
      <StyleDiv>
        <Button
          skin="primary"
          variant="contained"
          size="md"
          disabled={loader}
          isLoading={loader}
          onClick={handleLogout}
        >
          {_t('proceed', 'PROCEED')}
        </Button>
      </StyleDiv>
    </Modal>
  );
};

export default LogoutModal;
const StyleDiv = styled.div`
  display: flex;
  justify-content: center;
`;
