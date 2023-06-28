import { StaticImageData } from 'next/image';
import React from 'react';

interface Props {
  className?: string;
  title?: string;
  text?: string;
  img: StaticImageData;
  size?: number;
  style?: React.CSSProperties;
}

const Bubble: React.FC<Props> = ({
  className = '',
  title = '',
  text = '',
  img,
  size = 200,
  style,
}) => {
  const mergedStyle = Object.assign(
    {},
    {
      border: '1px solid white',
      borderRadius: '50%',
      boxShadow: '0px 0px 10px gray',
      display: 'flex',
      flexDirection: 'column',
      height: `${size < 50 ? 50 : size}px`,
      width: `${size < 50 ? 50 : size}px`,
      justifyContent: 'center',
    },
    style,
  );
  return (
    <div className={className} style={mergedStyle}>
      <img
        className="rounded-full absolute"
        src={img.src}
        alt={title + 'IMG'}
        style={{
          objectFit: 'cover',
        }}
      />
      <div
        style={{
          bottom: '100%',
          position: 'absolute',
          left: '50%',
          transform: 'translate(-50%, 10px)',
          fontWeight: 'bold',
          fontSize: `${size > 64 ? size / 8 : 8}px`,
          lineHeight: `${size > 64 ? size / 8 + 1 : 9}px`,
          padding: '11px',
        }}>
        {title}
      </div>
      <p
        style={{
          color: 'white',
          textAlign: 'center',
          textShadow: '2px 2px gray',
          fontWeight: 'bold',
          fontSize: `${size < 75 ? 15 : size / 5}px`,
          margin: 0,
          zIndex: 1,
        }}>
        {text}
      </p>
    </div>
  );
};

export default Bubble;
