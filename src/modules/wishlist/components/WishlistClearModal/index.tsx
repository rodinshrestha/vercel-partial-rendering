import React from 'react';

import styled from 'styled-components';

import Button from '@/core/components/Button';
import Modal from '@/core/components/Modal';
import useWishlist from '@/wishlist/hooks/useWishlist';
import useTranslations from '@/core/hooks/useTranslations';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const WishlistClearModal = ({ isOpen, onClose }: Props) => {
  const [loader, setLoader] = React.useState(false);
  const { clearWishlist, setIsWishlistDrawerOpen } = useWishlist();

  const { _t } = useTranslations();

  const handleClick = () => {
    setLoader(true);

    clearWishlist()
      .then(() => {
        onClose();
      })
      .finally(() => {
        setLoader(false);
        setIsWishlistDrawerOpen(false);
      });
  };
  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="clear-content text-center">
        <h6>
          {_t(
            'are_you_sure_you_want_to_remove_all_wishlist_items',
            'Are you sure u want to remove all wishlist items'
          )}{' '}
        </h6>

        <ClearBtn className="btn-group mt-30">
          <Button
            skin="primary"
            variant="contained"
            onClick={handleClick}
            isLoading={loader}
            disabled={loader}
            size="lg"
          >
            Proceed
          </Button>
          <Button
            skin="secondary"
            variant="contained"
            onClick={onClose}
            size="lg"
          >
            Cancel
          </Button>
        </ClearBtn>
      </div>
    </Modal>
  );
};

export default WishlistClearModal;

const ClearBtn = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
`;
