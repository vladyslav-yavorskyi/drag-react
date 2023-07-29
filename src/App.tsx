import { useEffect, useRef, useState } from 'react';
import useMousePosition from './hooks/useMousePosition';

interface Position {
  x: number;
  y: number;
}

function App() {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const innerDivRef = useRef<HTMLDivElement>(null);
  const containerSize = { width: 700, height: 500 };
  const innerDivSize = { width: 50, height: 50 };
  const cursor = useMousePosition();

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);

    const box = event.currentTarget;

    const i1 = cursor.x - box.offsetLeft;
    const h1 = cursor.y - box.offsetTop;

    setDragOffset({ x: i1, y: h1 });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = () => {
    if (isDragging) {
      const x = cursor.x - dragOffset.x;
      const y = cursor.y - dragOffset.y;

      const maxX = containerSize.width - innerDivSize.width;
      const maxY = containerSize.height - innerDivSize.height;
      setPosition({
        x: Math.max(0, Math.min(maxX, x)),
        y: Math.max(0, Math.min(maxY, y)),
      });
    }
  };

  useEffect(() => {
    const handleMouseOutsideDiv = (event: MouseEvent) => {
      if (
        isDragging &&
        containerRef.current &&
        !innerDivRef.current?.contains(event.target as Node)
      ) {
        setIsDragging(false);
      }
    };

    document.addEventListener('mousemove', handleMouseOutsideDiv);

    return () => {
      document.removeEventListener('mousemove', handleMouseOutsideDiv);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
      }}
    >
      <div
        ref={innerDivRef}
        style={{
          width: `${containerSize.width}px`,
          height: `${containerSize.height}px`,
          backgroundColor: 'red',
          position: 'relative',
        }}
      >
        <div
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          style={{
            width: `${innerDivSize.width}px`,
            height: `${innerDivSize.height}px`,
            position: 'absolute',
            backgroundColor: 'blue',
            cursor: 'pointer',
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
        ></div>
      </div>
    </div>
  );
}

export default App;
