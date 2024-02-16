import { Pipe, PipeTransform } from '@angular/core';
import {Product} from "./entities/Product";

@Pipe({
  name: 'product',
  standalone: true
})
export class ProductPipe implements PipeTransform {

  transform(values: Product[], filter: string): Product[] {
    if (!filter || filter.length === 0) {
      return values;
    }
    
    if (values.length === 0) {
      return values;
    }

    // @ts-ignore
    return values.filter((value: Product) => {
      const productNameFound = value.productName.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      const productIdFound = value.productId.toLowerCase().indexOf(filter.toLowerCase()) !== -1;

      if (productNameFound || productIdFound) {
        return value;
      }
    })
  }

}
