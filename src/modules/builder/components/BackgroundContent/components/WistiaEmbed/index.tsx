import React from "react";

// import clsx from 'clsx';

import { StyledDiv } from "./style";

/**
 * Wistia Embed
 *
 * @reference https://wistia.com/support/developers/embed-options
 * @example http://mds.is/hacking-wistia/
 * @returns
 */

type Props = {
  id: string;
  controls?: boolean;
};
const WistiaEmbed = ({ id, controls = false }: Props) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [video, setVideo] = React.useState<any>(null);
  const [isPaused, setIsPaused] = React.useState(false);

  React.useEffect(() => {
    (window as any)._wq = (window as any)._wq || [];

    if (!document.getElementById("wistia_script")) {
      const wistiaScript = document.createElement("script");
      wistiaScript.id = "wistia_script";
      wistiaScript.type = "text/javascript";
      wistiaScript.src = "https://fast.wistia.com/assets/external/E-v1.js";
      wistiaScript.async = true;
      document.body.appendChild(wistiaScript);
    }

    (window as any)._wq.push({
      id: "_all",
      onReady: myOnReady,
      options: {
        // PLAYBACK
        preload: true,
        muted: controls ? false : true,
        playsinline: false,
        autoPlay: controls ? false : true,
        silentAutoPlay: controls ? false : true,
        endVideoBehavior: "loop",

        // LAYOUT
        fitStrategy: "cover",
        videoFoam: true,

        // TRACKING
        copyLinkAndThumbnailEnabled: false,
        doNotTrack: true,
        googleAnalytics: false,
        seo: false,
        volume: 100,

        // DEFAULT QUALITY
        qualityMax: true,
        qualityMin: true,

        // UI CONTROLS
        controlsVisibleOnLoad: false,
        fullscreenOnRotateToLandscape: false,
        fullscreenButton: false,
        settingsControl: false,

        // volumeControl: controls ? true : false,
        qualityControl: false,
        playButton: false,
        playbar: false,
        playbackRateControl: false,
        smallPlayButton: false,
        controls: false,
      },
    });

    // const video =  Wistia.api(id)
  }, [controls]);

  React.useEffect(() => {
    if (!video) return;

    return () => {
      video.remove();
    };
  }, [video]);

  const myOnReady = (video: any) => {
    setVideo(video);
  };

  return (
    <StyledDiv
      className={`wistia-video ${
        controls ? "default-style" : "wistia-video-section"
      }`}
    >
      <div
        className="wista-wrap"
        onClick={() => {
          if (!isPaused) {
            video.pause();
          } else {
            video.play();
          }
          setIsPaused((p) => !p);
        }}
      >
        {/* {controls && (
          <>
            <div
              onClick={() => {
                video.play();
                setIsPaused(false);
              }}
              className={clsx('play-btn', { 'is-playing': !isPaused })}
            >
              <i className={clsx(isPaused ? 'icon-play' : 'icon-pause')} />
            </div>

            <div
              className={clsx('toggle-fullscreen', { hide: isPaused })}
              onClick={() => video.requestFullscreen()}
            >
              <i className="icon-fullscreen" />
            </div>
          </>
        )} */}
        {/* {controls && !isPaused && (
          <div
            className="play-btn is-playing control-overlay"
            onClick={() => {
              video.pause();
              setIsPaused(true);
            }}
          />
        )} */}
        <div
          ref={ref}
          className={`wistia_embed wistia_async_${id} wistia_video `}
          style={{ pointerEvents: "none" }}
        />
      </div>
    </StyledDiv>
  );
};

export default WistiaEmbed;
