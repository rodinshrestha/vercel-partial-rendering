'use client';
import clsx from 'clsx';

type Props = {
  color?: string;
  size?: number;
  className?: string;
  viewBox?: string;
};

export type IconProps = Props;
const SVG = ({
  color,
  size = 14,
  className = '',
  viewBox = '0 0 9.38 9.38',
}: IconProps) => {
  return (
    <>
      <svg
        id="Group_92"
        data-name="Group 92"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox={viewBox}
        className={clsx('svg-icon', className)}
      >
        <g id="Group_90" data-name="Group 90" transform="translate(0)">
          <path
            id="Path_28"
            data-name="Path 28"
            d="M7446.124,674.474v9.38"
            transform="translate(-7441.434 -674.474)"
            fill="none"
            stroke={color ?? (color || '#171717')}
            strokeWidth="1.5"
          />
          <path
            id="Path_29"
            data-name="Path 29"
            d="M0,0V9.38"
            transform="translate(0 4.69) rotate(-90)"
            fill="none"
            stroke={color ?? (color || '#171717')}
            strokeWidth="1.5"
          />
        </g>
      </svg>
    </>
  );
};
export default SVG;
