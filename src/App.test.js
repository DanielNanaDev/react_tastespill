import React, { Component } from 'react';
import './App.css';
import wordList from './WordList.json';

class App extends Component {
  constructor() {
    super();
    this.state = {
      wordIndex: 0, // Index of the current word
      currentWord: '', // The word to type
      userInput: '', // The user's input
      score: 0, // User's score
      timer: 120, // Initial timer value (in seconds)
      isGameRunning: false, // Is the game currently running?
      highScores: [], // List of high scores with user names
      userName: '', // User's name
    };
    this.wordList = [...new Set(wordList.words)]; // Remove duplicate words
  }

  componentDidMount() {
    this.newWord();
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  startGame = () => {
    this.setState({
      isGameRunning: true,
      timer: 120, // Reset the timer
      score: 0, // Reset the score
    });
    this.newWord();
    this.interval = setInterval(this.tick, 1000);
  };

  endGame = () => {
    clearInterval(this.interval);
    const { userName, score, highScores } = this.state;
    const updatedHighScores = [...highScores, { name: userName, score }];
    this.setState({
      isGameRunning: false,
      highScores: updatedHighScores,
    });
  };

  tick = () => {
    this.setState((prevState) => {
      if (prevState.timer === 0) {
        this.endGame();
      }
      return { timer: prevState.timer - 1 };
    });
  };

  newWord = () => {
    const { wordIndex, userName } = this.state;
    if (wordIndex >= this.wordList.length) {
      // Reset to the beginning of the word list
      this.setState({ wordIndex: 0 });
    }
    const currentWord = this.wordList[wordIndex];
    this.setState({
      currentWord,
      userInput: '',
      wordIndex: wordIndex + 1,
    });
  };

  handleKeyPress = (e) => {
    if (this.state.isGameRunning) {
      const { currentWord, userInput } = this.state;
      const lastCharIndex = userInput.length;
      const isMatch =
        currentWord[lastCharIndex] &&
        currentWord[lastCharIndex].toLowerCase() === e.key.toLowerCase();

      if (isMatch) {
        this.setState((prevState) => {
          const scoreIncrement = e.key === ' ' ? 50 : 1;
          return {
            userInput: userInput + e.key,
            score: prevState.score + scoreIncrement,
          };
        });

        if (userInput.length === currentWord.length - 1) {
          this.newWord();
        }
      }
    }
  };

  render() {
    const {
      currentWord,
      userInput,
      timer,
      isGameRunning,
      score,
      highScores,
      userName,
    } = this.state;

    return (
      <div className="App">
        <h1>Speed Typer Game</h1>
        {isGameRunning ? (
          <div>
            <p>Type: {currentWord}</p>
            <p>Score: {score}</p>
            <p>Time Left: {timer} seconds</p>
            <input
              type="text"
              placeholder="Enter your name"
              value={userName}
              onChange={(e) => this.setState({ userName: e.target.value })}
            />
          </div>
        ) : (
          <button onClick={this.startGame}>Start Game</button>
        )}
        <div className="high-scores">
          <h2>High Scores</h2>
          <ul>
            {highScores.map((entry, index) => (
              <li key={index}>
                {entry.name}: {entry.score}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;


