import {Component, Input, ChangeDetectionStrategy} from '@angular/core';

@Component({
    selector: 'user-panel',
    templateUrl: './user-panel.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserPanelComponent {

    pageSize: number = 18;

    @Input() user: string;
    @Input() filterByDate: string;
    @Input() filterByRating: string;

    constructor() {
    }

}
