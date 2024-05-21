'use client';
import clsx from 'clsx';

type Props = {
  fill?: string;
  size?: number;
  className?: string;
  viewBox?: string;
};

export type IconProps = Props;
const SVG = ({
  fill = '#171717',
  size = 14,
  className = '',
  viewBox = '0 0 14.463 16.067',
}: IconProps) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox={viewBox}
        className={clsx('svg-icon', className)}
        fill={fill}
      >
        <g
          id="Group_3"
          data-name="Group 3"
          transform="translate(-332.112 -15.5)"
        >
          <circle
            id="Ellipse_1"
            data-name="Ellipse 1"
            cx="3.214"
            cy="3.214"
            r="3.214"
            transform="translate(336.239 16)"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path
            id="Path_3"
            data-name="Path 3"
            d="M2320.382,30.278s.575-8.341,6.879-8.09,6.536,8.09,6.536,8.09"
            transform="translate(-1987.737 0.756)"
            fill="none"
            stroke="currentColor"
            // stroke={color ?? (color || '#171717')}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
          />
        </g>
      </svg>
    </>
  );
};
export default SVG;
