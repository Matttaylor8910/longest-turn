import { Component } from '@angular/core';
import { NavController, AlertController, ModalController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { GamePage } from '../game/game';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  games: any;

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private db: DatabaseProvider
  ) {
    db.getGames().subscribe(games => {
      this.games = games;
    });
  }

  newGame() {
    let alert = this.alertCtrl.create({
      title: 'New Game',
      inputs: [
        {
          name: 'name',
          placeholder: 'Catan'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Create',
          handler: data => {
            if (!data.name) {
              data.name = 'Catan'
            }
            this.db.newGame({name: data.name, players: []})
          }
        }
      ]
    });
    alert.present();
  }

  goToGame(game) {
    this.navCtrl.push(GamePage, {gameId: game.id});
  }

  reset() {
    this.db.reset(this.games);
  }

}
