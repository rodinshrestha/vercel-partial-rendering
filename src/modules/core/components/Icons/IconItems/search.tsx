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
  viewBox = '0 0 14.362 14.362',
}: IconProps) => {
  return (
    <>
      <svg
        id="Group_682"
        data-name="Group 682"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox={viewBox}
        className={clsx('svg-icon', className)}
      >
        <g
          id="Ellipse_10"
          data-name="Ellipse 10"
          fill="none"
          stroke={color ?? (color || '#171717')}
          strokeWidth="1"
        >
          <ellipse cx="6.116" cy="6.116" rx="6.116" ry="6.116" stroke="none" />
          <ellipse cx="6.116" cy="6.116" rx="5.616" ry="5.616" fill="none" />
        </g>
        <path
          id="Path_31"
          data-name="Path 31"
          d="M1357.5,65.5l3.091,3.091"
          transform="translate(-1346.936 -54.936)"
          fill="none"
          stroke={color ?? (color || '#171717')}
          strokeLinecap="round"
          strokeWidth="1"
        />
      </svg>
    </>
  );
};
export default SVG;
