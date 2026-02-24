import { useState, useEffect, useCallback } from 'react';
import { getDailyWord, evaluateGuess, VALID_GUESSES } from '../words';

const STORAGE_KEY = 'woordle-state';

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;
    const parsed = JSON.parse(saved);
    // Verify it's for today's word
    const todayWord = getDailyWord();
    if (parsed.solution !== todayWord) return null;
    return parsed;
  } catch {
    return null;
  }
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage not available
  }
}

export function useGame() {
  const [solution] = useState(() => getDailyWord());

  const [guesses, setGuesses] = useState(() => {
    const saved = loadState();
    return saved ? saved.guesses : [];
  });

  const [currentGuess, setCurrentGuess] = useState('');

  const [gameStatus, setGameStatus] = useState(() => {
    const saved = loadState();
    return saved ? saved.gameStatus : 'playing'; // 'playing' | 'won' | 'lost'
  });

  const [shakeRow, setShakeRow] = useState(-1);
  const [revealRow, setRevealRow] = useState(-1);
  const [bounceRow, setBounceRow] = useState(-1);
  const [toast, setToast] = useState('');

  // Persist state
  useEffect(() => {
    saveState({ solution, guesses, gameStatus });
  }, [solution, guesses, gameStatus]);

  // Show toast helper
  const showToast = useCallback((message, duration = 1500) => {
    setToast(message);
    setTimeout(() => setToast(''), duration);
  }, []);

  // Build evaluations for submitted guesses
  const evaluations = guesses.map((guess) => evaluateGuess(guess, solution));

  // Build keyboard letter statuses
  const letterStatuses = {};
  guesses.forEach((guess, i) => {
    const eval_ = evaluations[i];
    guess.split('').forEach((letter, j) => {
      const status = eval_[j];
      const current = letterStatuses[letter];
      // Priority: correct > present > absent
      if (status === 'correct') {
        letterStatuses[letter] = 'correct';
      } else if (status === 'present' && current !== 'correct') {
        letterStatuses[letter] = 'present';
      } else if (!current) {
        letterStatuses[letter] = 'absent';
      }
    });
  });

  const handleKeyPress = useCallback(
    (key) => {
      if (gameStatus !== 'playing') return;

      if (key === 'BACKSPACE') {
        setCurrentGuess((prev) => prev.slice(0, -1));
        return;
      }

      if (key === 'ENTER') {
        if (currentGuess.length !== 5) {
          showToast('Not enough letters');
          setShakeRow(guesses.length);
          setTimeout(() => setShakeRow(-1), 500);
          return;
        }

        if (!VALID_GUESSES.has(currentGuess.toLowerCase())) {
          showToast('Not in word list');
          setShakeRow(guesses.length);
          setTimeout(() => setShakeRow(-1), 500);
          return;
        }

        const newGuesses = [...guesses, currentGuess];
        setGuesses(newGuesses);
        setCurrentGuess('');
        setRevealRow(guesses.length);

        // Check win/loss after reveal animation
        const revealDuration = 5 * 300 + 300; // 5 tiles * 300ms delay + buffer
        setTimeout(() => {
          setRevealRow(-1);
          if (currentGuess === solution) {
            setGameStatus('won');
            setBounceRow(newGuesses.length - 1);
            const messages = ['Genius!', 'Magnificent!', 'Impressive!', 'Splendid!', 'Great!', 'Phew!'];
            showToast(messages[Math.min(newGuesses.length - 1, 5)], 3000);
            setTimeout(() => setBounceRow(-1), 1500);
          } else if (newGuesses.length >= 6) {
            setGameStatus('lost');
            showToast(solution, 5000);
          }
        }, revealDuration);

        return;
      }

      // Letter key
      if (/^[A-Z]$/.test(key) && currentGuess.length < 5) {
        setCurrentGuess((prev) => prev + key);
      }
    },
    [currentGuess, gameStatus, guesses, solution, showToast]
  );

  const resetGame = useCallback(() => {
    setGuesses([]);
    setCurrentGuess('');
    setGameStatus('playing');
    setShakeRow(-1);
    setRevealRow(-1);
    setBounceRow(-1);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
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
  };
}
