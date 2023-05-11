import React, { FC } from 'react';

interface IAvatar {
  name: string;
  secondName: string;
  size?: string;
  className?: string;
}

export const Avatar: FC<IAvatar> = ({ name, secondName, size, className }) => {
  const createString = () => {
    return (name.slice(0, 1) + secondName.slice(0, 1)).toUpperCase();
  };

  const generateColor = (str: string) => {
    let hash = 0,
      color = '#',
      value;
    const strLength = str.length;

    if (!str) {
      return color + '333333';
    }

    for (let i = 0; i < strLength; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    for (let i = 0; i < 3; i++) {
      value = (hash >> (i * 8)) & 0xff;
      color += ('00' + value.toString(16)).substr(-2);
    }

    return color;
  };

  return (
    <div className={`avatar-${size} avatar ${className ? className : ''}`}>
      <span
        className="avatar-title rounded-circle"
        style={{ backgroundColor: generateColor(name + secondName) }}
      >
        <span
          style={{
            color: generateColor(name + secondName),
            filter:
              'saturate(0) grayscale(1) brightness(.7) contrast(1000%) invert(1)',
          }}
        >
          {createString()}
        </span>
      </span>
    </div>
  );
};
