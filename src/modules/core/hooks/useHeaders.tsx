"use client";

import React from "react";

import { HeaderContext } from "../providers/HeadersProvider";

/**
 * Gives context of headers (http-only cookie, headers) from server components
 * @returns
 */
const useHeaders = () => React.useContext(HeaderContext);
export default useHeaders;
