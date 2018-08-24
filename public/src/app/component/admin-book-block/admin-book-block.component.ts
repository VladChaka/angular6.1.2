import { Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import { LibraryService } from '../../service/library.service';

@Component({
  selector: 'admin-book-block',
  templateUrl: './admin-book-block.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminBookBlockComponent implements OnInit {
    token: string = localStorage['token'] || sessionStorage['token'];
    id: string = localStorage['id'] || sessionStorage['id'];
    @Input() book: any;
    @Input() showTakeBtn: boolean;
    @Input() showDeleteBtn: boolean;
    @Input() hideNotAvailable: boolean;
    constructor(private libraryService: LibraryService) { }

  ngOnInit() {
  }
  takeBook():void {
    this.libraryService.takeBook(this.id, this.book._id, this.token)
    .subscribe(data => console.log(data))
}
}
