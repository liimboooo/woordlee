function GameOverModal({ gameStatus, solution, guesses, onPlayAgain }) {
  if (gameStatus === 'playing') return null;

  const won = gameStatus === 'won';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-8 mx-4 max-w-sm w-full text-center transform animate-scale-in">
        {/* Icon */}
        <div className="text-5xl mb-4">{won ? '🎉' : '😔'}</div>

        {/* Title */}
        <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
          {won ? 'You Won!' : 'Game Over'}
        </h2>

        {/* Message */}
        <p className="text-gray-600 mb-2">
          {won
            ? `You guessed the word in ${guesses.length} ${guesses.length === 1 ? 'try' : 'tries'}!`
            : 'Better luck next time!'}
        </p>

        {/* Solution */}
        <div className="mb-6">
          <span className="text-sm text-gray-500 uppercase tracking-wide">The word was</span>
          <div className="text-3xl font-extrabold text-correct mt-1 tracking-[0.25em]">
            {solution}
          </div>
        </div>

        {/* Stats (attempts) */}
        <div className="flex justify-center gap-6 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{guesses.length}</div>
            <div className="text-xs text-gray-500 uppercase">Attempts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">6</div>
            <div className="text-xs text-gray-500 uppercase">Max Tries</div>
          </div>
        </div>

        {/* Play Again */}
        <button
          onClick={onPlayAgain}
          className="w-full py-3 bg-correct hover:bg-correct/90 text-white font-bold rounded-lg text-lg transition-colors duration-200 cursor-pointer"
        >
          Play Again
        </button>
      </div>
    </div>
  );
}

export default GameOverModal;
