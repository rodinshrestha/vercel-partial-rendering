import React from 'react';

import { CategoryProductContext } from '../providers/CategoryProvider';

const useCategory = () => React.useContext(CategoryProductContext);

export default useCategory;
