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
  viewBox = '0 0 13.653 17.192',
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
        <g
          id="Group_1"
          data-name="Group 1"
          transform="translate(-2425.5 -160.303)"
        >
          <path
            id="Path_1"
            data-name="Path 1"
            d="M.844,5H11.809l.844,10.966H0Z"
            transform="translate(2426 161.03)"
            fill="none"
            stroke={color ?? (color || '#171717')}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
          />
          <path
            id="Path_2"
            data-name="Path 2"
            d="M2430.606,165.705s-1.032-5.227,2.869-5.227,3.008,5.227,3.008,5.227"
            transform="translate(-0.951 0.325)"
            fill="none"
            stroke={color ?? (color || '#171717')}
            strokeLinecap="round"
            strokeWidth="1"
          />
        </g>
      </svg>
    </>
  );
};
export default SVG;
