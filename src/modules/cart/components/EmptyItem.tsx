import clsx from 'clsx';
import { rem } from 'polished';
import styled, { css } from 'styled-components';

import Link from '@/core/components/Link';
import useTranslations from '@/core/hooks/useTranslations';

type EmptyType = {
  data: {
    title: string;
    content: string;
  };
  classNames?: string;
};

const EmptyItem = ({ data, classNames }: EmptyType) => {
  const { title, content } = data;
  const { _t } = useTranslations();

  return (
    <EmptyWrapper className={clsx(classNames)}>
      <h5>{title}</h5>
      <p>
        <Link href="/" className="link-btn">
          {_t('click_here', 'Click Here')}
        </Link>
        {content}
      </p>
    </EmptyWrapper>
  );
};

export default EmptyItem;

const EmptyWrapper = styled.div`
  ${({ theme }) => css`
    text-align: center;

    h5 {
      text-transform: uppercase;
    }

    h5,
    p {
      margin-bottom: 0;

      & + p {
        margin-top: ${rem(20)};
      }

      a {
        margin-right: ${rem(5)};
        color: inherit;

        &.link-btn {
          ${theme.fontFamily.semibold};
          text-decoration: underline;

          @media (hover: hover) and (pointer: fine) {
            &:hover {
              opacity: 0.8;
            }
          }
        }
      }
    }
  `}
`;
