import React from 'react';

import { AnimatePresence } from 'framer-motion';

import Button from '@/core/components/Button';
import { NavigationItem } from '@/core/types/navigation-type';
import { IconAngleLeftArrow } from '@/core/components/Icons';
import useTranslations from '@/core/hooks/useTranslations';

import { MobileMenuTypes } from '../../types/mobile-menu.types';
import MobileMenuList from '../MobileMenuList';
import useNavMenuStore from '../../store/useNavMenuStore';

import { MotionStyledDiv, StyledDiv } from './style';

export type Props = {
  navMenuList: Array<MobileMenuTypes>;
  secondaryMenuList?: Array<NavigationItem>;
};

const MobileMenu = ({ navMenuList, secondaryMenuList }: Props) => {
  const { handleMenuBackClick } = useNavMenuStore();
  const { _t } = useTranslations();

  return (
    <StyledDiv className="mobile-menu-wrapper">
      <AnimatePresence>
        {navMenuList.map((menu, index) => {
          const isActive = index === navMenuList.length - 1;
          const isFirstLevel = index === 0;
          return (
            <MotionStyledDiv
              className="asd"
              key={index}
              depth={index}
              transition={{ duration: 0.3, ease: 'linear' }}
              animate={isActive && 'open'}
              initial="close"
              exit="close"
              variants={{
                open: {
                  x: 0,
                },
                close: {
                  x: '-100%',
                },
              }}
            >
              {!isFirstLevel && (
                <div className="back-btn-wrapper">
                  <Button
                    skin="dark"
                    variant="link"
                    onClick={handleMenuBackClick}
                  >
                    <IconAngleLeftArrow size={14} />
                    {_t('back', 'Back')}
                  </Button>

                  <div className="mobile-menu-drawer-title">
                    <h6>
                      {_t('see_all', 'See all ')} {menu.parentName}
                    </h6>
                  </div>
                </div>
              )}

              <div className="mobile-top-menu">
                {menu.data.map((item, i) => {
                  return <MobileMenuList key={i} item={item} />;
                })}
              </div>

              {secondaryMenuList && (
                <div className="mobile-buttom-menu">
                  {isFirstLevel &&
                    secondaryMenuList.map((item, i) => {
                      return <MobileMenuList key={i} item={item} />;
                    })}
                </div>
              )}
            </MotionStyledDiv>
          );
        })}
      </AnimatePresence>
    </StyledDiv>
  );
};

export default MobileMenu;
