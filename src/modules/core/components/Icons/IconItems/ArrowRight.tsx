'use client';

import clsx from 'clsx';

type Props = {
  color?: string;
  size?: number;
  className?: string;
  viewBox?: string;
  hideCircle?: boolean;
};

export type IconProps = Props;
const SVG = ({
  color,
  size = 14,
  className = '',
  viewBox = '0 0 18 21',
}: IconProps) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={clsx('svg-icon', 'arrow', className)}
        viewBox={viewBox}
        width={size}
        height={size}
      >
        <text
          id="_"
          data-name="→"
          transform="translate(9 17)"
          fill={color ?? (color || '#171717')}
          fontSize={size || '18'}
          fontFamily="LucidaGrande, Lucida Grande"
          letterSpacing="0.1em"
        >
          <tspan x="-9" y="0">
            →
          </tspan>
        </text>
      </svg>
    </>
  );
};
export default SVG;
