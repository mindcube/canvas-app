import * as React from 'react';
import { Image, UserAction } from './types';

interface Props {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  sourceImages: Image[];
  setSourceImages: React.Dispatch<React.SetStateAction<Image[]>>;
  setUserActions: React.Dispatch<
    React.SetStateAction<UserAction[] | undefined>
  >;
}

let isMouseDown = false;
let startX: number | null = null;
let startY: number | null = null;

const Canvas: React.FC<Props> = ({
  canvasRef,
  sourceImages,
  setSourceImages,
  setUserActions,
}: Props) => {
  const [dragTargetIndex, setDragTargetIndex] = React.useState<number>(-1);

  const updateSourceImage = (sourceImage: Image) => {
    setSourceImages(
      sourceImages.map((image, i) => {
        if (i === dragTargetIndex) {
          return sourceImage;
        }
        return image;
      }),
    );
  };

  const saveUserAction = (
    targetIndex: number,
    imageX: number,
    imageY: number,
  ) => {
    setUserActions((prev) => {
      if (prev && prev.length) {
        return [
          ...(prev as UserAction[]),
          {
            imageIndex: targetIndex,
            imageX: imageX,
            imageY: imageY,
          },
        ];
      }

      return [
        {
          imageIndex: targetIndex,
          imageX: imageX,
          imageY: imageY,
        },
      ];
    });
  };

  const inActiveArea = (x: number, y: number) => {
    let active = false;
    for (let i = 0; i < sourceImages.length; i++) {
      const image = sourceImages[i];
      if (
        x >= image.x &&
        x <= image.x + image.w &&
        y >= image.y &&
        y <= image.y + image.h
      ) {
        active = true;
        setDragTargetIndex(i);
        highlightBorder(i, true);
        saveUserAction(i, image.x, image.y);
        break;
      }
    }
    return active;
  };

  const highlightBorder = (index: number, active: boolean) => {
    const sourceImage = sourceImages[index];
    sourceImage.borderColor = `rgba(0, 255, 0, ${active ? '1' : '0'}`;

    updateSourceImage(sourceImage);
  };

  const handleMouseDown = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  ) => {
    if (canvasRef && canvasRef.current) {
      startX = e.nativeEvent.offsetX - canvasRef.current.clientLeft;
      startY = e.nativeEvent.offsetY - canvasRef.current.clientTop;
      isMouseDown = inActiveArea(startX, startY);
    }
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  ) => {
    if (!isMouseDown) return;
    if (canvasRef && canvasRef.current && !!startX && !!startY) {
      const dragTarget = sourceImages[dragTargetIndex as number];
      const mouseX = e.nativeEvent.offsetX - canvasRef.current.clientLeft;
      const mouseY = e.nativeEvent.offsetY - canvasRef.current.clientTop;
      const dx = mouseX - startX;
      const dy = mouseY - startY;
      startX = mouseX;
      startY = mouseY;
      dragTarget.x += dx;
      dragTarget.y += dy;

      const relTop = dragTarget.y - mouseY;
      const relRight = dragTarget.w - mouseX;
      const relLeft = dragTarget.x - mouseX;

      // top boundry hit
      if (e.nativeEvent.offsetY < Math.abs(relTop)) {
        dragTarget.y = 0;
      }

      // left boundry hit
      if (e.nativeEvent.offsetX < Math.abs(relLeft)) {
        dragTarget.x = 0;
      }

      // right boundry hit
      if (
        e.nativeEvent.offsetX + relRight + dragTarget.x >
        canvasRef.current.clientWidth
      ) {
        dragTarget.x = canvasRef.current.clientWidth - dragTarget.w;
      }

      // bottom boundry hit
      if (dragTarget.y + dragTarget.h > canvasRef.current.clientHeight) {
        dragTarget.y = canvasRef.current.clientHeight - dragTarget.h;
      }

      updateSourceImage(dragTarget);
    }
  };

  const handleMouseUp = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  ) => {
    if (dragTargetIndex > -1) {
      highlightBorder(dragTargetIndex, false);
    }
    setDragTargetIndex(-1);

    isMouseDown = false;
  };

  const handleMouseOut = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  ) => {
    handleMouseUp(e);
  };

  return (
    <canvas
      className="Canvas"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseOut={handleMouseOut}
      onMouseUp={handleMouseUp}
      ref={canvasRef}
    />
  );
};

export default Canvas;
