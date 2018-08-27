import { Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import { LibraryService } from '../../service/library.service';
import { UserService } from '../../service/user.service';

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

    constructor(private libraryService: LibraryService,
                private userService: UserService) {

     }

  ngOnInit() {
      this.getMyId();
  }
  
getMyId(): void{
    this.userService.getMyId(this.token)
    .subscribe(id => {
        console.log(id);
        
        this.id = id;
    })
}
    takeBook():void {        
        this.libraryService.takeBook(this.id, this.book._id, this.token)
        .subscribe()
    }
    passBook():void {        
        this.libraryService.passBook(this.id, this.book._id, this.token)
        .subscribe()
    }
}