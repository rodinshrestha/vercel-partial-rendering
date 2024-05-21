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
  viewBox = '0 0 15.684 8.049',
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
        <path
          id="Path_168"
          data-name="Path 168"
          d="M-20213.975-20722.8l7.5,7,7.5-7"
          transform="translate(-20198.633 -20715.117) rotate(180)"
          fill="none"
          stroke={color ?? (color || '#171717')}
          strokeWidth="1"
        />
      </svg>
    </>
  );
};
export default SVG;
