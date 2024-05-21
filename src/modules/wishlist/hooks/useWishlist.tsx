import React from 'react';

import { WishlistContext } from '../providers/WishlistProvider';

const useWishlist = () => React.useContext(WishlistContext);

export default useWishlist;
