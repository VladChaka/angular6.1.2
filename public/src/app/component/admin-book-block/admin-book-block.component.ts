import { Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import { LibraryService } from '../../service/library.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'admin-book-block',
  templateUrl: './admin-book-block.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminBookBlockComponent implements OnInit {
    token: string = localStorage['token'] || sessionStorage['token'];
    id: string;
    @Input() book: any;
    @Input() showTakeBtn: boolean;
    @Input() showDeleteBtn: boolean;
    @Input() hideNotAvailable: boolean;
    constructor(private libraryService: LibraryService,
    private userService: UserService) { }

    ngOnInit() {
        this.getMyId();
    }
  
    getMyId(): void{
        this.userService.getMyId(this.token)
        .subscribe(id => {
            this.id = id;
        })
    }
  takeBook():void {      
    this.libraryService.takeBook(this.id, this.book._id, this.token)
    .subscribe()
}
}
