import {
  ChangeAbleValueType,
  ProductTypes,
} from '@/product/types/product.types';
import { usePrice } from '@/product/hooks/usePrice';

import { StyledDiv } from './style';

type Iprops = {
  productData: ProductTypes;
  changeAbleValue?: ChangeAbleValueType;
};

const ProductPrice = ({ productData, changeAbleValue }: Iprops) => {
  const { discountPrice, finalPrice } = usePrice(productData);

  return (
    <StyledDiv className="price-group-wrap">
      <div className="price-group">
        <div className="product-price">
          <span className="price ">{changeAbleValue?.price || finalPrice}</span>

          {(discountPrice || changeAbleValue?.productName) && (
            <span className="price dis-prs">
              {changeAbleValue?.productName
                ? changeAbleValue?.discountPrice
                : discountPrice}
            </span>
          )}
        </div>
      </div>
    </StyledDiv>
  );
};

export default ProductPrice;
