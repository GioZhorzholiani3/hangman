// import classes from "./HangmanWord.module.css";
// // const word = "test";
// // const guessedLetters = ["e"];

// type HangmanWordProps = {
//   wordToGuess: string;
//   guessedLetters: string[];
//   reveal?: boolean;
// };

// const HangmanWord: React.FC<HangmanWordProps> = (props) => {
//   return (
//     <div className={classes.guessWord}>
//       {props.wordToGuess.split("").map((letter, index) => (
//         <span className={classes.guessLetter} key={index}>
//           <span
//             className={`${classes.Letter} ${
//               props.guessedLetters.includes(letter) || props.reveal ? classes.visible : ""
//             }`}
//           >
//             {letter}
//           </span>
//         </span>
//       ))}
//     </div>
//   );
// };

// export default HangmanWord;
import classes from "./HangmanWord.module.css";

type HangmanWordProps = {
  wordToGuess: string;
  guessedLetters: string[];
  reveal?: boolean;
};

const HangmanWord: React.FC<HangmanWordProps> = (props) => {
  const { wordToGuess, guessedLetters, reveal = false } = props;

  return (
    <div className={classes.guessWord}>
      {wordToGuess.split("").map((letter, index) => (
        <span className={classes.guessLetter} key={index}>
          <span
            className={`${classes.Letter} ${
              guessedLetters.includes(letter) || reveal ? classes.visible : ""
            } ${
              !guessedLetters.includes(letter) && reveal
                ? classes.lostLetter
                : ""
            }`}
          >
            {letter}
          </span>
        </span>
      ))}
    </div>
  );
};

export default HangmanWord;
