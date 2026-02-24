import { memo } from 'react';

const statusClasses = {
  correct: 'bg-correct border-correct text-white',
  present: 'bg-present border-present text-white',
  absent: 'bg-absent border-absent text-white',
  tbd: 'bg-tile-bg border-tile-border-active text-gray-900',
  empty: 'bg-tile-bg border-tile-border text-gray-900',
};

function Tile({ letter, status, delay, isRevealing, isBouncing, isPopping }) {
  const baseClasses =
    'w-[58px] h-[58px] sm:w-[62px] sm:h-[62px] border-2 flex items-center justify-center text-[2rem] font-bold uppercase select-none';

  const colorClass = statusClasses[status] || statusClasses.empty;

  let animationStyle = {};
  let animationClass = '';

  if (isRevealing) {
    animationClass = 'animate-flip';
    animationStyle = { animationDelay: `${delay * 300}ms`, animationFillMode: 'both' };
  } else if (isBouncing) {
    animationClass = 'animate-bounce-tile';
    animationStyle = { animationDelay: `${delay * 100}ms`, animationFillMode: 'both' };
  } else if (isPopping && letter) {
    animationClass = 'animate-pop';
  }

  return (
    <div
      className={`${baseClasses} ${colorClass} ${animationClass} transition-colors duration-300`}
      style={animationStyle}
    >
      {letter}
    </div>
  );
}

export default memo(Tile);
