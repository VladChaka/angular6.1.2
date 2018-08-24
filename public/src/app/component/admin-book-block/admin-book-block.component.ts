import { Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import { LibraryService } from '../../service/library.service';

@Component({
  selector: 'admin-book-block',
  templateUrl: './admin-book-block.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminBookBlockComponent implements OnInit {
    token: string = localStorage['token'] || sessionStorage['token'];
    @Input() book: any;
    @Input() showTakeBtn: boolean;
    @Input() showDeleteBtn: boolean;
    @Input() hideNotAvailable: boolean;
    constructor(private libraryService: LibraryService) { }

  ngOnInit() {
      // this.getImageBook();
  }
  takeBook():void{
      
  }
  deleteBook():void{
      
  }
  // getImageBook():void{
  //       this.libraryService.getImageBook(this.books.id, this.books.path, this.token)
  // }
}
