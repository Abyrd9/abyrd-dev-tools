import { useState, useEffect } from 'react';

const errorMessage =
  "matchMedia is not supported, this could happen both because window.matchMedia is not supported by your current browser or you're using the useMediaQuery hook whilst server side rendering.";

const isNotSupported = typeof window === 'undefined' || !('matchMedia' in window);

const useMediaQuery = (mediaQuery) => {
  if (isNotSupported) {
    console.warn(errorMessage);
  }

  let matches = isNotSupported ? false : !!window.matchMedia(mediaQuery).matches;
  const [isVerified, setIsVerified] = useState(matches);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(mediaQuery);
    const documentChangeHandler = () => setIsVerified(!!mediaQueryList.matches);
    mediaQueryList.addListener(documentChangeHandler);

    documentChangeHandler();
    return () => {
      mediaQueryList.removeListener(documentChangeHandler);
    };
  }, [mediaQuery]);

  return isVerified;
};

export default useMediaQuery;
