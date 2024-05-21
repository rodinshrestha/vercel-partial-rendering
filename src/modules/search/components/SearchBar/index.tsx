'use client';

import React from 'react';

import clsx from 'clsx';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import Link from '@/core/components/Link';
import Loader from '@/core/components/Loader';
import useTranslations from '@/core/hooks/useTranslations';
import { publicAxios } from '@/core/utils/axios';
import useHeaders from '@/core/hooks/useHeaders';
import { SearchType } from '@/search/types/search.types';
import { IconClose, IconSearch } from '@/core/components/Icons';
import useNavMenuStore from '@/core/components/Header/store/useNavMenuStore';
import useMediaQuery from '@/core/hooks/useMediaQuery';
import { breakPoints } from '@/theme/breakPoints';

import SearchList from '../SearchList';

import { StyleLoader, StyledDiv } from './style';

type props = {
  onHandleClose?: () => void;
  className?: string;
};

/** Search Bar */
const SearchBar = ({ className, onHandleClose }: props) => {
  const search = useSearchParams();
  const [searchValue, setSearchValue] = React.useState(search.get('q') || '');
  const [searchData, setSearchedData] = React.useState<SearchType | null>(null);
  const [loader, setLoader] = React.useState(false);
  const [isSearchListOpen, setIsSearchListOpen] = React.useState(false);
  const [searchLoader, setSearchLoader] = React.useState(false);

  const { clientHeaders } = useHeaders();
  const { closeNavMenuDrawer } = useNavMenuStore();
  const isMobile = useMediaQuery(breakPoints.mobile);

  const pathname = usePathname();
  const router = useRouter();
  const { _t } = useTranslations();
  const ref = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const searchURL = 'sf/catalog/search?q=';

  const searchRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    searchRef.current?.focus();
  }, []);

  React.useEffect(() => {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        onHandleClose?.();
        closeNavMenuDrawer();
      }
    });

    return () => {
      window.removeEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          onHandleClose?.();
          closeNavMenuDrawer();
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (ref.current) clearTimeout(ref.current);

    const { value } = e.target;

    if (!value.trim()) {
      setSearchedData(null);
      setIsSearchListOpen(false);
      setSearchValue('');
      setLoader(false);
      return;
    }

    setSearchValue(value);
    setIsSearchListOpen(true);
    setLoader(true);

    ref.current = setTimeout(() => {
      publicAxios
        .get(`${searchURL}${value}`, { headers: clientHeaders })
        .then((res) => setSearchedData(res.data.data))
        .finally(() => {
          setLoader(false);
        });
    }, 1e3);
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchValue) return;
    onHandleClose?.();
    router.push(`/search?q=${searchValue}`);
    setIsSearchListOpen(false);

    if (isMobile) {
      closeNavMenuDrawer();
    }
  };

  return (
    <StyledDiv className={clsx(className, 'search-bar')}>
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          placeholder={`${_t('search', 'Search')}...`}
          onChange={handleChange}
          value={searchValue}
          onFocus={() => !!searchValue.length && setIsSearchListOpen(true)}
          onKeyUp={(e) => {
            //escape
            if (e.key.toLowerCase() === 'escape') {
              setIsSearchListOpen(false);
            }
          }}
          ref={searchRef}
        />
        <div className="btn-wrap">
          {searchLoader ? (
            <StyleLoader>
              <Loader color="primary" size="14px" />
            </StyleLoader>
          ) : (
            <Link
              href={searchValue && `/search?q=${searchValue}`}
              onClick={() => {
                if (!searchValue) return;
                setSearchLoader(true);
                setTimeout(() => {
                  setSearchLoader(false);
                  setIsSearchListOpen(false);
                }, 900);
              }}
            >
              <i className="icon-search" />
              <IconSearch size={14} />
            </Link>
          )}
        </div>
        {searchValue && (
          <div className="btn-wrap remove-btn">
            <span
              className="close"
              onClick={() => {
                router.push(pathname);
                setSearchValue('');
              }}
            >
              {/* <i className="icon-close" /> */}
              <IconClose size={12} />
            </span>
          </div>
        )}
      </form>

      {searchValue && (
        <div className="info">
          {_t(
            'press_enter_to_see_more_results',
            'Press enter to see more results'
          )}
        </div>
      )}

      {searchValue && isSearchListOpen && (
        <SearchList
          searchData={searchData}
          loader={loader}
          setIsSearchListOpen={setIsSearchListOpen}
          onHandleClose={onHandleClose}
        />
      )}
    </StyledDiv>
  );
};

export default SearchBar;
