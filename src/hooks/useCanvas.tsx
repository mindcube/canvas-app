import * as React from 'react';

interface Props {
  draw: (context: CanvasRenderingContext2D | null) => void;
}

const useCanvas = ({ draw }: Props) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas: HTMLCanvasElement = canvasRef.current as HTMLCanvasElement;
    const context = canvas.getContext('2d');

    function updateSize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerWidth * 0.5625;
      draw(context);
    }
    updateSize();

    window.addEventListener('resize', updateSize);

    return () => window.removeEventListener('resize', updateSize);
  }, [draw]);

  return { canvasRef };
};

export default useCanvas;
