import { memo, useCallback } from 'react';

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫'],
];

const statusClasses = {
  correct: 'bg-correct text-white border-correct',
  present: 'bg-present text-white border-present',
  absent: 'bg-absent text-white border-absent',
};

function Key({ keyVal, status, onClick }) {
  const isSpecial = keyVal === 'ENTER' || keyVal === '⌫';
  const baseClasses =
    'h-[58px] rounded-md font-bold uppercase cursor-pointer select-none flex items-center justify-center border-0 transition-colors duration-200';
  const widthClass = isSpecial ? 'min-w-[65px] text-xs px-2' : 'min-w-[43px] text-lg';
  const colorClass = status
    ? statusClasses[status]
    : 'bg-key-bg text-gray-900';

  const handleClick = useCallback(() => {
    if (keyVal === '⌫') {
      onClick('BACKSPACE');
    } else {
      onClick(keyVal);
    }
  }, [keyVal, onClick]);

  return (
    <button
      className={`${baseClasses} ${widthClass} ${colorClass} hover:opacity-90 active:scale-95`}
      onClick={handleClick}
      aria-label={keyVal === '⌫' ? 'backspace' : keyVal}
    >
      {keyVal}
    </button>
  );
}

function Keyboard({ letterStatuses, onKeyPress }) {
  return (
    <div className="flex flex-col items-center gap-[6px] w-full max-w-[500px] px-2">
      {KEYBOARD_ROWS.map((row, i) => (
        <div key={i} className="flex gap-[6px] justify-center w-full">
          {row.map((key) => (
            <Key
              key={key}
              keyVal={key}
              status={letterStatuses[key]}
              onClick={onKeyPress}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default memo(Keyboard);
