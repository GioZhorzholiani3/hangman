const KEYS = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
import React from "react";
import styled, { css } from "styled-components";

type KeyboardProps = {
  activeLetters: string[];
  disabled?: boolean;
  inactiveLetters: string[];
  addGuessedLetter: (letter: string) => void;
};

const Keyboard: React.FC<KeyboardProps> = (props) => {
  const {
    activeLetters,
    inactiveLetters,
    addGuessedLetter,
    disabled = false,
  } = props;

  const KeyboardContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(75px, 1fr));
    gap: 0.5rem;
  `;

  const KeyboardButton = styled.button<{
    isActive: boolean;
    isInactive: boolean;
  }>`
    width: 100%;
    padding: 0.5rem;
    border-radius: 3px;
    border: none;
    aspect-ratio: 1/1;
    text-transform: uppercase;
    font-size: 1.5rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    background-color: #61dafb;
    color: #282c34;

    &:hover:not(:disabled),
    &:focus:not(:disabled) {
      background-color: #282c34;
      color: #61dafb;
      border: none;
    }

    ${({ isActive }) =>
      isActive &&
      css`
        background-color: #4f3cf2;
        color: #61dafb;
        border: none;
      `}

    ${({ isInactive }) =>
      isInactive &&
      css`
        opacity: 0.3;
      `}
  `;

  return (
    <KeyboardContainer>
      {KEYS.map((key) => {
        const isActive = activeLetters.includes(key);
        const isInactive = inactiveLetters.includes(key);
        return (
          <KeyboardButton
            key={key}
            isActive={isActive}
            isInactive={isInactive}
            onClick={() => addGuessedLetter(key)}
            disabled={isActive || isInactive || disabled}
          >
            {key}
          </KeyboardButton>
        );
      })}
    </KeyboardContainer>
  );
};

export default Keyboard;
