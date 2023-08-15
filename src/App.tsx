import { useState, useEffect, useCallback } from "react";
import styled, { createGlobalStyle } from "styled-components";
import words from "./wordList.json";
import HangmanDrawing from "./components/HangmanDrawing";
import HangmanWord from "./components/HangmanWord";
import Keyboard from "./components/Keyboard";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-size: calc(10px + 2vmin);
    color: white;
    background-color: #282c34;
    font-family: Arial, sans-serif;
    text-align: center;
  }
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
`;

const Wrapper = styled.div`
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 0 auto;
  align-items: center;
`;

const Result = styled.div`
  font-size: 2rem;
  text-align: center;
  margin-top: 2rem;
`;

const Board = styled.div`
  margin: 2rem auto;
  width: 50%;
  align-self: stretch;
`;

const ResetButton = styled.button`
  background-color: #61dafb;
  color: #282c34;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border-radius: 3px;
  border: none;
  padding: 0.5rem;
  text-transform: uppercase;

  &:hover {
    background-color: #282c34;
    color: #f5f5f5;
    border: none;
  }
`;

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

  return (
    <AppContainer>
      <GlobalStyle />
      <Wrapper>
        <Result>
          {isLoser && (
            <h2>
              You lost! - Refresh to try again{" "}
              <ResetButton onClick={resetGame}>Play Again</ResetButton>
            </h2>
          )}
          {isWinner && (
            <h2>
              You won! - Refresh to try again{" "}
              <ResetButton onClick={resetGame}>Play Again</ResetButton>
            </h2>
          )}
        </Result>
        <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
        <HangmanWord
          reveal={isLoser}
          guessedLetters={guessedLetters}
          wordToGuess={wordToGuess}
        />
      </Wrapper>
      <Board>
        <Keyboard
          disabled={isLoser || isWinner}
          activeLetters={guessedLetters.filter((letter) =>
            wordToGuess.includes(letter)
          )}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </Board>
    </AppContainer>
  );
}

export default App;
