import {Component, OnInit, Input, ChangeDetectionStrategy} from '@angular/core';

@Component({
    selector: 'user-panel',
    templateUrl: './user-panel.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserPanelComponent implements OnInit{

    pageSize: number = 18;

    @Input() user: string;
    @Input() filterByDate: string;
    @Input() filterByRating: string;

    constructor() {
    }

    ngOnInit() {
        // this.hero$ = this.route.paramMap.pipe(
        //     switchMap((params: ParamMap) =>
        //         this.service.getHero(params.get('id')))
        // );
    }
}
