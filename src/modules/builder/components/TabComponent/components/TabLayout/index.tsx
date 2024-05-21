import React from 'react';

import clsx from 'clsx';

import ImageWithFallback from '@/core/components/ImageWithFallback';
import ReactHtmlParser from '@/core/components/ReactHtmlParser';

import { TabLayoutData } from '../../tab-component.modules.types';

import { StyledDiv } from './style';

type Props = {
  tabLayoutList: Array<TabLayoutData>;
};

const TabLayout = ({ tabLayoutList }: Props) => {
  const [selectedTab, setSelectedTab] = React.useState(
    Array.isArray(tabLayoutList) ? tabLayoutList[0]?.title : ''
  );

  return (
    <StyledDiv className="simple-tab-container">
      <div className="tab-container">
        <div className="simple-tab-list">
          {tabLayoutList.map((item, i) => {
            return (
              <div className="tab-item" key={i}>
                <div
                  className={clsx('simple-tab', {
                    active: item.title === selectedTab,
                  })}
                  onClick={() => setSelectedTab(item.title)}
                >
                  {item.title}
                </div>
              </div>
            );
          })}
        </div>

        {tabLayoutList.map((item, i) => {
          if (selectedTab !== item.title) return;

          return (
            <div className="tab-content" key={i}>
              {item.content_type === 'image' ? (
                <div className="tab-content-image">
                  <ImageWithFallback
                    src={item.image ?? ''}
                    alt={item.title}
                    fill
                  />
                </div>
              ) : (
                <div className="simple-tab-content">
                  {ReactHtmlParser(item.texteditor ?? '')}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </StyledDiv>
  );
};

export default TabLayout;
