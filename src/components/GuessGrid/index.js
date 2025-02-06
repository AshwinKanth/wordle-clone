import React from 'react';
import './index.css';

function GuessGrid({ guesses, targetWord }) {
  const getFeedback = (guess) => {
    let feedback = new Array(5).fill('gray');
    const targetWordArr = targetWord.split('');
    const guessArr = guess.split('');

    guessArr.forEach((letter, index) => {
      if (letter === targetWordArr[index]) {
        feedback[index] = 'green';
        targetWordArr[index] = null;
      }
    });

    guessArr.forEach((letter, index) => {
      if (feedback[index] !== 'green' && targetWordArr.includes(letter)) {
        feedback[index] = 'yellow';
        targetWordArr[targetWordArr.indexOf(letter)] = null;
      }
    });

    return feedback;
  };

  return (
    <div className="guess-grid">
      {guesses.map((guess, guessIndex) => (
        <div key={guessIndex} className="guess-row animate-fade">
          {guess.split('').map((letter, letterIndex) => (
            <div
              key={letterIndex}
              className={`guess-cell feedback-${getFeedback(guess)[letterIndex]} animate-flip`}
            >
              {letter}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default GuessGrid;