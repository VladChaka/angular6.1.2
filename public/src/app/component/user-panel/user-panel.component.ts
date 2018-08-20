import {Component, OnInit, Input, ChangeDetectionStrategy} from '@angular/core';

@Component({
    selector: 'user-panel',
    templateUrl: './user-panel.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserPanelComponent implements OnInit{
user = {
id: "rfawqw1rfasevq3r1",
     username: "Vladislav",
       email:"vlad4402@mail.com",
       fullname: "Vladislav Chaka",
       password: "vlad44478",
       phone: "5125113563",
       post:"odmen"
}
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
