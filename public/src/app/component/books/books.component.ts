import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../../service/library.service';

@Component({
  selector: 'books',
  templateUrl: './books.component.html'
})
export class BooksComponent implements OnInit {
    token: string = localStorage['token'] || sessionStorage['token'];
    books: any;
    showUserProfile: boolean;
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
                }
            );
    }
}
