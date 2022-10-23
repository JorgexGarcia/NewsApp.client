import { Pipe, PipeTransform } from '@angular/core';
import * as formatInTimeZone from 'date-fns-tz/formatInTimeZone';

import { environment } from 'src/environments/environment.prod';

@Pipe({ name: 'customDatePipe' })

export class CustomDatePipe implements PipeTransform {

  transform(date: Date | null | undefined, customFormat: string): string {

    let temp = date? date : new Date();

    try{

      switch (customFormat){
        case 'date':
          return formatInTimeZone( new Date(temp), environment.timeZone, environment.defaultDateFormat);
        case 'time':
          return formatInTimeZone( new Date(temp), environment.timeZone, environment.defaultTimeFormat);
        case 'shortTime':
          return formatInTimeZone( new Date(temp), environment.timeZone, environment.defaultShortTimeFormat);
        case 'dateTime':
          return formatInTimeZone( new Date(temp), environment.timeZone, environment.defaultDateTimeFormat);
        default:
          return formatInTimeZone( new Date(temp), environment.timeZone, customFormat);
      }

    }catch (e){
      return '';
    }
  }
}
