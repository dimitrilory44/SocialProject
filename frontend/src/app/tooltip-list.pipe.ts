import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tooltipList'
})
export class TooltipListPipe implements PipeTransform {

  transform(lines: string[]): string {
    
    let list: string;

    //
    lines.forEach((line:string) => {
      list += line + '\n';
      console.log(list);
    });
    //
    
    return list;
  }

}