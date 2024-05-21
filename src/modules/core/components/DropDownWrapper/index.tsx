import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { css } from 'styled-components';

import { DropDownVariants } from './helper';

type Props = {
  isOpen: boolean;
  header: JSX.Element;
  className?: string;
  children: React.ReactNode;
};

const DropDownWrapper = ({
  isOpen = false,
  header,
  className = '',
  children,
}: Props) => {
  return (
    <StyledDiv>
      <div className="header-title">{header}</div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={className}
            style={{
              transformOrigin: 'top',
              position: 'absolute',
              zIndex: '2',
              width: '100%',
            }}
            initial="initial"
            exit="exit"
            animate="animate"
            variants={DropDownVariants()}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </StyledDiv>
  );
};

export default DropDownWrapper;

const StyledDiv = styled.div`
  ${() => css`
    position: relative;
    transition: 0.3s ease all;
    flex-grow: 1;

    .header-title {
      cursor: pointer;
      position: relative;
      transition: 0.3s ease all;

      h5,
      h6 {
        transition: 0.3s ease all;
      }
    }

    .menu-up {
      bottom: 0;
      transform-origin: bottom center !important;
    }
  `}
`;
