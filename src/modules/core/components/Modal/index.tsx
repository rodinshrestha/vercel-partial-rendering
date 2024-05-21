'use client';

import React from 'react';

import { createPortal } from 'react-dom';
import clsx from 'clsx';

import useTranslations from '@/core/hooks/useTranslations';
import useOutsideClick from '@/core/hooks/useOutsideClick';

import Overlay from '../Overlay';
import Loader from '../Loader';
import { IconClose } from '../Icons';

import { StyledDiv } from './style';

interface IModal {
  title?: string;
  className?: string;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: string;
  loader?: boolean;
  search?: React.ReactNode;
}

const Modal = ({
  title,
  className,
  open,
  onClose,
  children,
  maxWidth = '820px',
  loader = false,
  search,
}: IModal) => {
  const style = {
    maxWidth: maxWidth,
  };

  React.useEffect(() => {
    if (open) {
      document.body.classList.add('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [open]);

  const ref = React.useRef(null);

  useOutsideClick(ref, onClose);
  const { _t } = useTranslations();

  return (
    <>
      {open &&
        createPortal(
          <>
            <Overlay zIndex={9} position="fixed" />
            <StyledDiv
              className={clsx('modal fade', className, { open: 'show' })}
            >
              <div className="modal-dialog" style={style} ref={ref}>
                <div className="modal-content">
                  <div className="modal-header">
                    <a className="close-btn" onClick={onClose}>
                      <IconClose size={14} />
                    </a>

                    {title && (
                      <div className="modal-title">
                        <h4 className="h4 title">{title}</h4>
                      </div>
                    )}
                  </div>

                  {search ? <div className="modal-search">{search}</div> : null}
                  <div className="modal-body">
                    {loader ? (
                      <div className="loader-container">
                        <Loader type="spinner" color="primary" size="20px" />
                      </div>
                    ) : (
                      children
                    )}
                  </div>
                </div>
              </div>
            </StyledDiv>
          </>,
          document.body as HTMLElement
        )}
    </>
  );
};

export default Modal;
