/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import styled from 'styled-components';
import Canvas from './Canvas';
import useCanvas from './hooks/useCanvas';
import { Image as ImageInterface, UserAction } from './types';

const UndoButton = styled.button`
  font-size: 30px;
  margin-top: 15px;
  padding: 5px 10px;
  border-style: none;
`;

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
  const [userActions, setUserActions] = React.useState<UserAction[]>();

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

  const handleUndoClick = () => {
    if (userActions && userActions.length) {
      setSourceImages((prev) => {
        const lastUserCoords = userActions[userActions.length - 1];

        prev[lastUserCoords.imageIndex].x = lastUserCoords.imageX;
        prev[lastUserCoords.imageIndex].y = lastUserCoords.imageY;

        return [...prev];
      });
      setUserActions(
        userActions.filter((item, index) => index !== userActions.length - 1),
      );
    }
  };

  return (
    <>
      <Canvas
        canvasRef={canvasRef}
        sourceImages={imageSources}
        setSourceImages={setSourceImages}
        setUserActions={setUserActions}
      />
      <UndoButton
        disabled={!userActions || userActions.length === 0}
        onClick={handleUndoClick}
      >
        Undo
      </UndoButton>
    </>
  );
};

export default DraggableImageCanvas;
