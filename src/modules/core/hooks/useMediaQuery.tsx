import React from 'react';

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = React.useState(false);

  const mediaQuery = React.useCallback(() => {
    const media = window.matchMedia(`(max-width: ${query})`);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    setMatches(media.matches);
  }, [matches, query]);

  React.useEffect(() => {
    mediaQuery();
    window.addEventListener('resize', mediaQuery);
    window.addEventListener('load', mediaQuery);

    return () => {
      window.removeEventListener('resize', mediaQuery);
      window.removeEventListener('load', mediaQuery);
    };
  }, [matches, query, mediaQuery]);

  return matches;
};

export default useMediaQuery;
