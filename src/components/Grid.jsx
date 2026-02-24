import Tile from './Tile';

function Grid({ guesses, currentGuess, evaluations, shakeRow, revealRow, bounceRow }) {
  const rows = [];

  // Submitted guesses
  for (let i = 0; i < guesses.length; i++) {
    const guess = guesses[i];
    const evaluation = evaluations[i];
    const isRevealing = revealRow === i;
    const isBouncing = bounceRow === i;

    rows.push(
      <div
        key={`row-${i}`}
        className={`flex gap-[5px] ${shakeRow === i ? 'animate-shake' : ''}`}
      >
        {guess.split('').map((letter, j) => (
          <Tile
            key={`${i}-${j}`}
            letter={letter}
            status={evaluation[j]}
            delay={j}
            isRevealing={isRevealing}
            isBouncing={isBouncing}
          />
        ))}
      </div>
    );
  }

  // Current guess row (if game still active and rows remaining)
  if (guesses.length < 6) {
    const currentRow = currentGuess.padEnd(5, ' ').split('');
    rows.push(
      <div
        key={`row-current`}
        className={`flex gap-[5px] ${shakeRow === guesses.length ? 'animate-shake' : ''}`}
      >
        {currentRow.map((letter, j) => (
          <Tile
            key={`current-${j}`}
            letter={letter.trim()}
            status={letter.trim() ? 'tbd' : 'empty'}
            delay={j}
            isPopping={j === currentGuess.length - 1 && letter.trim()}
          />
        ))}
      </div>
    );

    // Empty rows
    for (let i = guesses.length + 1; i < 6; i++) {
      rows.push(
        <div key={`row-${i}`} className="flex gap-[5px]">
          {Array(5)
            .fill(null)
            .map((_, j) => (
              <Tile key={`${i}-${j}`} letter="" status="empty" delay={j} />
            ))}
        </div>
      );
    }
  }

  return <div className="flex flex-col gap-[5px] items-center">{rows}</div>;
}

export default Grid;
