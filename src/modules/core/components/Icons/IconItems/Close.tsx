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
  className,
  viewBox = '0 0 14.485 14.485',
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
          id="Group_681"
          data-name="Group 681"
          transform="translate(-271.399 -13.117)"
        >
          <path
            id="Path_85"
            data-name="Path 85"
            d="M9975.178,9178.824l-13.071,13.071"
            transform="translate(-9690 -9165)"
            fill="none"
            stroke={color ?? (color || '#171717')}
            strokeLinecap="round"
            strokeWidth="1"
          />
          <path
            id="Path_86"
            data-name="Path 86"
            d="M9962.107,9178.824l13.071,13.071"
            transform="translate(-9690.001 -9165)"
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
