import React from "react";
import styled, { css } from "styled-components";

type HangmanWordProps = {
  wordToGuess: string;
  guessedLetters: string[];
  reveal?: boolean;
};

const GuessWord = styled.div`
  display: flex;
  gap: 0.25em;
  font-size: 4rem;
  font-weight: bold;
  text-transform: uppercase;
  font-family: monospace;
`;

const GuessLetter = styled.span`
  border-bottom: 0.1em solid black;
`;

const Letter = styled.span<{ isVisible: boolean; isLost: boolean }>`
  visibility: hidden;
  ${({ isVisible }) =>
    isVisible &&
    css`
      visibility: visible;
    `}
  ${({ isLost }) =>
    isLost &&
    css`
      color: red;
    `}
`;

const HangmanWord: React.FC<HangmanWordProps> = (props) => {
  const { wordToGuess, guessedLetters, reveal = false } = props;

  return (
    <GuessWord>
      {wordToGuess.split("").map((letter, index) => (
        <GuessLetter key={index}>
          <Letter
            isVisible={guessedLetters.includes(letter) || reveal}
            isLost={!guessedLetters.includes(letter) && reveal}
          >
            {letter}
          </Letter>
        </GuessLetter>
      ))}
    </GuessWord>
  );
};

export default HangmanWord;
