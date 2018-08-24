import { Component, OnInit} from '@angular/core';
import { LibraryService } from '../../service/library.service';

@Component({
  selector: 'admin-books',
  templateUrl: './admin-books.component.html'
})
export class AdminBooksComponent implements OnInit {
    token: string = localStorage['token'] || sessionStorage['token'];
    id: string = localStorage['id'] || sessionStorage['id'];
    books: any;
    currentPage: number = 1;
    pageSize: number = 18;

  constructor(private libraryService: LibraryService) { }

  ngOnInit() {
    this.getBooks();
  }

    

  getBooks(): void {
    this.libraryService.getBooks(this.token)
        .subscribe(
            books => {
                this.books = books;
            },
            err => console.log("err",err)
        );
}
}
