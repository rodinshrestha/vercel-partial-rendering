import React from "react";

import { SectionSettings } from "@/builder/types/builder.types";

import VimeoEmbed from "../../../BackgroundContent/components/VimeoEmbed";
import WistiaEmbed from "../../../BackgroundContent/components/WistiaEmbed";
import BackgroundImage from "../BackgroundImage";

type Props = {
  section_settings: SectionSettings;
};

export const IMAGE = "image";
export const VIDEO = "video";

/**
 *
 * @param param Section settings  of the module
 * @returns It will render image, video or null
 */
export const BackgroundContent = ({ section_settings }: Props): JSX.Element => {
  const imageURL =
    section_settings.section_background.section_background_image ??
    "/images/banner.jpg";
  const backgroundType =
    section_settings.section_background.section_background_type;
  const videoType =
    section_settings.section_background.section_video_type ?? "";
  const videoLink =
    section_settings.section_background.section_video_link ?? "";

  const imageObjectFit =
    section_settings.section_background.section_background_size ?? "cover";

  switch (backgroundType) {
    case IMAGE:
      return <BackgroundImage src={imageURL} imageObjectFit={imageObjectFit} />;

    case VIDEO:
      return getVideoPlayer(videoType, videoLink);
    default:
      return <span />;
  }
};

export const getVideoPlayer = (
  type: string,
  id: string,
  controls?: boolean
) => {
  switch (type) {
    case "vimeo":
      return <VimeoEmbed id={id} controls={controls} />;

    case "wistia":
      return <WistiaEmbed id={id} controls={controls} />;

    default:
      return <div>Video player not found</div>;
  }
};
