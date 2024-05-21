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
  viewBox = '0 0 19.178 16.558',
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
        <g id="heart-solid" transform="translate(0.5 0.513)">
          <path
            id="heart-solid-2"
            data-name="heart-solid"
            d="M1.69,51.32l6.415,5.989a1.443,1.443,0,0,0,1.967,0l6.415-5.989a5.311,5.311,0,0,0,1.69-3.888v-.206a5.075,5.075,0,0,0-8.663-3.589l-.426.426-.426-.426A5.075,5.075,0,0,0,0,47.226v.206A5.311,5.311,0,0,0,1.69,51.32Z"
            transform="translate(0 -42.151)"
            fill="none"
            stroke={color ?? (color || '#171717')}
            strokeWidth="1"
          />
        </g>
      </svg>
    </>
  );
};
export default SVG;
