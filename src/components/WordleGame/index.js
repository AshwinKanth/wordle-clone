import React, { Component } from 'react';
import GuessGrid from '../GuessGrid';
import InputRow from '../InputRow';
import SuccessAnimation from '../SuccessAnimation.json'
import WrongAnimation from '../WrongAnimation.json'
import Lottie from "lottie-react"
import ThemeContext from "../../Context/ThemeContext";
import './index.css';

class WordleGame extends Component {
  state = {
    targetWord: this.getRandomWord(),
    guesses: [],
    currentGuess: '',
    maxAttempts: 6,
    gameStatus: 'playing',
    errorMessage: '',
  };

  getRandomWord() {
    const words = ['apple', 'grape', 'berry', 'mango', 'peach', 'lemon'];
    return words[Math.floor(Math.random() * words.length)];
  }

  handleInputChange = (event) => {
    const value = event.target.value;
    if (value.length <= 5 && /^[a-zA-Z]*$/.test(value)) {
      this.setState({ currentGuess: value.toLowerCase(), errorMessage: '' });
    }
  };

  handleGuessSubmit = () => {
    const { currentGuess, guesses, gameStatus } = this.state;

    if (gameStatus !== 'playing') return;
    if (currentGuess.length !== 5) {
      this.setState({ errorMessage: 'Please enter a 5-letter word.' });
      return;
    }

    if (!this.isValidWord(currentGuess)) {
      this.setState({ errorMessage: 'Invalid word! Try again.' });
      return;
    }

    const newGuesses = [...guesses, currentGuess];
    this.setState({ guesses: newGuesses, currentGuess: '', errorMessage: '' }, () => {
      this.checkGameStatus();
    });
  };

  isValidWord(word) {
    const validWords = ['apple', 'grape', 'berry', 'mango', 'peach', 'lemon'];
    return validWords.includes(word);
  }

  checkGameStatus() {
    const { guesses, targetWord, maxAttempts } = this.state;
    const lastGuess = guesses[guesses.length - 1];

    if (lastGuess === targetWord) {
      this.setState({ gameStatus: 'won' });
    } else if (guesses.length >= maxAttempts) {
      this.setState({ gameStatus: 'lost' });
    }
  }

  handleNewGame = () => {
    this.setState({
      targetWord: this.getRandomWord(),
      guesses: [],
      currentGuess: '',
      gameStatus: 'playing',
      errorMessage: '',
    });
  };

  gameStatusAnimation = () => {
    const { gameStatus } = this.state;
    if (gameStatus === 'won') {
      return <Lottie key="success" animationData={SuccessAnimation} loop={true} className="lottie-animation" />;
    } else if (gameStatus === 'lost') {
      return <Lottie key="failure" animationData={WrongAnimation} loop={true} className="lottie-animation" />;
    }
    return null;
  };



  render() {
    const { guesses, currentGuess, maxAttempts, gameStatus, errorMessage } = this.state;

    return (
      <ThemeContext.Consumer>
        {value => {
          const { isDarkTheme } = value;
          const gameContainerClass = isDarkTheme ? "game-container-dark" : "game-container-light";
          const textColor = isDarkTheme ? "dark-text" : "light-text"

          const gameMessageColor = gameStatus === "won" ? "text-green" : "text-red"

          const guessLength = guesses.length >= 3 ? "text-red" : "text-green"

          return (
            <div className={`game-container ${gameContainerClass}`}>
              <img src="https://res.cloudinary.com/dq1ktqbtb/image/upload/v1738746270/1089_xia660.jpg" alt="" className="gameImage" />
              <div className="gameInput-container">
                <GuessGrid guesses={guesses} targetWord={this.state.targetWord} />
                {gameStatus === 'playing' && (
                  <>
                    <InputRow
                      currentGuess={currentGuess}
                      onInputChange={this.handleInputChange}
                      onGuessSubmit={this.handleGuessSubmit}
                    />
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                  </>
                )}
                {(gameStatus === 'won' || gameStatus === 'lost') && (
                  <div className='success-container'>
                    {this.gameStatusAnimation()}
                    <p className={`game-message ${gameMessageColor}`}>
                      {gameStatus === 'won' ? 'Congratulations! You guessed the word!' : `Game over! The word was: ${this.state.targetWord}`}
                    </p>
                  </div>
                )}

                <button onClick={this.handleNewGame} className="new-game-button">New Game</button>

                <p className={`${textColor}`}>Remaining Attempts: <span className={` guessLength ${guessLength}`}>{maxAttempts - guesses.length}</span></p>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    );
  }
}

export default WordleGame;
