import React, { Component } from 'react';
import WordleGame from './components/WordleGame';
import Header from './components/Header';
import './App.css';
import ThemeContext from './Context/ThemeContext';


class App extends Component {
  state = { isDarkTheme: false }

  toggleTheme = () => {
    this.setState(prevState => ({ isDarkTheme: !prevState.isDarkTheme }));
  }
  render() {
    const { isDarkTheme } = this.state
    return (
      <ThemeContext.Provider
        value={{
          isDarkTheme,
          toggleTheme: this.toggleTheme,
        }}
      >
        <div>
          <Header />
          <WordleGame />
        </div>
      </ThemeContext.Provider>
    );
  }
}

export default App;