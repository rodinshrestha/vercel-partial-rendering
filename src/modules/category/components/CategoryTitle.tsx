'use client';
import styled, { css } from 'styled-components';
import { rem } from 'polished';

import { Container } from '@/core/components/Grid/Container';
import { Row } from '@/core/components/Grid/Row';
import { Col } from '@/core/components/Grid/Col';

type Props = {
  title: string;
};

const CategoryTitle = ({ title }: Props) => {
  return (
    <StyledSection className="pt-35">
      <Container fluid>
        <Row>
          <Col xxl={4} lg={6} md={11} className="mx-auto">
            <div className="category-title text-center text-uppercase">
              <h1>{title}</h1>
            </div>
          </Col>
        </Row>
      </Container>
    </StyledSection>
  );
};

export default CategoryTitle;

const StyledSection = styled.section`
  ${({ theme }) => css`
    background-color: ${theme.color.white[1000]};
    .filter-title-wrapper,
    .filter-sort-warpper {
      display: flex;
      align-items: center;

      .filter-title {
        padding: ${rem(12)} ${rem(20)};
        border-radius: 20px;
        position: relative;
        font-size: ${rem(14)};
        line-height: ${rem(16)};
        justify-content: space-between;
        display: flex;
        gap: ${rem(5)};
        cursor: pointer;
        ${theme.coreColor.primary.default}

        i {
          font-size: ${rem(12)};
          line-height: ${rem(16)};
        }
      }

      @media (max-width: ${theme.breakPoints.mobile}) {
        display: none;
      }
    }

    .filter-sort-warpper {
      justify-content: flex-end;
    }
  `}
`;
