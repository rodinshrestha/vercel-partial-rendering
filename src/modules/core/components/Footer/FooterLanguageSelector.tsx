"use client";
import React from "react";

import styled, { css } from "styled-components";
import { rem } from "polished";

import type { ChannelsType } from "@/core/types/channels.types";
import SelectField from "@/core/components/FormField/SelectField";
import toastAlert from "@/core/utils/toast";
import useHeaders from "@/core/hooks/useHeaders";

type Props = {
  channelList: ChannelsType;
  className?: string;
};

type optionType = {
  label: string;
  value: string;
};
const FooterLanguageSelector = ({ channelList = [], className }: Props) => {
  const { channel, store } = useHeaders();
  // const {clientHeaders} = useHeaders();

  const [selectedChannel, setSelectedChannel] = React.useState<
    string | string[] | null
  >(channel);

  const channelOpts = React.useMemo(() => {
    if (!channelList) return [];

    return channelList.reduce(
      (acc: Array<{ label: string; value: string }>, iterator) => {
        const { stores = [], name = "", code = "" } = iterator || {};

        if (!stores.length || !name || !code) {
          return acc;
        }

        return [...acc, { label: name, value: code }];
      },
      []
    );
  }, [channelList]);

  const handleChannelChange = (e: optionType) => {
    const { value } = e;

    const selectedChannel = channelList.find((el) => el.code === value);

    if (!selectedChannel) {
      toastAlert(
        "Selected channel is not found in country list",
        "custom-error"
      );
      return;
    }

    if (!selectedChannel?.hostname) {
      toastAlert("Please set domain name from dashboard", "custom-error");
      return;
    }

    const newStore =
      selectedChannel?.default_store || selectedChannel.stores[0]?.code || "";

    if (!newStore) {
      toastAlert("store code is empty", "custom-error");
      return;
    }

    if (channel === selectedChannel.code && store === newStore) {
      return;
    }

    setSelectedChannel(selectedChannel.code);

    window.location.href = `https://${selectedChannel.hostname}`;
  };

  return (
    <StyleWrapper className={className}>
      <SelectField
        label="Country"
        name="channel"
        options={channelOpts}
        placeholder="Select Channel"
        value={selectedChannel}
        onChange={handleChannelChange}
        classNamePrefix="country"
      />
    </StyleWrapper>
  );
};

export default FooterLanguageSelector;

export const StyleWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    margin-bottom: ${rem(26)};
    padding: 0;
    margin-left: -5px;
    margin-right: -5px;

    @media (max-width: ${theme.breakPoints.mobile}) {
      margin-bottom: ${rem(20)};
    }

    .custom-select {
      /* flex: 0 0 50%;
      max-width: 50%; */
      padding: 0 ${rem(5)};

      .form-group {
        margin-bottom: 0;
      }

      label {
        font-size: ${rem(11)};
        line-height: ${rem(13)};
        text-transform: uppercase;
        ${theme.fontFamily.regular}
      }

      .basic-select {
        .select {
          &__control {
            border-color: ${theme.coreColor.body.default.background};
            line-height: inherit;

            .select__value-container {
              padding: 0;

              .select__single-value,
              .select__placeholder,
              .select__input-container {
                font-size: ${rem(12)};
                color: inherit;
                text-transform: uppercase;
                ${theme.fontFamily.regular}
              }
            }
          }
        }

        .select__indicator {
          svg {
            path {
              stroke: ${theme.coreColor.body.default.color};
            }
          }
        }

        & + .customSelect {
          @media (max-width: 767px) {
            margin-top: ${rem(25)};
          }
        }
      }
    }

    .select__menu {
      &-list {
        .select__option {
          & + .select__option {
            border-top: 1px solid rgba(242, 242, 242, 0.5);
          }
        }
      }
    }

    &.single-selector {
      margin: ${rem(30)} 0 0;

      @media (max-width: ${theme.breakPoints.mobile}) {
        justify-content: center;
        margin-bottom: ${rem(50)};
      }

      .custom-select {
        padding-left: 0;

        label {
          display: none;
        }

        .select__control {
          padding: 0;
          border: 0;

          .select__single-value {
            margin: 0;
          }
        }
      }
    }

    &.header-selector {
      margin-top: 0;

      @media (max-width: ${theme.breakPoints.tablet}) {
        justify-content: left;
        margin-top: ${rem(10)};
        margin-bottom: ${rem(25)};
      }

      .basic-select {
        .select {
          &__control {
            border-color: ${theme.coreColor.body.default.background};
            line-height: inherit;
            min-height: 20px;

            .select__value-container {
              padding: 0;

              .select__single-value,
              .select__placeholder,
              .select__input-container,
              .select__input {
                ${theme.fontFamily.regular}
                text-align: right;
                font-size: ${rem(14)};
                letter-spacing: ${rem(1.4)};
                text-transform: uppercase;
                margin: 0;
                padding: 0 3px;

                @media (max-width: ${theme.breakPoints.desktop}) {
                  font-size: ${rem(12)};
                  letter-spacing: ${rem(1.2)};
                  line-height: ${rem(20)};
                }
              }

              .select__input-container {
                max-width: 100px;
              }
            }

            .select__indicator {
              padding: 0;

              svg {
                width: 12px;
                height: 12px;
                position: relative;
                top: -2px;

                path {
                  stroke-width: 2px;
                }
              }
            }
          }
        }
      }
    }
  `}
`;
