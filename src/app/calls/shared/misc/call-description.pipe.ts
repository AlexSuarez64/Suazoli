import { Pipe, PipeTransform } from '@angular/core';
import { Call } from '../models/call';

@Pipe({
  name: 'callDescription'
})
export class CallDescriptionPipe implements PipeTransform {

  transform(value: Call[], descriptionBy: string): Call[] {
    descriptionBy = descriptionBy ? descriptionBy.toLocaleLowerCase() : null;
    return descriptionBy ? value.filter((call: Call) =>
        call.description.toLocaleLowerCase().indexOf(descriptionBy) !== -1) : value;
  }

}
