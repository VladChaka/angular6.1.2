import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'user-block',
  templateUrl: './user-block.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserBlockComponent implements OnInit {
    @Input() user: any;
    @Input() filterByRating: boolean;
    @Input() filterByDate: boolean;
  constructor() { }

  ngOnInit() {
  }

}
