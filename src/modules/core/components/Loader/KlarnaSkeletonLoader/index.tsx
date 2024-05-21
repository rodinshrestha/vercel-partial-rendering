import React from 'react';

import { StyledDiv } from './style';

const KlarnaSkeletonLoader = () => {
  return (
    <StyledDiv className="spinner">
      <div id="skeleton-loader">
        <div className="skeleton">
          <span className="sectionTitle" />
          <span className="addressContent" />
          <span className="autoFill" />
          <span className="continueButton" />
          <div className="footer">
            <span className="cartTitle" />
            <span className="price" />
            <span className="buyButton" />
            <span className="adTitle" />
          </div>
        </div>
      </div>
    </StyledDiv>
  );
};

export default KlarnaSkeletonLoader;
