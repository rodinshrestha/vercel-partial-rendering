'use client';
import React from 'react';

import type { OfferType } from '@/account/types/offer.types';
import ImageWithFallback from '@/core/components/ImageWithFallback';
import useTranslations from '@/core/hooks/useTranslations';
import Button from '@/core/components/Button';

// import PageTitle from '../PageTitle';

import { StyledDiv } from './style';

type Props = {
  offers: Array<OfferType>;
  hasShowMore?: boolean;
};

const Offer = ({ offers, hasShowMore = false }: Props) => {
  const { _t } = useTranslations();

  return (
    <StyledDiv>
      {/* <PageTitle tag="h5" title={_t('my_offers', 'My Offers')} /> */}
      {offers.length ? (
        <div className="coupon-card-block">
          {offers
            .sort(
              (a, b) =>
                Number(new Date(b.created_at)) - Number(new Date(a.created_at))
            )
            .map((el) => (
              <div key={el.created_at} className="coupon-card-item">
                <div className="coupon-card">
                  <div className="img-wrapper">
                    <ImageWithFallback
                      src={el?.image_url || ''}
                      alt={el.name}
                      fill
                    />
                  </div>
                  <div className="coupon-detail">
                    <div className="title">
                      <h6>{el.name}</h6>
                    </div>
                    <div className="contain">
                      <span className="coupon-code">
                        {_t('kod', 'KOD:')}
                        {el.coupon_code}
                      </span>
                      <p className="small">{el.description}</p>
                      {el.redeemed && (
                        <span className="small redeemed">
                          {_t('redeemed', 'Redeemed')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          {hasShowMore && (
            <div className="btn-wrapper">
              {offers.length === 3 && (
                <Button
                  variant="contained"
                  skin="primary"
                  href={`/account/offer`}
                  asSelfLink
                >
                  {_t('see_more_offers', 'See more offers')}
                </Button>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="no-data">
          <h6>{_t('no_offers_available', 'No offers available')}.</h6>
        </div>
      )}
    </StyledDiv>
  );
};

export default Offer;
