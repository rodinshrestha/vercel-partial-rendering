'use client';
import React from 'react';

import useTranslations from '@/core/hooks/useTranslations';
import { Container } from '@/core/components/Grid/Container';
import { Row } from '@/core/components/Grid/Row';
import { Col } from '@/core/components/Grid/Col';
import Button from '@/core/components/Button';
import BrandLogo from '@/core/components/Header/components/BrandLogo';
import LoginIcon from '@/core/components/Header/components/LoginIcon';
import { useAuth } from '@/auth/hooks/useAuth';

import { StyledCheckoutHeader } from './style';

const CheckoutHeader = () => {
  const { _t } = useTranslations();
  const { user } = useAuth();

  return (
    <StyledCheckoutHeader>
      <Container fluid className="p-0">
        <Row noGutter>
          <Col>
            <div className="header-wrap">
              <Button skin="light" variant="contained" size={'sm'} href="/">
                <i className="icon-left_arrow" />
              </Button>

              <div className="logo">
                <BrandLogo />
              </div>
              <div className="login">
                <LoginIcon>
                  {user ? user.first_name : _t('login', 'Login')}
                </LoginIcon>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </StyledCheckoutHeader>
  );
};

export default CheckoutHeader;
