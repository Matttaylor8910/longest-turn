import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as _ from 'lodash';

@Injectable()
export class DatabaseProvider {

  games: any;
  colors = [ 'red', 'blue', 'green', 'orange', 'brown', 'white'];

  constructor(
  ) {
  }

}
