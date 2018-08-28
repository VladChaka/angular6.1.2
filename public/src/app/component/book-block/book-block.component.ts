import { Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import { LibraryService } from '../../service/library.service';
import { UserService } from '../../service/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'book-block',
  templateUrl: './book-block.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookBlockComponent implements OnInit {
    token: string = localStorage['token'] || sessionStorage['token'];
    id: string;
    @Input() book: any;
    @Input() showPassBtn: boolean;
    @Input() showTakeBtn: boolean;
    @Input() hideNotAvailable: boolean;

    constructor(private libraryService: LibraryService,
                private userService: UserService,
                private route: ActivatedRoute) {
     }

  ngOnInit() {
      this.getMyId();
  }
  
    getMyId(): void{
        if (this.route.parent.routeConfig.path !== 'myprofile' && this.route.routeConfig.path !== 'books') {
            this.route.parent.params
                .subscribe(params => {
                    this.id = params.id;
                });
        } else{
            this.userService.getMyId(this.token)
                .subscribe(id => {
                    this.id = id;
                });
        }
    }
    takeBook():void {
        this.libraryService.takeBook(this.id, this.book._id, this.token)
            .subscribe()
    }
    passBook():void {
        this.libraryService.passBook(this.id, this.book._id, this.token)
            .subscribe();
    }
}
