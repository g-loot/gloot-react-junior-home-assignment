import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

import { getGames, deleteGame, addGame, editGame } from './game-service';

class App extends React.Component {
  state = {
    games: [],
    newGameName: ''
  };

  componentDidMount = async () => {
    this.getGames();
  };

  getGames = async () => {
    const games = await getGames();
    this.setState({ games });
  }

  deleteGame = async id => {
    await deleteGame(id);
    this.getGames();
  };

  addGame = async () => {
    await addGame(this.state.newGameName);
    this.getGames();
  };

  editGame = async (id, name) => {
    await editGame(id, name);
    this.getGames();
  };

  handleChange = event => {
    this.setState({
      newGameName: event.target.value
    });
  };

  handleChangeName = (event, index) => {
    let games = [...this.state.games];
    games[index].name = event.target.value;
    this.setState({ games });
  };

  render() {
    const { games } = this.state;

    return (
      <div>
        <h2>Add game</h2>
        <hr />
        <input
          placeholder="New game"
          name="name"
          value={this.state.newGameName}
          onChange={this.handleChange}
        />
        <button onClick={this.addGame}><i class="fas fa-plus"></i></button>
        <h2>Game Library</h2>
        <hr />
        {games &&
          games.map((game, index) => (
            <div key={game.id}>
              <input
                name="name"
                value={game.name}
                onChange={(event) => this.handleChangeName(event, index)}
                />
              <button onClick={() => this.editGame(game.id, game.name)}><i class="fas fa-check-circle"></i></button>
              <button onClick={() => this.deleteGame(game.id)}><i class="fas fa-trash-alt"></i></button>
            </div>
          ))}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app-container'));
