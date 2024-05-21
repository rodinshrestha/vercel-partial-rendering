'use client';
import React from 'react';

import Link from 'next/link';

import { useAuth } from '@/auth/hooks/useAuth';
import useWishlist from '@/wishlist/hooks/useWishlist';
import { Container } from '@/core/components/Grid/Container';
import { Row } from '@/core/components/Grid/Row';
import { Col } from '@/core/components/Grid/Col';
import Loader from '@/core/components/Loader';

import FavouriteItem from '../FavouriteItem';

import { FavouriteSection } from './style';

const FavouriteModule = () => {
  const { user } = useAuth();
  const { wishlist, wishlistLoader } = useWishlist();

  return (
    <FavouriteSection>
      <Container fluid>
        <Row>
          <Col md={6} className="mx-auto">
            <div className="fav-content-wrapper">
              <div className="section-title text-center">
                <h1 className="h2">
                  <strong>My Favourites</strong>
                </h1>

                {!user?.email && (
                  <span>
                    Remember to
                    <Link href="#">log in or become a member</Link>
                    to save your favorites.
                  </span>
                )}
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col className="mx-auto">
            <div className="favourite-item-wrapper pt-50 pb-50">
              {wishlistLoader ? (
                <Loader type="spinner" color="primary" />
              ) : (
                wishlist?.wishlist_items?.map((item) => {
                  return (
                    <FavouriteItem
                      key={item.id}
                      productDetails={item.product}
                    />
                  );
                })
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </FavouriteSection>
  );
};

export default FavouriteModule;
