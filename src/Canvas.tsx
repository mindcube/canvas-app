import * as React from 'react';
import './App.css';

interface Image {
  borderColor: string;
  src: string;
  x: number;
  y: number;
  h: number;
  w: number;
}

const sourceImages = [
  {
    borderColor: 'rgba(0, 255, 0, 0)',
    src:
      'data:image/png;base64,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',
    x: 0,
    y: 0,
    h: 176,
    w: 183,
  },
  {
    borderColor: 'rgba(0, 255, 0, 0)',
    src:
      'data:image/png;base64,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',
    x: 183,
    y: 0,
    h: 200,
    w: 200,
  },
];

const Canvas: React.FC = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  let isMouseDown = false;
  let dragTarget: Image | null = null;
  let startX: number | null = null;
  let startY: number | null = null;

  const [imageElements, setImageElements] = React.useState<
    HTMLImageElement[] | null
  >(null);

  React.useEffect(() => {
    const canvas: HTMLCanvasElement = canvasRef.current as HTMLCanvasElement;
    const context = canvas && canvas.getContext('2d');

    const images: HTMLImageElement[] = [];

    // initial load for each image
    sourceImages.forEach((image) => {
      const img = new Image();
      img.src = image.src;
      img.onload = () => {
        if (context) {
          context.drawImage(img, image.x, image.y, image.w, image.h);
          context.strokeStyle = image.borderColor;
          context.lineWidth = 2;
          context.strokeRect(image.x, image.y, image.w, image.h);
        }
        images.push(img);
      };
    });

    setImageElements(images);

    function updateSize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerWidth * 0.5625;
      draw(images);
    }
    updateSize();

    window.addEventListener('resize', updateSize);

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const draw = (
    images: HTMLImageElement[] = imageElements as HTMLImageElement[],
  ) => {
    const canvas: HTMLCanvasElement = canvasRef.current as HTMLCanvasElement;
    const context = canvas && canvas.getContext('2d');

    if (context && canvasRef && canvasRef.current) {
      context.clearRect(
        0,
        0,
        canvasRef.current.clientWidth,
        canvasRef.current.clientHeight,
      );
    }
    for (let i = 0; i < images.length; i++) {
      if (context && images[i]) {
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
        dragTarget = image;
        active = true;
        break;
      }
    }
    return active;
  };

  const handleMouseDown = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  ) => {
    if (canvasRef && canvasRef.current) {
      startX = e.nativeEvent.offsetX - canvasRef.current.clientLeft;
      startY = e.nativeEvent.offsetY - canvasRef.current.clientTop;
      isMouseDown = inActiveArea(startX, startY);

      if (dragTarget) dragTarget.borderColor = 'rgba(0, 255, 0, 1)';
    }
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  ) => {
    if (!isMouseDown) return;
    if (canvasRef && canvasRef.current && startX && startY && dragTarget) {
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
    }
    draw();
  };

  const handleMouseUp = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  ) => {
    if (dragTarget) dragTarget.borderColor = 'rgba(0, 255, 0, 0)';

    dragTarget = null;
    isMouseDown = false;

    draw();
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
