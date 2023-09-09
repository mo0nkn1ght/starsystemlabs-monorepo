import { useEffect } from 'react';

const useLink = (url: string) => {
  useEffect(() => {
    const link = document.createElement('link');

    link.rel = 'stylesheet';
    link.href = url;

    document.body.appendChild(link);

    return () => {
      document.body.removeChild(link);
    };
  }, [url]);
};

export default useLink;
