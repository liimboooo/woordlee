import { useEffect, useCallback } from 'react';
import Header from './components/Header';
import Grid from './components/Grid';
import Keyboard from './components/Keyboard';
import Toast from './components/Toast';
import GameOverModal from './components/GameOverModal';
import { useGame } from './hooks/useGame';

function App() {
  const {
    solution,
    guesses,
    currentGuess,
    gameStatus,
    evaluations,
    letterStatuses,
    shakeRow,
    revealRow,
    bounceRow,
    toast,
    handleKeyPress,
    resetGame,
  } = useGame();

  // Physical keyboard integration
  const handleKeyDown = useCallback(
    (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      if (e.key === 'Enter') {
        e.preventDefault();
        handleKeyPress('ENTER');
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        handleKeyPress('BACKSPACE');
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        handleKeyPress(e.key.toUpperCase());
      }
    },
    [handleKeyPress]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="h-dvh flex flex-col items-center bg-bg">
      <Header />

      {/* Toast notifications */}
      <Toast message={toast} />

      {/* Game Grid */}
      <div className="flex-1 flex items-center justify-center py-4 px-2">
        <Grid
          guesses={guesses}
          currentGuess={currentGuess}
          evaluations={evaluations}
          shakeRow={shakeRow}
          revealRow={revealRow}
          bounceRow={bounceRow}
        />
      </div>

      {/* On-screen Keyboard */}
      <div className="pb-4 w-full flex justify-center">
        <Keyboard letterStatuses={letterStatuses} onKeyPress={handleKeyPress} />
      </div>

      {/* Win/Loss Modal */}
      <GameOverModal
        gameStatus={gameStatus}
        solution={solution}
        guesses={guesses}
        onPlayAgain={resetGame}
      />
    </div>
  );
}

export default App;
