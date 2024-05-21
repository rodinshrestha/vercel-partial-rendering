import "server-only";

import { executeFetch } from "@/lib/execute-fetch";

import { ChannelsType } from "../types/channels.types";

/** Fetches all channels */
export const getChannels = async (headers: HeadersInit) => {
  const response = await executeFetch("/sf/channels", {
    headers,
    cache: "force-cache",
    next: {
      tags: ["channels", "all"],
    },
  });

  return (await response.json()) as { data: ChannelsType };
};
