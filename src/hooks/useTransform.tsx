import { useState } from 'react';
import useMousePosition from './useMousePosition';

function useTransform({ containerSize, innerDivSize }: any) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [startAngle, setStartAngle] = useState(0);
  const cursor = useMousePosition();

  const handleMouseDown = (event: any) => {
    if (event.target.classList.contains('rotation-handle')) {
      setIsRotating(true);
      setStartAngle(event.clientX);
    } else {
      setIsDragging(true);

      const box = event.currentTarget;

      const i1 = cursor.x - box.offsetLeft;
      const h1 = cursor.y - box.offsetTop;

      setDragOffset({ x: i1, y: h1 });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsRotating(false);
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

    if (isRotating) {
      const currentAngle = rotationAngle + (cursor.x - startAngle);
      setRotationAngle(currentAngle);
      setStartAngle(cursor.x);
    }
  };

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    position,
    rotationAngle,
  };
}

export default useTransform;
