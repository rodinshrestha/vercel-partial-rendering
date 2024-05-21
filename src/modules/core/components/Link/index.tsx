"use client";

import React from "react";

import NextLink from "next/link";

// TODO: RESEARCH THIS TYPE for functions returning the link
export type HrefType = LinkProps["asSelfLink"] extends true
  ? `http${string}`
  : `/${string}` | "#" | string;

type LinkProps = {
  href: HrefType;
  children?: React.ReactNode;
  asSelfLink?: boolean;
  label?: string;
  className?: string;
  newTab?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  title?: string;
  style?: React.CSSProperties;
};

const Link = ({
  href = "#",
  children,
  label,
  className,
  newTab = false,
  title,
  style,
  ...rest
}: LinkProps) => {
  return (
    <NextLink
      href={href}
      target={newTab ? "_blank" : ""}
      className={className}
      {...rest}
      prefetch
      title={title || label || ""}
      style={style}
    >
      {label ?? children}
    </NextLink>
  );
};

export default Link;
