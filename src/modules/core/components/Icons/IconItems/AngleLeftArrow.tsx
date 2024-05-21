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
  viewBox = '0 0 8.049 15.682',
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
          id="Path_167"
          data-name="Path 167"
          d="M0,7,7.5,0,15,7"
          transform="translate(0.684 15.341) rotate(-90)"
          fill="none"
          stroke={color ?? (color || '#171717')}
          strokeWidth="1"
        />
      </svg>
    </>
  );
};
export default SVG;
