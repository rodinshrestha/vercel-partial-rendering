import { components, DropdownIndicatorProps } from 'react-select';

import { IconAngleDownArrow } from '../../Icons';

const DropdownIndicator = (props: DropdownIndicatorProps) => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <span className="icon-down_arrow" />
        <IconAngleDownArrow size={14} />
      </components.DropdownIndicator>
    )
  );
};

export default DropdownIndicator;
