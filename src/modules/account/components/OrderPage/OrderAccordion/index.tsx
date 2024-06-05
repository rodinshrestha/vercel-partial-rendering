// Not in use. Delete later TODO

'use client';
import React, { useRef } from 'react';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { format } from 'date-fns';
import ReactToPrint from 'react-to-print';

import useTranslations from '@/core/hooks/useTranslations';
import Loader from '@/core/components/Loader';
// import { ORDER_PAGINATION_LIMIT } from '@/order/constants/order.constants';
// import Pagination from '@/core/components/Pagination';

import { Props } from '..';

import { StyleDiv, StyleOrder } from './style';

const OrderAccordion = ({
  data,
  // searchParams,
  loading = false,
}: Props) => {
  const { _t } = useTranslations();
  const [selectedOrder, setSelectedOrder] = React.useState('');
  const itemsRef = useRef<Array<HTMLDivElement>>([]);

  // const length = data?.meta?.total
  //   ? Math.ceil(data.meta.total / ORDER_PAGINATION_LIMIT)
  //   : 1;

  return (
    <div className="order-wrapper">
      {loading && <Loader color="primary" type="spinner" />}
      {!data?.data?.length && !loading && (
        <StyleDiv>
          <h6>{_t('no_orders_available', 'No orders available')}</h6>
        </StyleDiv>
      )}
      {(data?.data || []).map((el, i: number) => {
        return (
          <StyleOrder
            key={el.id}
            className={clsx({
              active: el.id === selectedOrder,
            })}
          >
            <div
              className="heading"
              onClick={() => {
                setSelectedOrder(el.id);
              }}
            >
              <div className="title">
                {el.id !== selectedOrder && <h6>STORE NAME</h6>}

                {el.id == selectedOrder && (
                  <ReactToPrint
                    bodyClass="order-print-wrapper"
                    trigger={() => (
                      <span className="reprint">
                        {_t('reprint', 'Reprint')}
                      </span>
                    )}
                    content={() => {
                      return itemsRef.current[i];
                    }}
                  />
                )}
                {el.id !== selectedOrder && (
                  <span>{format(new Date(el.created_at), 'yyyy-MM-dd')}</span>
                )}
              </div>

              <div className="sub-title">
                <span>{el?.grand_total}</span>
              </div>
            </div>

            <span className="acc-btn">
              {el.id === selectedOrder ? (
                <i
                  className="icon icon-close"
                  onClick={() => setSelectedOrder('')}
                />
              ) : (
                <i
                  className="icon icon-right_small"
                  onClick={() => setSelectedOrder(el.id)}
                />
              )}
            </span>

            <AnimatePresence>
              {el.id === selectedOrder && (
                <motion.div
                  className="accordion-content"
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  ref={(el) => {
                    if (el) itemsRef.current[i] = el;
                  }}
                  variants={{
                    open: { opacity: 1, height: 'auto' },
                    collapsed: { opacity: 0, height: 0 },
                  }}
                  transition={{ duration: 0.3, ease: 'linear' }}
                >
                  <div className="accordion-contain-wrap">
                    <h4>{'storename'}</h4>
                    <span className="date small">
                      {format(new Date(el.created_at), 'yyyy-MM-dd')}
                    </span>

                    <p>
                      <strong>Order Number:</strong>
                      {el?.id}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </StyleOrder>
        );
      })}

      {/* {(data?.meta.current_page || 1) * (data?.meta.per_page || 0) <
        (data?.meta.total || 1) && (
        <Pagination
          length={length}
          paginationLimit={ORDER_PAGINATION_LIMIT}
          totalData={data?.meta.total || 1}
          searchParams={searchParams}
          query="page"
          showPerPageData={data?.data?.length || 0}
          paginationName={'Order'}
        />
      )} */}
    </div>
  );
};

export default OrderAccordion;
