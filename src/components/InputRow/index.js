import React from 'react';
import './index.css';

function InputRow({ currentGuess, onInputChange, onGuessSubmit }) {
  return (
    <div className="input-row">
      <input
        className='wordInput'
        type="text"
        value={currentGuess}
        onChange={onInputChange}
        placeholder="Enter your guess"
      />
      <button onClick={onGuessSubmit}>Guess</button>
    </div>
  );
}

export default InputRow;