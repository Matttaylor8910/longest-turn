import { Component } from '@angular/core';
import { NavParams, ModalController } from 'ionic-angular';
import { AddPlayerModalPage } from './add-player-modal/add-player-modal';
import { DatabaseProvider } from '../../providers/database/database';
import * as _ from 'lodash';

@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {

  game: any;

  constructor(
    navParams: NavParams,
    private db: DatabaseProvider,
    private modalCtrl: ModalController
  ) {
    this.game = JSON.parse(localStorage.getItem('longestTurn') || '{}');
    if (!this.game || !this.game.players) {
      this.reset();
    }
  }

  reset() {
    this.game = {name: 'Catan', players: [], state: 'setup', turn: 0};
  }
  
  addEditPlayer(player) {
    let options = {
      name: player ? player.name : '',
      color: player ? player.color : this.getSuggestedColor(),
      time: player ? player.time : 0,
      newPlayer: player === undefined
    };
    let modal = this.modalCtrl.create(AddPlayerModalPage, options);
    modal.onDidDismiss(data => {
      if (data) {
        this.updateGamePlayer(data, player);
      }
    });
    modal.present();
  }

  getSuggestedColor() {
    let suggestedColor, playerColors = _.map(this.game.players, 'color');
    this.db.colors.forEach(color => {
      if (!suggestedColor && !playerColors.includes(color)) {
        suggestedColor = color;
      }
    });
    return suggestedColor;
  }

  updateGamePlayer(player, originalPlayer) {
    // determine if this player has chosen a color already picked
    var colorOwner = _.find(this.game.players, {color: player.color});

    // new player
    if (originalPlayer === undefined) {
      this.game.players.push(player);
      // if this color was already picked, 
      // suggest the previous owner a new color
      if (colorOwner) {
        colorOwner.color = this.getSuggestedColor();
      }
    }

    // update existing
    else {
      this.game.players[originalPlayer.index] = player;
      // if this color was already picked, 
      // give the previous owner this player's previous color
      if (colorOwner) {
        colorOwner.color = originalPlayer.color;
      }
    }

    this.updatePlayers();
  }

  reorderItems(indexes) {
    let element = this.game.players[indexes.from];
    this.game.players.splice(indexes.from, 1);
    this.game.players.splice(indexes.to, 0, element);

    this.updatePlayers();
  }

  updatePlayers() {
    this.game.players.forEach((player, index) => {
      player.index = index;
    });

    this.save();
  }

  startGame() {
    this.game.currentPlayer = _.extend(this.game.players[0], {
      startTime: Date.now()
    });

    this.setGameState('started');
    this.save();
  }

  setGameState(state) {
    this.game.state = state;
  }

  save() {
    localStorage.setItem('longestTurn', JSON.stringify(this.game));
  }
}
