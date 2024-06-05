'use client';

import { Container } from '@/core/components/Grid/Container';
import { Col } from '@/core/components/Grid/Col';
import { Row } from '@/core/components/Grid/Row';
import PageNotFound from '@/core/components/PageNotFound';

export default function NotFound() {
  return (
    <section>
      <Container fluid>
        <Row>
          <Col>
            <PageNotFound
              title="Page not found"
              content="Whoops. Seems the cat found the cables"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
}
