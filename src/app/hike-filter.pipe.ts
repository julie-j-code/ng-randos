import { Pipe, PipeTransform } from '@angular/core';
import { Hike } from './shared/hike';

@Pipe({
  name: 'hikeFilter'
})
export class HikeFilterPipe implements PipeTransform {

  transform(value: Hike[], searchTerms: string=""): unknown {
    if (searchTerms!=="") {
      return value.filter(hike=>hike.description.toLowerCase().includes(searchTerms));      
    }
    return value;
  }

}
