'use client';
import React from 'react';

import Vimeo from '@u-wave/react-vimeo';
import clsx from 'clsx';

import { StyledDiv } from './style';

type ViemoEmbedProps = {
  /** Id of video */
  id: string;

  /** video auto play, default: true */
  autoplay?: boolean;

  /** Video control access, default: false */
  controls?: boolean;
};

const VimeoEmbed = ({
  id,
  // autoplay = true,
  controls = false,
}: ViemoEmbedProps) => {
  const [isPaused, setIsPaused] = React.useState(false);

  const ref = React.useRef<any>(null);

  function toggleFullScreen() {
    const document = ref.current?.container;

    if (
      !document.fullscreenElement && // alternative standard method
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if (document.requestFullscreen) {
        document.requestFullscreen();
      }
      // } else if (document.msRequestFullscreen) {
      //   setControl(true);
      //   document.msRequestFullscreen();
      // } else if (document.mozRequestFullScreen) {
      //   setControl(true);
      //   document.mozRequestFullScreen();
      // } else if (document.webkitRequestFullscreen) {
      //   setControl(true);
      //   document.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      // }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      // else if (document.msExitFullscreen) {
      //   setControl(false);
      //   document.msExitFullscreen();
      // } else if (document.mozCancelFullScreen) {
      //   setControl(false);
      //   document.mozCancelFullScreen();
      // } else if (document.webkitExitFullscreen) {
      //   setControl(false);
      //   document.webkitExitFullscreen();
      // }
    }
  }

  return (
    <StyledDiv className={clsx('vimeo-video-section')}>
      <div className="vimeo-wrap" onClick={() => setIsPaused((p) => !p)}>
        {controls && (
          <>
            <div
              onClick={() => setIsPaused(false)}
              className={clsx('play-btn', { 'is-playing': !isPaused })}
            >
              <i className={clsx(isPaused ? 'icon-play' : 'icon-pause')} />
            </div>

            <div
              onClick={toggleFullScreen}
              className={clsx('toggle-fullscreen', { hide: isPaused })}
            >
              <i className="icon-fullscreen" />
            </div>
          </>
        )}

        <Vimeo
          id="myIframe"
          ref={ref}
          autopause={false}
          className="vimeo_embed"
          video={id}
          volume={controls ? 1 : 0}
          controls={false}
          loop={true}
          // playing={autoplay}
          muted={controls ? false : true}
          autoplay={controls ? false : true}
          showTitle={false}
          playsInline={true}
          paused={isPaused}
        />
        {controls && !isPaused && (
          <div
            className="play-btn is-playing control-overlay"
            onClick={() => {
              setIsPaused(true);
            }}
          />
        )}
      </div>
    </StyledDiv>
  );
};

export default VimeoEmbed;
