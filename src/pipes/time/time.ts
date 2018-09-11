import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'time',
})
export class TimePipe implements PipeTransform {
  /**
   * Takes a number value and converts it to hh:mm:ss
   */
  transform(value: string, ...args) {
    let timePassed = Date.now() - parseInt(value);
    let mom = moment.utc(timePassed);
    return timePassed >= 3600 ? mom.format('HH:mm:ss') : mom.format('mm:ss');
  }
}
