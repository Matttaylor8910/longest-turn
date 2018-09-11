import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as _ from 'lodash';

@Injectable()
export class DatabaseProvider {

  games: any;
  colors = [ 'red', 'blue', 'green', 'orange', 'brown', 'white'];

  constructor(
    private afs: AngularFirestore
  ) {
    this.games = this.afs.collection('games');
  }

  newGame(game: any) {
    return this.games.add(game);
  }

  getGame(gameId) {
    return this.games.doc(gameId).snapshotChanges().map(this.mapGame.bind(this));
  }

  getGames() {
    return this.games.snapshotChanges().map(actions => {
      return _.map(actions, this.mapGame.bind(this));
    });
  }

  mapGame(game) {
    const doc = game.payload.doc || game.payload;

    const data = doc.data();
    const id = doc.id;

    // make sure the array is instantiated and sorted correctly
    data.players = _(data.players).sortBy('position').value();

    // set indices for future updates
    data.players.forEach((player, index) => {
      player.index = index;
    });

    return { id, ...data };
  }

  updateGamePlayers(game) {
    this.games.doc(game.id).update({players: this.sanitize(game.players)});
  }

  reset(game) {
    game.players.forEach(player => {
      player.time = 0;
    });
    this.games.doc(game.id).update({players: this.sanitize(game.players)});
  }

  sanitize(players) {
    return _.map(players, player => {
      return _.pick(player, ['position', 'name', 'color', 'time']);
    });
  }

}
