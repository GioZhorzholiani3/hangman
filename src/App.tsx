import classes from "./App.module.css";
import { useState, useEffect, useCallback } from "react";
import words from "./wordList.json";
import HangmanDrawing from "./components/HangmanDrawing";
import HangmanWord from "./components/HangmanWord";
import Keyboard from "./components/Keyboard";

function App() {
  const [wordToGuess, setWordToGuess] = useState(
    words[Math.floor(Math.random() * words.length)]
  );

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );

  const resetGame = () => {
    const newWordToGuess = words[Math.floor(Math.random() * words.length)];
    setWordToGuess(newWordToGuess);
    setGuessedLetters([]);
  };
  //  const [wrongGuesses, setWrongGuesses] = useState<string[]>([]);

  // const addGuessedLetter = (letter: string) => {
  //   if (guessedLetters.includes(letter)) return;
  //   setGuessedLetters((currentLetters) => [...currentLetters, letter]);
  // };

  const isLoser = incorrectLetters.length >= 6;
  const isWinner = wordToGuess
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) return;
      setGuessedLetters((currentLetters) => [...currentLetters, letter]);
    },
    [guessedLetters, isLoser, isWinner]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (!key.match(/^[a-z]$/)) return;
      e.preventDefault();
      addGuessedLetter(key);
    };
    document.addEventListener("keypress", handler);
    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessedLetters, addGuessedLetter]);

  console.log(wordToGuess);
  return (
    <div className={classes.app}>
      {/* <h1>React+TS Hangman App</h1> */}
      <div className={classes.wrapper}>
        <div className={classes.result}>
          {isLoser && (
            <h2>
              You lost! - Refresh to try again{" "}
              <button className={classes.resetBtn} onClick={resetGame}>
                Play Again
              </button>
            </h2>
          )}
          {isWinner && (
            <h2>
              You won! - Refresh to try again{" "}
              <button className={classes.resetBtn} onClick={resetGame}>
                Play Again
              </button>
            </h2>
          )}
        </div>
        <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
        <HangmanWord
          reveal={isLoser}
          guessedLetters={guessedLetters}
          wordToGuess={wordToGuess}
        />
      </div>
      <div className={classes.board}>
        <Keyboard
          disabled={isLoser || isWinner}
          activeLetters={guessedLetters.filter((letter) =>
            wordToGuess.includes(letter)
          )}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>
    </div>
  );
}

export default App;
