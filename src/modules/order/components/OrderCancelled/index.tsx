'use client';
import React from 'react';

import { Container } from '@/core/components/Grid/Container';
import { Row } from '@/core/components/Grid/Row';
import { Col } from '@/core/components/Grid/Col';
import useTranslations from '@/core/hooks/useTranslations';
import Button from '@/core/components/Button';

import { OrderDetailsButton, StyledSection } from './style';

const OrderCancelled = () => {
  const { _t } = useTranslations();
  return (
    <StyledSection className="pt-90 pb-120">
      <Container fluid className="p-0">
        <Row className="no-gutters">
          <Col md={8} lg={6} xl={5} className="m-auto">
            <div className="sucess-header">
              <div className="title-block">
                <h1 className="h2">
                  <strong>
                    {_t('payment_cancelled', 'Payment Cancelled')}
                  </strong>
                </h1>
                <p>
                  <strong>
                    {_t(
                      'your_payment_has_been_cancelled',
                      'Your payment has been Cancelled'
                    )}
                  </strong>
                </p>
              </div>

              <div className="order-id detail-content">
                <OrderDetailsButton>
                  <Button
                    skin="primary"
                    variant="contained"
                    size="lg"
                    href="/checkout"
                  >
                    {_t('try_again', 'Try Again')!}
                  </Button>
                </OrderDetailsButton>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </StyledSection>
  );
};

export default OrderCancelled;
