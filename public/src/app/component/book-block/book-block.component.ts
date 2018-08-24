import { Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import { LibraryService } from '../../service/library.service';

@Component({
  selector: 'book-block',
  templateUrl: './book-block.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookBlockComponent implements OnInit {
    token: string = localStorage['token'] || sessionStorage['token'];
    @Input() book: any;
    @Input() showPassBtn: boolean;
    @Input() showTakeBtn: boolean;

    constructor(private libraryService: LibraryService) {

     }

  ngOnInit() {
      // this.getImageBook();
  }
  // getImageBook():void{
  //       this.libraryService.getImageBook(this.books.id, this.books.path, this.token)
  // }
    takeBook():void {

    }
    passBook():void {

    }
}
