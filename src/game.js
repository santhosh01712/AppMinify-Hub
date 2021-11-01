import React, { useState } from "react";
import ReactDOM from "react-dom";

const rowStyle = {
  display: "flex",
};

const squareStyle = {
  width: "60px",
  height: "60px",
  backgroundColor: "#ddd",
  margin: "4px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "20px",
  color: "white",
};

const boardStyle = {
  backgroundColor: "#eee",
  width: "208px",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  flexDirection: "column",
  border: "3px #eee solid",
};

const containerStyle = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
};

const instructionsStyle = {
  marginTop: "5px",
  marginBottom: "5px",
  fontWeight: "bold",
  fontSize: "16px",
};

const buttonStyle = {
  marginTop: "15px",
  marginBottom: "16px",
  width: "80px",
  height: "40px",
  backgroundColor: "#8acaca",
  color: "white",
  fontSize: "16px",
};

class Square extends React.Component {
  render() {
    return (
      <div
        className="square"
        disabled={this.props.disabled}
        onClick={this.props.handleClick}
        style={squareStyle}
      >
        {" "}
        {this.props.text}
      </div>
    );
  }
}

class Board extends React.Component {
  state = {
    currentIcon: "X",
    xArray: [],
    oArray: [],
    gameArray: [false, false, false, false, false, false, false, false, false],
    gameText: ["", "", "", "", "", "", "", "", ""],
    winnerName: "None",
  };
  handleClick = (id) => { //0
    let gameArrayCopy = [...this.state.gameArray];
    if (!gameArrayCopy[id]) {
      let xArraycopy = [...this.state.xArray];
      let gameTextCopy = [...this.state.gameText];
      let oArraycopy = [...this.state.oArray];
      let currentIconCopy = this.state.currentIcon;
      gameArrayCopy[id] = true;
      gameTextCopy[id] = currentIconCopy;
      let newIcon;
      let playerWon = false;
      if (this.state.currentIcon === "X") {
        xArraycopy.push(id);
        newIcon = "O";
        if (xArraycopy.length >= 3) {
          playerWon = this.checkIfPlayerWon(xArraycopy);
        }
      } else {
        oArraycopy.push(id);
        newIcon = "X";
        if (oArraycopy.length >= 3) {
          playerWon = this.checkIfPlayerWon(oArraycopy);
        }
      }
      let currentPlayer = this.state.currentIcon;
      if (playerWon) {
        this.setState({
          winnerName: currentPlayer,
          gameArray: [...gameArrayCopy],
          gameText: [...gameTextCopy],
          xArray: [...xArraycopy],
          oArray: [...oArraycopy],
          currentIcon: newIcon,
        });
      } else {
        this.setState({
          gameArray: [...gameArrayCopy],
          gameText: [...gameTextCopy],
          xArray: [...xArraycopy],
          oArray: [...oArraycopy],
          currentIcon: newIcon,
        });
      }
    }
  };

  checkIfPlayerWon = (arrayToCheck) => {
    let winPossibility = ["012", "345", "678", "036", "147", "258", "048"];
    arrayToCheck.sort((num1, num2) => {
      return num1 - num2;
    });
    let result;
    for (let i = 0; i < arrayToCheck.length - 2; i++) {
      let winCheck = [
        arrayToCheck[i],
        arrayToCheck[i + 1],
        arrayToCheck[i + 2],
      ].join("");
      if (winPossibility.includes(winCheck)) {
        result = true;
        break;
      }
    }
    return result;
  };
  resetGame = () => {
    this.setState({
      currentIcon: "X",
      xArray: [],
      oArray: [],
      gameArray: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      gameText: ["", "", "", "", "", "", "", "", ""],
      winnerName: "None",
    });
  };
  render() {
    return (
      <div style={containerStyle} className="gameBoard">
        <div id="statusArea" className="status" style={instructionsStyle}>
          Next player: <span>{this.state.currentIcon}</span>
        </div>
        <div id="winnerArea" className="winner" style={instructionsStyle}>
          Winner: <span>{this.state.winnerName}</span>
        </div>
        <button style={buttonStyle} onClick={this.resetGame}>
          Reset
        </button>
        <div style={boardStyle}>
          <div className="board-row" style={rowStyle}>
            <Square
              disabled={this.state.gameArray[0]}
              text={this.state.gameText[0]}
              handleClick={() => this.handleClick(0)}
            />
            <Square
              disabled={this.state.gameArray[1]}
              text={this.state.gameText[1]}
              handleClick={() => this.handleClick(1)}
            />
            <Square
              disabled={this.state.gameArray[2]}
              text={this.state.gameText[2]}
              handleClick={() => this.handleClick(2)}
            />
          </div>
          <div className="board-row" style={rowStyle}>
            <Square
              disabled={this.state.gameArray[3]}
              text={this.state.gameText[3]}
              handleClick={() => this.handleClick(3)}
            />
            <Square
              disabled={this.state.gameArray[4]}
              text={this.state.gameText[4]}
              handleClick={() => this.handleClick(4)}
            />
            <Square
              disabled={this.state.gameArray[5]}
              text={this.state.gameText[5]}
              handleClick={() => this.handleClick(5)}
            />
          </div>
          <div className="board-row" style={rowStyle}>
            <Square
              disabled={this.state.gameArray[6]}
              text={this.state.gameText[6]}
              handleClick={() => this.handleClick(6)}
            />
            <Square
              disabled={this.state.gameArray[7]}
              text={this.state.gameText[7]}
              handleClick={() => this.handleClick(7)}
            />
            <Square
              disabled={this.state.gameArray[8]}
              text={this.state.gameText[8]}
              handleClick={() => this.handleClick(8)}
            />
          </div>
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

export default Game;
