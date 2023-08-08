import useTransform from './hooks/useTransform';

function App() {
  const containerSize = { width: 700, height: 500 };
  const innerDivSize = { width: 100, height: 100 };

  const {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    position,
    rotationAngle,
  } = useTransform({ containerSize, innerDivSize });

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
      }}
    >
      <div
        style={{
          width: `${containerSize.width}px`,
          height: `${containerSize.height}px`,
          backgroundColor: 'red',
          position: 'relative',
        }}
      >
        <div
          onMouseDown={handleMouseDown}
          style={{
            width: `${innerDivSize.width}px`,
            height: `${innerDivSize.height}px`,
            position: 'absolute',
            backgroundColor: 'blue',
            cursor: 'pointer',
            top: `${position.y}px`,
            left: `${position.x}px`,
            transform: `rotate(${rotationAngle}deg) `,
            transition: 'transform 0.3s ease',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            onMouseDown={handleMouseDown}
            className="rotation-handle"
            style={{
              borderRadius: '100%',
              width: '15px',
              height: '15px',
              backgroundColor: 'white',
              marginTop: '4px',
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default App;
