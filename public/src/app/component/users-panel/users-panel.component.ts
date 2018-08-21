import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'users-panel',
  templateUrl: './users-panel.component.html',
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersPanelComponent{


    @Input() currentPage: number;
    @Input() pageSize: number;
    @Input() numberOfPages: number;
    @Input() pagesToShow: number;
    @Input() loading: boolean;

    @Output() goPrev = new EventEmitter<boolean>();
    @Output() goNext = new EventEmitter<boolean>();
    @Output() goPage = new EventEmitter<number>();
  constructor() { }
}
