import * as React from 'react';
import { Image } from '../types';

const useStorageState = (imageSources: Image[]) => {
  const [sourceImages, setSourceImages] = React.useState<Image[]>(() => {
    const sourceImageStorage = window.localStorage.getItem('sourceImageStore');

    return sourceImageStorage !== null
      ? JSON.parse(sourceImageStorage)
      : imageSources;
  });

  React.useEffect(() => {
    window.localStorage.setItem(
      'sourceImageStore',
      JSON.stringify(sourceImages),
    );
  }, [sourceImages]);

  return { sourceImages, setSourceImages };
};

export default useStorageState;
