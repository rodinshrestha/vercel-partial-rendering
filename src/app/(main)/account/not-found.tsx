'use client';

import { Container } from '@/core/components/Grid/Container';
import { Col } from '@/core/components/Grid/Col';
import { Row } from '@/core/components/Grid/Row';
import PageNotFound from '@/core/components/PageNotFound';
import useTranslations from '@/core/hooks/useTranslations';

export default function NotFound() {
  const { _t } = useTranslations();

  return (
    <>
      <section className="">
        <Container fluid>
          <Row>
            <Col>
              <PageNotFound
                title={_t('page_not_found', 'Page Not Found')}
                content={_t(
                  'whoops_Seems_the_cat_found_the_cables',
                  'Whoops. Seems the cat found the cables'
                )}
              />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
