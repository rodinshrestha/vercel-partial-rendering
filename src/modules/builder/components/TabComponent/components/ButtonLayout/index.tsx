import React from 'react';

import clsx from 'clsx';

import Button from '@/core/components/Button';
import ImageWithFallback from '@/core/components/ImageWithFallback';
import ReactHtmlParser from '@/core/components/ReactHtmlParser';

import { ButtonLayoutData } from '../../tab-component.modules.types';

import { StyledDiv } from './style';
import { initializeButtonLayout } from './helpers';

type Props = {
  button_layout: Array<ButtonLayoutData>;
};

const ButtonLayout = ({ button_layout }: Props) => {
  const [seletedTab, setSelectedTab] = React.useState(
    initializeButtonLayout(button_layout)
  );

  const handleClick = (item: ButtonLayoutData) => {
    if (item.button_label !== seletedTab.buttonTitle) {
      setSelectedTab({
        buttonTitle: item.button_label,
        buttonChildren: item.button_layout_repeater,
        content_type: item.content_type,
        selectedSubButton: item.button_layout_repeater[0].repeater_button_label,
        renderContent:
          item.button_layout_repeater[0].texteditor ||
          item.button_layout_repeater[0].image,
      });
    }
  };

  return (
    <StyledDiv className="button-tab-container">
      <div className="btn-repeater-container">
        <div className="btn-repeater-list">
          {button_layout.map((item, i) => {
            return (
              <div
                key={i}
                className={clsx('btn-container', {
                  active: item.button_label === seletedTab.buttonTitle,
                })}
              >
                <Button
                  size="lg"
                  variant={
                    item.button_label === seletedTab.buttonTitle
                      ? 'contained'
                      : 'outline'
                  }
                  skin="secondary"
                  className="custom-btn"
                  onClick={() => handleClick(item)}
                >
                  {item.button_label}
                </Button>
              </div>
            );
          })}
        </div>
        {seletedTab.buttonChildren.length ? (
          <div className="btn-repeater-list">
            {seletedTab.buttonChildren &&
              seletedTab.buttonChildren?.map((x, i) => {
                if (!x.content_type) return;

                return (
                  <div
                    className={clsx('btn-container', {
                      active:
                        x.repeater_button_label ===
                        seletedTab.selectedSubButton,
                    })}
                    key={i}
                  >
                    <Button
                      size="lg"
                      skin="secondary"
                      variant={
                        x.repeater_button_label === seletedTab.selectedSubButton
                          ? 'contained'
                          : 'outline'
                      }
                      onClick={() =>
                        setSelectedTab((prev) => ({
                          ...prev,
                          content_type: x.content_type,
                          selectedSubButton: x.repeater_button_label,
                          renderContent: x?.image || x?.texteditor || null,
                        }))
                      }
                    >
                      {x.repeater_button_label || ''}
                    </Button>
                  </div>
                );
              })}
          </div>
        ) : null}
      </div>
      {seletedTab.renderContent ? (
        <div className="btn-render-content">
          {seletedTab.content_type === 'image' ? (
            <div className="btn-image-container">
              <ImageWithFallback
                src={seletedTab.renderContent ?? ''}
                alt={seletedTab.buttonTitle}
                fill
                priority
              />
            </div>
          ) : (
            <p>
              {ReactHtmlParser(
                seletedTab.renderContent.replaceAll('&nbsp;', ' ')
              )}
            </p>
          )}
        </div>
      ) : (
        'test'
      )}
    </StyledDiv>
  );
};

export default ButtonLayout;
