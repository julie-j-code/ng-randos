import { Pipe, PipeTransform } from '@angular/core';
import { Hike } from './shared/hike';

@Pipe({
  name: 'hikeFilter'
})
export class HikeFilterPipe implements PipeTransform {

  transform(value: Hike[], searchTerms: string="") {
    if (searchTerms!=="") {
      return value.filter(hike=>hike.description.toLowerCase().includes(searchTerms) ||hike.name.toLowerCase().includes(searchTerms)|| hike.description.includes(searchTerms) ||hike.name.includes(searchTerms) );      
    }
    return value;
  }

}
