import clsx from 'clsx';
import styled, { css } from 'styled-components';
import { rem } from 'polished';

import Link from '@/core/components/Link';
import useTranslations from '@/core/hooks/useTranslations';

type Button = {
  button_label: string;
  button_url: string;
};

type EmptyType = {
  data: {
    title: string;
    content: string;
    button?: Button;
  };
  classNames?: string;
  title?: string;
};

const EmptyItems = ({ data, classNames }: EmptyType) => {
  const { title, content } = data;
  const { _t } = useTranslations();

  return (
    <StyledDiv className={clsx(classNames)}>
      <div className="empty-cart desc">
        <h5>{title}</h5>
        <p>
          <Link href="/" className="link-btn">
            {_t('click_here', 'Click Here')}
          </Link>
          {content}
        </p>
      </div>
    </StyledDiv>
  );
};

export default EmptyItems;

const StyledDiv = styled.div`
  ${({ theme }) => css`
    .empty-cart {
      text-align: center;
      min-height: 25vh;

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
          ${theme.fontFamily.semibold}

          &.link-btn {
            text-decoration: underline;

            @media (hover: hover) and (pointer: fine) {
              &:hover {
                opacity: 0.8;
              }
            }
          }
        }
      }
    }

    .btn-wrap {
      text-align: center;
    }
  `}
`;
