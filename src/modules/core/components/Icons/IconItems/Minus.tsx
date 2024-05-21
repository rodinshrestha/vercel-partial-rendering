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
  viewBox = '0 0 9.38 1.5',
}: IconProps) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox={viewBox}
        className={clsx('svg-icon', className)}
      >
        <g id="Group_90" data-name="Group 90" transform="translate(0 -3.94)">
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
