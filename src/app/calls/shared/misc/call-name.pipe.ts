import { Pipe, PipeTransform } from '@angular/core';
import { Call } from '../models/call';

@Pipe({
  name: 'callName'
})
export class CallNamePipe implements PipeTransform {

  transform(value: Call[], nameBy: string): Call[] {
    nameBy = nameBy ? nameBy.toLocaleLowerCase() : null;
    return nameBy ? value.filter((call: Call) =>
        call.name.toLocaleLowerCase().indexOf(nameBy) !== -1) : value;
  }

}
