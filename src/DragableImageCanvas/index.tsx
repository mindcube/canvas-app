/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import Canvas from './Canvas';
import useCanvas from './hooks/useCanvas';
import { Image as ImageInterface } from './types';

interface Props {
  imageSources: ImageInterface[];
}

/**
 * DraggalbaleImageCanvas
 *
 * A smart component that wraps a child Canvas component to control context and drawing
 * of images.
 *
 * @param imageSources Array of image source objects that define what images to draw
 */
const DraggableImageCanvas: React.FC<Props> = ({ imageSources }: Props) => {
  const [images, setImages] = React.useState<HTMLImageElement[] | null>(null);
  const [sourceImages, setSourceImages] = React.useState(imageSources);

  const draw = (context: CanvasRenderingContext2D | null) => {
    if (context && images) {
      context.clearRect(
        0,
        0,
        context.canvas.clientWidth,
        context.canvas.clientHeight,
      );
      for (let i = 0; i < images.length; i++) {
        context.drawImage(
          images[i],
          sourceImages[i].x,
          sourceImages[i].y,
          sourceImages[i].w,
          sourceImages[i].h,
        );
        context.strokeStyle = sourceImages[i].borderColor;
        context.lineWidth = 2;
        context.strokeRect(
          sourceImages[i].x,
          sourceImages[i].y,
          sourceImages[i].w,
          sourceImages[i].h,
        );
      }
    }
  };

  const { canvasRef } = useCanvas({ draw });

  React.useEffect(() => {
    const canvas: HTMLCanvasElement = canvasRef.current as HTMLCanvasElement;
    const context = canvas.getContext('2d');

    setImages(
      sourceImages.map((image) => {
        const img = new Image();
        img.src = image.src;
        img.onload = () => {
          if (context) {
            context.drawImage(img, image.x, image.y, image.w, image.h);
            context.strokeStyle = image.borderColor;
            context.lineWidth = 2;
            context.strokeRect(image.x, image.y, image.w, image.h);
          }
        };
        return img;
      }),
    );
  }, []);

  return (
    <Canvas
      canvasRef={canvasRef}
      sourceImages={imageSources}
      setSourceImages={setSourceImages}
    />
  );
};

export default DraggableImageCanvas;
