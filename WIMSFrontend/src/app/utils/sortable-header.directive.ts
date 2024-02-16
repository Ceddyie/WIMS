import {Directive, EventEmitter, Input, Output} from '@angular/core';
import {Product} from "../entities/Product";

export type SortColumn = keyof Product |'';
export type SortDirection = 'asc' | 'desc' | '';

const rotate: { [key: string ]: SortDirection } = {
  asc: 'desc',
  desc: '',
  '': 'asc',
};

export const compare = (
    v1: string,
    v2: string
) => (v1 < v2 ? -1 : v1 > v2 ? 1: 0);

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()',
  },
  standalone: true
})
export class SortableHeaderDirective {
  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.sortable, direction: this.direction });
  }
  constructor() { }

}
