import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { DatabaseProvider } from '../../../providers/database/database';

@Component({
  selector: 'page-add-player-modal',
  templateUrl: 'add-player-modal.html',
})
export class AddPlayerModalPage {

  isNew: boolean = false;
  player: any;
  colors: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private view: ViewController,
    public db: DatabaseProvider
  ) {
    this.colors = db.colors;
  }

  ionViewDidLoad() {
    this.isNew = this.navParams.get('newPlayer');
    this.player = {
      name: this.navParams.get('name'),
      color: this.navParams.get('color'),
      time: this.navParams.get('time'),
      position: this.navParams.get('position')
    }
  }

  selectColor(color) {
    this.player.color = color;
  }

  save() {
    this.view.dismiss(this.player);
  }

  close() {
    this.view.dismiss();
  }

}
