import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableColumn } from '../../models/table-column.model';

@Component({
  selector: 'app-generic-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.css']
})
export class GenericTableComponent<T> {
  @Input() columns: TableColumn[] = [];
  @Input() data: T[] = [];
  @Input() showActions = true;
  @Input() showEdit = true;
  @Input() showDelete = true;
  @Input() emptyMessage = 'No data available';

  @Output() onEdit = new EventEmitter<T>();
  @Output() onDelete = new EventEmitter<T>();

  getValue(item: any, key: string): any {
    return key.split('.').reduce((obj, key) => obj?.[key], item);
  }
}
