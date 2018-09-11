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
    db.getGame(navParams.get('gameId')).subscribe(game => {
      this.game = game;
    });
  }

  addEditPlayer(player) {
    let options = {
      name: player ? player.name : '',
      color: player ? player.color : this.getSuggestedColor(),
      time: player ? player.time : 0,
      position: player ? player.position : this.game.players.length,
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
      if (!playerColors.includes(color)) {
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

    this.db.updateGamePlayers(this.game);
  }
}
