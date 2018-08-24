import { Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import { LibraryService } from '../../service/library.service';

@Component({
  selector: 'book-block',
  templateUrl: './book-block.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookBlockComponent implements OnInit {
    token: string = localStorage['token'] || sessionStorage['token'];
    id: string = localStorage['id'] || sessionStorage['id'];
    @Input() book: any;
    @Input() showPassBtn: boolean;
    @Input() showTakeBtn: boolean;

    constructor(private libraryService: LibraryService) {

     }

  ngOnInit() {
  }
    takeBook():void {
        
        this.libraryService.takeBook(this.id, this.book._id, this.token)
        .subscribe(data => console.log(data))
    }
    passBook():void {
        console.log(this.id, this.book._id);
        
        this.libraryService.passBook(this.id, this.book._id, this.token)
        .subscribe(data => console.log(data))
    }
}
