import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tiempo'
})
export class TiempoPipe implements PipeTransform {

  transform(value: any): any {
    var date = new Date(null);
    date.setMinutes(value); // specify value for SECONDS here
    var timeString = date.toISOString().substr(11, 8);
    return timeString;
  }

}
