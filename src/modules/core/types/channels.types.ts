export type Channels = {
  [key: string]: CountryCodeDetailType;
} | null;

export type CountryCodeDetailType = {
  channel_code: string;
  code: string;
  name: string;
  stores: {
    [key: string]: string;
  };
};

export type ChannelsType = Array<ChannelDetailsType>;

export type ChannelDetailsType = {
  id: string;
  name: string;
  code: string;
  is_default: boolean;
  status: 1 | 0;
  icon: string;
  currency: string;
  default_store: string;
  stores: Array<storeType>;
  type: string;
  area: Array<string>;
  hostname: string;
};

export type storeType = {
  id: string;
  channel_id: string;
  name: string;
  code: string;
  position: number;
  status: 1 | 0;
};
