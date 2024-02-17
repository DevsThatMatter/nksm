import { Fragment, useEffect, useState } from 'react';

const Dot = ({ size, distort }: { size: number; distort: boolean }) => {
  const dotSize = size * 0.5; // Limiting the size to a fraction
  const dotStyle = {
    width: dotSize + 'px',
    height: dotSize + 'px',
    borderRadius: distort ? '50%' : '0',
    backgroundColor: 'limegreen',
    position: 'absolute' as 'absolute',
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    transform: distort ? `translate(-50%, -50%) rotate(${Math.random() * 360}deg)` : 'none',
  };

  return <div className='rounded-full' style={dotStyle} />;
};

export const RandomDots = ({ numberOfDots }: { numberOfDots: number }) => {
  const [dots, setDots] = useState<Array<JSX.Element>>([]);

  useEffect(() => {
    const generatedDots: JSX.Element[] = [];
    for (let i = 0; i < numberOfDots; i++) { // Use numberOfDots prop to control the number of dots
      const size = Math.floor(Math.random() * 20) + 5;
      const distort = Math.random() < 0.5;
      generatedDots.push(<Dot key={i} size={size} distort={distort} />);
    }
    setDots(generatedDots);
  }, [numberOfDots]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {dots.map((dot, index) => (
        <Fragment key={index}>{dot}</Fragment>
      ))}
    </div>
  );
};
